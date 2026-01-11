import Link from 'next/link';

export const metadata = {
  title: 'Free Habit Tracker - Build Better Habits in 2026 | Daily Email Reports',
  description: 'Free online habit tracker with daily email reports and motivational quotes. Track unlimited habits, sync across devices, and achieve your goals. Start building better habits today!',
  keywords: 'habit tracker, free habit tracker, daily habits, goal tracking, productivity app, habit tracking app, build habits',
};

export default function LandingPage() {
  return (
    <div className="font-sans antialiased">
      
      {/* ========== NAVIGATION ========== */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                H
              </div>
              <span className="text-xl font-bold text-gray-900">Habit Tracker</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 transition">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition">How It Works</a>
              <a href="#faq" className="text-gray-600 hover:text-indigo-600 transition">FAQ</a>
              <Link href="/login" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Content */}
            <div>
              <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                🎉 Free Forever • No Credit Card Required
              </div>
              
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Build Better{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Habits
                </span>{' '}
                in 2026
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Simple, beautiful habit tracking with <strong>daily email reports</strong> and motivational quotes. 
                Track unlimited habits, sync across devices, and achieve your goals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link 
                  href="/login"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition text-center"
                >
                  Start Tracking Free →
                </Link>
                <a 
                  href="#how-it-works"
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg border-2 border-gray-200 hover:border-indigo-600 transition text-center"
                >
                  See How It Works
                </a>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl font-bold text-indigo-600">1000+</div>
                  <div className="text-gray-600 text-sm">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600">50K+</div>
                  <div className="text-gray-600 text-sm">Habits Tracked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600">95%</div>
                  <div className="text-gray-600 text-sm">Success Rate</div>
                </div>
              </div>
            </div>
            
            {/* Right: Visual Demo */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Today&apos;s Progress</h3>
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-bold">
                    75%
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm">✓</div>
                    <span className="flex-1 text-gray-700 font-medium line-through opacity-60">Morning Exercise</span>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm">✓</div>
                    <span className="flex-1 text-gray-700 font-medium line-through opacity-60">Read 30 Minutes</span>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl">
                    <div className="w-6 h-6 bg-gray-200 rounded-lg"></div>
                    <span className="flex-1 text-gray-700 font-medium">Meditation</span>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                    <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm">✓</div>
                    <span className="flex-1 text-gray-700 font-medium line-through opacity-60">Drink 8 Glasses Water</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-lg">
                  <div className="text-xs text-amber-700 font-bold mb-1">💡 Quote of the Day</div>
                  <div className="text-sm text-amber-900 italic">&quot;Success is the sum of small efforts repeated daily.&quot;</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Everything You Need to Build Better Habits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help you stay consistent and achieve your goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl hover:shadow-xl transition">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                📧
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Daily Email Reports</h3>
              <p className="text-gray-600">
                Get automated email summaries every evening at 10 PM with your progress and a motivational quote
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl hover:shadow-xl transition">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                📊
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Beautiful Statistics</h3>
              <p className="text-gray-600">
                Track your progress with visual charts, completion percentages, and historical data
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl hover:shadow-xl transition">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                📱
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Device Sync</h3>
              <p className="text-gray-600">
                Access your habits from any device. Changes sync instantly across phone, tablet, and computer
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="p-8 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl hover:shadow-xl transition">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-rose-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                📄
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">PDF Export</h3>
              <p className="text-gray-600">
                Download professional PDF reports of your habit tracking data for any date range
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl hover:shadow-xl transition">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                🔒
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your data is encrypted and secure. Sign in safely with Google OAuth authentication
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="p-8 bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl hover:shadow-xl transition">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4">
                ∞
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Unlimited Habits</h3>
              <p className="text-gray-600">
                Track as many habits as you want. No limits, no premium plans, completely free forever
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section id="how-it-works" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Start Tracking in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600">
              Get started in less than 60 seconds
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sign In with Google</h3>
              <p className="text-gray-600 text-lg">
                Quick and secure login with your Google account. No passwords to remember.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Add Your Habits</h3>
              <p className="text-gray-600 text-lg">
                Create habits you want to build. Exercise, reading, meditation - anything!
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Check Off Daily</h3>
              <p className="text-gray-600 text-lg">
                Mark habits as complete. Get daily email reports with your progress.
              </p>
            </div>
            
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/login"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition"
            >
              Start Building Habits Now →
            </Link>
          </div>
        </div>
      </section>

      {/* ========== USE CASES ========== */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Perfect For Everyone
            </h2>
            <p className="text-xl text-gray-600">
              Whether you&apos;re a student, professional, or fitness enthusiast
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Students</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Study routines</li>
                <li>• Assignment tracking</li>
                <li>• Reading goals</li>
                <li>• Exercise habits</li>
              </ul>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Professionals</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Morning routines</li>
                <li>• Deep work sessions</li>
                <li>• Networking goals</li>
                <li>• Skill development</li>
              </ul>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-100">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fitness</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Workout tracking</li>
                <li>• Water intake</li>
                <li>• Meal planning</li>
                <li>• Sleep schedule</li>
              </ul>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
              <div className="text-4xl mb-4">🧘</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Wellness</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Meditation practice</li>
                <li>• Journaling</li>
                <li>• Gratitude habits</li>
                <li>• Mindfulness</li>
              </ul>
            </div>
            
          </div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section id="faq" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-6">
            
            <details className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>Is Habit Tracker really free?</span>
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes! Habit Tracker is completely free with no hidden costs. All features including unlimited habits, daily email reports, and PDF exports are free forever.
              </p>
            </details>
            
            <details className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>How do daily email reports work?</span>
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Every evening at 10 PM, you&apos;ll receive an automated email with your daily progress, completed habits, and a motivational quote to keep you inspired.
              </p>
            </details>
            
            <details className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>Can I use it on multiple devices?</span>
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Absolutely! Your habits sync across all your devices automatically. Start on your phone, continue on your laptop - seamlessly.
              </p>
            </details>
            
            <details className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>Is my data secure?</span>
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes, we take security seriously. We use Google OAuth for authentication (no passwords stored), encrypt all data, and implement row-level security in our database.
              </p>
            </details>
            
            <details className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>How many habits can I track?</span>
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                There&apos;s no limit! Track as many habits as you want - 5, 10, 50, or more. We believe in unlimited potential.
              </p>
            </details>
            
            <details className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 group">
              <summary className="font-bold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                <span>Can I see my historical data?</span>
                <span className="text-indigo-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Yes! View your complete habit history, track patterns over weeks and months, and export PDF reports for any date range.
              </p>
            </details>
            
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of people building better habits every day
          </p>
          <Link 
            href="/login"
            className="inline-block bg-white text-indigo-600 px-10 py-5 rounded-xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition"
          >
            Start Your Journey Free →
          </Link>
          <p className="mt-6 text-sm opacity-75">
            No credit card required • Free forever • Get started in 60 seconds
          </p>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  H
                </div>
                <span className="text-white text-xl font-bold">Habit Tracker</span>
              </div>
              <p className="text-sm">
                Build better habits, achieve your goals, and transform your life one day at a time.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
                <li><Link href="/login" className="hover:text-white transition">Get Started</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Habit Tracker. Built with ❤️ to help you build better habits.</p>
          </div>
        </div>
      </footer>
      
    </div>
  );
}