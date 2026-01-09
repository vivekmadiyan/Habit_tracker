"use client";
import React, { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  Calendar,
  Target,
  FileDown,
  ChevronRight,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Dashboard = () => {
  /* =========================
      DATE STATES
  ========================= */
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);

  /* =========================
      INPUT
  ========================= */
  const [input, setInput] = useState("");

  /* =========================
      HABITS (GLOBAL)
  ========================= */
  const [habits, setHabits] = useState([]);

  /* =========================
      DATE-WISE COMPLETION
  ========================= */
  const [progressByDate, setProgressByDate] = useState({});

  /* =========================
      ADD HABIT
  ========================= */
  const addHabit = () => {
    if (!input.trim()) return;
    setHabits((prev) => [...prev, input.trim()]);
    setInput("");
  };

  /* =========================
      DELETE HABIT
  ========================= */
  const deleteHabit = (index) => {
    setHabits((prev) => prev.filter((_, i) => i !== index));
    setProgressByDate((prev) => {
      const updated = {};
      for (const date in prev) {
        const copy = { ...prev[date] };
        delete copy[index];
        updated[date] = copy;
      }
      return updated;
    });
  };

  /* =========================
      TOGGLE HABIT
  ========================= */
  const toggleHabit = (index) => {
    setProgressByDate((prev) => ({
      ...prev,
      [selectedDate]: {
        ...(prev[selectedDate] || {}),
        [index]: !prev[selectedDate]?.[index],
      },
    }));
  };

  /* =========================
      STATS
  ========================= */
  const totalCount = habits.length;
  const completedCount = Object.values(
    progressByDate[selectedDate] || {}
  ).filter(Boolean).length;
  const progressPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  /* =========================
      HELPERS
  ========================= */
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
    });

  const downloadRangePDF = () => {
    const doc = new jsPDF();
    const dates = getDateRange(fromDate, toDate);
    const tableHead = [["Date", ...habits]];
    const tableBody = dates.map((date) => [
      formatDate(date),
      ...habits.map((_, i) => (progressByDate[date]?.[i] ? "DONE" : "-")),
    ]);

    doc.setFontSize(18);
    doc.text("Habit Tracker Report", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: tableHead,
      body: tableBody,
      theme: "striped",
    });
    doc.save(`habit-report.pdf`);
  };

  /* =========================
      LOCAL STORAGE
  ========================= */
  useEffect(() => {
    const saved = localStorage.getItem("habit-data");
    if (saved) {
      const parsed = JSON.parse(saved);
      setHabits(parsed.habits || []);
      setProgressByDate(parsed.progress || {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "habit-data",
      JSON.stringify({ habits, progress: progressByDate })
    );
  }, [habits, progressByDate]);


  useEffect(() => {
  const checkDateChange = () => {
    const newToday = new Date().toISOString().split("T")[0];
    setSelectedDate((prev) => (prev !== newToday ? newToday : prev));
  };

  // check every 1 minute
  const interval = setInterval(checkDateChange, 60 * 1000);

  return () => clearInterval(interval);
}, []);


  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              My Habits
            </h1>
            <p className="text-slate-500 font-medium">Consistency is the key to success.</p>
          </div>

          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <div className="pl-3 py-2 text-slate-400">
              <Calendar size={20} />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pr-4 py-2 outline-none font-semibold text-slate-700 cursor-pointer"
            />
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <Target size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Total Habits</p>
              <h2 className="text-2xl font-bold">{totalCount}</h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
              <ChevronRight size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Completed Today</p>
              <h2 className="text-2xl font-bold">{completedCount}</h2>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-center gap-2">
            <div className="flex justify-between items-end">
               <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Daily Progress</p>
               <span className="text-indigo-600 font-bold">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* MAIN INTERFACE */}
        <div className="grid lg:grid-cols-5 gap-10">
          
          {/* DAILY LIST - 2/5 width */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-4">Add New Habit</h3>
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addHabit()}
                  placeholder="Drink water, Meditation..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-all"
                />
                <button
                  onClick={addHabit}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl transition-colors"
                >
                  <Plus />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {habits.length === 0 && (
                <div className="text-center py-10 text-slate-400 bg-white rounded-3xl border border-dashed border-slate-300 font-medium">
                  No habits added yet.
                </div>
              )}
              {habits.map((habit, index) => {
                const done = progressByDate[selectedDate]?.[index];
                return (
                  <div
                    key={index}
                    className={`group flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      done ? "bg-emerald-50 border-emerald-100" : "bg-white border-slate-100 shadow-sm"
                    }`}
                  >
                    <label className="flex items-center gap-4 cursor-pointer flex-1">
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={done || false}
                          onChange={() => toggleHabit(index)}
                          className="peer appearance-none w-6 h-6 border-2 border-slate-300 rounded-lg checked:bg-indigo-600 checked:border-indigo-600 transition-all cursor-pointer"
                        />
                        <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                        </div>
                      </div>
                      <span className={`font-semibold transition-all ${done ? "text-emerald-700 line-through opacity-60" : "text-slate-700"}`}>
                        {habit}
                      </span>
                    </label>
                    <button 
                      onClick={() => deleteHabit(index)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* OVERVIEW TABLE - 3/5 width */}
          <div className="lg:col-span-3 bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-bold">History Overview</h3>
              <div className="flex items-center gap-2">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                    <input type="date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} className="bg-transparent text-xs p-1 outline-none font-bold" />
                    <span className="text-slate-400 self-center px-1">-</span>
                    <input type="date" value={toDate} onChange={(e)=>setToDate(e.target.value)} className="bg-transparent text-xs p-1 outline-none font-bold" />
                </div>
                <button
                  onClick={downloadRangePDF}
                  className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2 text-sm font-bold"
                >
                  <FileDown size={16} /> <span className="hidden sm:inline">PDF</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b sticky left-0 bg-slate-50 z-10">Date</th>
                    {habits.map((h, i) => (
                      <th key={i} className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest border-b text-center min-w-[100px]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {getDateRange(fromDate, toDate).reverse().map((date) => (
                    <tr key={date} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4 font-bold text-slate-600 text-sm sticky left-0 bg-white whitespace-nowrap">
                        {formatDate(date)}
                      </td>
                      {habits.map((_, i) => (
                        <td key={i} className="p-4 text-center">
                          {progressByDate[date]?.[i] ? (
                            <div className="inline-flex items-center justify-center w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full">
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/></svg>
                            </div>
                          ) : (
                            <span className="text-slate-200">—</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {habits.length === 0 && (
              <div className="flex-1 flex items-center justify-center py-20 text-slate-300 italic">
                Start adding habits to see your history
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;