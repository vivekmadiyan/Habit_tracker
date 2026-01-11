"use client";
import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Trash2,
  Plus,
  Calendar,
  Target,
  FileDown,
  TrendingUp,
  LogOut,
  Menu,
  X,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { supabase } from "../lib/supabase";

const Dashboard = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  /* =========================
      STATES
  ========================= */
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [input, setInput] = useState("");
  const [habits, setHabits] = useState([]);
  const [progressByDate, setProgressByDate] = useState({});
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  /* =========================
      DATABASE OPERATIONS
  ========================= */
  const fetchHabits = async () => {
    if (!userEmail) return;
    const { data, error } = await supabase
      .from("habits")
      .select("*")
      .eq("user_email", userEmail)
      .order("habit_index");
    if (!error && data) {
      setHabits(data.map((h) => h.habit_name));
    }
  };

  const fetchProgress = async () => {
    if (!userEmail) return;
    const { data, error } = await supabase
      .from("habit_progress")
      .select("*")
      .eq("user_email", userEmail);
    if (!error && data) {
      const progressMap = {};
      data.forEach((item) => {
        if (!progressMap[item.date]) progressMap[item.date] = {};
        progressMap[item.date][item.habit_index] = item.completed;
      });
      setProgressByDate(progressMap);
    }
    setLoading(false);
  };

  const addHabit = async () => {
    if (!input.trim() || !userEmail) return;
    const newIndex = habits.length;
    const { error } = await supabase.from("habits").insert([
      {
        user_email: userEmail,
        habit_name: input.trim(),
        habit_index: newIndex,
      },
    ]);
    if (!error) {
      setHabits((prev) => [...prev, input.trim()]);
      setInput("");
    } else {
      alert("Failed to add habit. Please try again.");
    }
  };

  const deleteHabit = async (index) => {
    if (!userEmail) return;
    const { error } = await supabase
      .from("habits")
      .delete()
      .eq("user_email", userEmail)
      .eq("habit_index", index);
    if (!error) {
      await supabase
        .from("habit_progress")
        .delete()
        .eq("user_email", userEmail)
        .eq("habit_index", index);
      for (let i = index + 1; i < habits.length; i++) {
        await supabase
          .from("habits")
          .update({ habit_index: i - 1 })
          .eq("user_email", userEmail)
          .eq("habit_index", i);
        await supabase
          .from("habit_progress")
          .update({ habit_index: i - 1 })
          .eq("user_email", userEmail)
          .eq("habit_index", i);
      }
      setHabits(habits.filter((_, i) => i !== index));
      setProgressByDate((prev) => {
        const updated = {};
        for (const date in prev) {
          const copy = {};
          Object.keys(prev[date]).forEach((key) => {
            const idx = parseInt(key);
            if (idx < index) copy[idx] = prev[date][idx];
            else if (idx > index) copy[idx - 1] = prev[date][idx];
          });
          updated[date] = copy;
        }
        return updated;
      });
    }
  };

  const toggleHabit = async (index) => {
    if (!userEmail) return;
    const currentStatus = progressByDate[selectedDate]?.[index] || false;
    const newStatus = !currentStatus;
    const { error } = await supabase.from("habit_progress").upsert(
      [{
        user_email: userEmail,
        date: selectedDate,
        habit_index: index,
        completed: newStatus,
      }],
      { onConflict: "user_email,date,habit_index" }
    );
    if (!error) {
      setProgressByDate((prev) => ({
        ...prev,
        [selectedDate]: { ...(prev[selectedDate] || {}), [index]: newStatus },
      }));
    }
  };

  /* =========================
      HELPERS
  ========================= */
  const totalCount = habits.length;
  const completedCount = Object.values(progressByDate[selectedDate] || {}).filter(Boolean).length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getDateRange = (start, end) => {
    const dates = [];
    let current = new Date(start);
    const last = new Date(end);
    while (current <= last) {
      dates.push(current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatDateShort = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  const downloadRangePDF = () => {
    const doc = new jsPDF();
    const dates = getDateRange(fromDate, toDate);
    const tableHead = [["Date", ...habits]];
    const tableBody = dates.map((date) => [
      formatDateShort(date),
      ...habits.map((_, i) => (progressByDate[date]?.[i] ? "✓" : "-")),
    ]);
    doc.setFontSize(18);
    doc.text("Habit Tracker Report", 14, 20);
    doc.setFontSize(10);
    doc.text(`User: ${userEmail}`, 14, 28);
    doc.text(`Period: ${formatDate(fromDate)} - ${formatDate(toDate)}`, 14, 34);
    autoTable(doc, {
      startY: 40,
      head: tableHead,
      body: tableBody,
      theme: "striped",
      headStyles: { fillColor: [79, 70, 229] },
      styles: { fontSize: 8 },
    });
    doc.save(`habit-report-${fromDate}-to-${toDate}.pdf`);
  };

  /* =========================
      EFFECTS
  ========================= */
  useEffect(() => {
    if (userEmail) {
      fetchHabits();
      fetchProgress();
    }
  }, [userEmail]);

  useEffect(() => {
    const checkDateChange = () => {
      const newToday = new Date().toISOString().split("T")[0];
      setSelectedDate((prev) => (prev !== newToday ? newToday : prev));
    };
    const interval = setInterval(checkDateChange, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  /* =========================
      LOADING STATE
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-indigo-200 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-slate-700 font-semibold mt-6 text-lg">Loading your habits...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      
      {/* MOBILE HEADER */}
      <header className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">My Habits</h1>
              <p className="text-xs text-gray-500">{completedCount}/{totalCount} completed</p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={16} />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <button
              onClick={() => {
                signOut();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-6 lg:space-y-8">
        
        {/* DESKTOP HEADER */}
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">H</span>
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">My Habits Dashboard</h1>
              <p className="text-gray-600 font-medium">Track your progress and build consistency</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-200 flex items-center gap-2">
              <Calendar size={18} className="text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="outline-none font-semibold text-gray-700 text-sm"
              />
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-white rounded-2xl lg:rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-md">
                <Target size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Total Habits</p>
                <h2 className="text-3xl font-extrabold text-gray-900">{totalCount}</h2>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl lg:rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-md">
                <TrendingUp size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">Completed</p>
                <h2 className="text-3xl font-extrabold text-gray-900">{completedCount}</h2>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl lg:rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-white/90 text-xs font-semibold uppercase tracking-wider">Daily Progress</p>
              <span className="text-white text-2xl font-extrabold">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden backdrop-blur">
              <div
                className="bg-white h-full transition-all duration-500 ease-out rounded-full shadow-sm"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          
          {/* HABITS LIST */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            
            {/* Add Habit Card */}
            <div className="relative bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 rounded-2xl lg:rounded-3xl p-5 lg:p-6 shadow-lg border-2 border-indigo-100 hover:border-indigo-200 transition-all overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/10 to-orange-400/10 rounded-full blur-2xl -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                    <Plus size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900">Add New Habit</h3>
                </div>
                
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addHabit()}
                      placeholder="e.g., Morning workout, Read 30 mins..."
                      className="w-full bg-white/80 backdrop-blur border-2 border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all text-sm lg:text-base font-semibold text-gray-900 placeholder:text-gray-400 shadow-sm"
                    />
                  </div>
                  <button
                    onClick={addHabit}
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-5 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 font-bold flex items-center gap-2"
                  >
                    <Plus size={22} className="animate-pulse" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
                
                <p className="mt-3 text-xs text-gray-500 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse"></span>
                  Press Enter or click Add to create a new habit
                </p>
              </div>
            </div>

            {/* Habits List */}
            <div className="space-y-3">
              {habits.length === 0 && (
                <div className="text-center py-12 lg:py-16 text-gray-400 bg-white rounded-2xl lg:rounded-3xl border-2 border-dashed border-gray-200">
                  <Target size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="font-semibold text-lg">No habits yet</p>
                  <p className="text-sm mt-2">Add your first habit to get started!</p>
                </div>
              )}
              {habits.map((habit, index) => {
                const done = progressByDate[selectedDate]?.[index];
                return (
                  <div
                    key={index}
                    className={`group relative flex items-center gap-4 p-4 lg:p-5 rounded-xl lg:rounded-2xl border-2 transition-all ${
                      done
                        ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 shadow-md"
                        : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                    }`}
                  >
                    <label className="flex items-center gap-4 cursor-pointer flex-1">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={done || false}
                          onChange={() => toggleHabit(index)}
                          className="peer appearance-none w-7 h-7 lg:w-8 lg:h-8 border-3 border-gray-300 rounded-xl checked:bg-gradient-to-br checked:from-indigo-600 checked:to-purple-600 checked:border-transparent transition-all cursor-pointer shadow-sm"
                        />
                        <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none inset-0 flex items-center justify-center">
                          <svg className="w-5 h-5 lg:w-6 lg:h-6 fill-current" viewBox="0 0 20 20">
                            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                          </svg>
                        </div>
                      </div>
                      <span
                        className={`font-semibold text-sm lg:text-base transition-all ${
                          done ? "text-emerald-700 line-through opacity-60" : "text-gray-800"
                        }`}
                      >
                        {habit}
                      </span>
                    </label>
                    <button
                      onClick={() => deleteHabit(index)}
                      className="opacity-0 group-hover:opacity-100 lg:opacity-100 p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* HISTORY TABLE */}
          <div className="lg:col-span-3 bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">History Overview</h3>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex items-center bg-gray-50 p-1.5 rounded-xl border border-gray-200 text-sm">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="bg-transparent px-2 py-1 outline-none font-semibold text-gray-700 text-xs lg:text-sm"
                  />
                  <span className="text-gray-400 px-1">→</span>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="bg-transparent px-2 py-1 outline-none font-semibold text-gray-700 text-xs lg:text-sm"
                  />
                </div>
                <button
                  onClick={downloadRangePDF}
                  className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-bold shadow-md hover:shadow-lg"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Export PDF</span>
                  <span className="sm:hidden">PDF</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="p-3 lg:p-4 text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200 sticky left-0 bg-gray-50 z-10">
                      Date
                    </th>
                    {habits.map((h, i) => (
                      <th
                        key={i}
                        className="p-3 lg:p-4 text-xs font-bold text-gray-600 uppercase tracking-wider border-b-2 border-gray-200 text-center min-w-[80px] lg:min-w-[100px]"
                      >
                        <span className="hidden sm:inline">{h}</span>
                        <span className="sm:hidden">{h.slice(0, 8)}...</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {getDateRange(fromDate, toDate)
                    .reverse()
                    .map((date) => (
                      <tr key={date} className="hover:bg-gray-50 transition-colors">
                        <td className="p-3 lg:p-4 font-bold text-gray-700 text-xs lg:text-sm sticky left-0 bg-white whitespace-nowrap border-r border-gray-100">
                          {formatDateShort(date)}
                        </td>
                        {habits.map((_, i) => (
                          <td key={i} className="p-3 lg:p-4 text-center">
                            {progressByDate[date]?.[i] ? (
                              <div className="inline-flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-full shadow-sm">
                                <svg className="w-4 h-4 lg:w-5 lg:h-5 fill-current" viewBox="0 0 20 20">
                                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                </svg>
                              </div>
                            ) : (
                              <span className="text-gray-200 text-lg">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            
            {habits.length === 0 && (
              <div className="flex items-center justify-center py-16 text-gray-300">
                <div className="text-center">
                  <Calendar size={48} className="mx-auto mb-3 opacity-50" />
                  <p className="font-medium">Start adding habits to see your history</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;