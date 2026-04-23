'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { AdUnit } from '@/components/AdUnit';
import Link from 'next/link';
import NepaliDate from 'nepali-date-converter';
import { cn } from '@/lib/utils';

export default function ToolsPage() {
  // Age Calculator State
  const [ageInputType, setAgeInputType] = useState<'AD' | 'BS'>('AD');
  const [ageDate, setAgeDate] = useState({ year: 2050, month: 1, day: 1 });
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  // Date Converter State
  const [convInputType, setConvInputType] = useState<'AD' | 'BS'>('AD');
  const [convDate, setConvDate] = useState({ year: 2024, month: 1, day: 1 });
  const [conversionResult, setConversionResult] = useState<{ main: string; details: string } | null>(null);

  // Constants
  const monthsAD = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthsBS = ["Baisakh", "Jestha", "Ashadh", "Shrawan", "Bhadra", "Ashwin", "Kartik", "Mangsir", "Poush", "Magh", "Falgun", "Chaitra"];
  
  const yearsAD = Array.from({ length: 120 }, (_, i) => 2026 - i);
  const yearsBS = Array.from({ length: 120 }, (_, i) => 2083 - i);
  const days = Array.from({ length: 32 }, (_, i) => i + 1);

  // Sync year range based on type
  useEffect(() => {
    if (convInputType === 'AD') setConvDate(p => ({ ...p, year: 2024 }));
    else setConvDate(p => ({ ...p, year: 2081 }));
  }, [convInputType]);

  // Age Calculation Logic
  const handleCalculateAge = () => {
    let birth: Date;
    if (ageInputType === 'BS') {
      const nepDate = new NepaliDate(ageDate.year, ageDate.month - 1, ageDate.day);
      birth = nepDate.toJsDate();
    } else {
      birth = new Date(ageDate.year, ageDate.month - 1, ageDate.day);
    }
    
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let daysDiff = now.getDate() - birth.getDate();

    if (daysDiff < 0) {
      months--;
      daysDiff += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setAge({ years, months, days: daysDiff });
  };

  // Conversion Logic
  const handleConvert = () => {
    try {
      if (convInputType === 'AD') {
        const ad = new Date(convDate.year, convDate.month - 1, convDate.day);
        const bs = new NepaliDate(ad);
        setConversionResult({
          main: bs.format('YYYY-MM-DD'),
          details: `${bs.format('DD MMMM YYYY')}, ${bs.format('dddd')}`
        });
      } else {
        const bs = new NepaliDate(convDate.year, convDate.month - 1, convDate.day);
        const ad = bs.toJsDate();
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setConversionResult({
          main: ad.toISOString().split('T')[0],
          details: ad.toLocaleDateString('en-US', options)
        });
      }
    } catch (e) {
      setConversionResult({ main: 'Invalid Date', details: 'The selected date is out of range.' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf2] text-gray-950">
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Nepali Date Converter",
            "operatingSystem": "All",
            "applicationCategory": "UtilityApplication",
            "description": "Accurate Nepali Date Converter (AD to BS, BS to AD) and Age Calculator for Bikram Sambat and Gregorian calendars.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "author": {
              "@type": "Person",
              "name": "Nikesh Tamang"
            }
          })
        }}
      />
      
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-20 space-y-6 text-left">
          <div className="inline-flex items-center px-4 py-1 rounded-sm bg-red-700 text-white text-[10px] font-black tracking-[0.3em] uppercase transform -skew-x-12">
            Nepali Date Converter
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter">
            Digital <span className="text-red-700">Panchang</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl font-medium border-l-4 border-red-700/20 pl-6">
            Universal date transformation and precise age calculation for global and cultural contexts.
          </p>
        </div>

        <div className="flex flex-col gap-16 lg:gap-24">
          {/* Date Converter Section */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-white border-4 border-gray-950 p-6 md:p-12 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] max-w-4xl mx-auto w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-700 flex items-center justify-center text-white text-2xl transform rotate-6">
                    <i className="ri-arrow-left-right-line"></i>
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Date Converter</h2>
                </div>
                <div className="flex items-center gap-4 bg-stone-100 p-1.5 rounded-sm border-2 border-black w-fit">
                  <span className={cn("text-[10px] font-black uppercase px-2", convInputType === 'AD' ? "text-red-700" : "text-gray-400")}>English (AD)</span>
                  <button 
                    onClick={() => setConvInputType(p => p === 'AD' ? 'BS' : 'AD')}
                    className="w-14 h-7 bg-gray-950 rounded-full relative p-1 transition-colors"
                  >
                    <div className={cn("w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md", convInputType === 'BS' ? "translate-x-7" : "translate-x-0")}></div>
                  </button>
                  <span className={cn("text-[10px] font-black uppercase px-2", convInputType === 'BS' ? "text-red-700" : "text-gray-400")}>Nepali (BS)</span>
                </div>
              </div>

              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Year</label>
                    <select 
                      value={convDate.year}
                      onChange={(e) => setConvDate({...convDate, year: parseInt(e.target.value)})}
                      className="w-full p-4 bg-stone-50 border-2 border-black font-bold appearance-none cursor-pointer focus:bg-white transition-colors"
                    >
                      {(convInputType === 'AD' ? yearsAD : yearsBS).map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Month</label>
                    <select 
                      value={convDate.month}
                      onChange={(e) => setConvDate({...convDate, month: parseInt(e.target.value)})}
                      className="w-full p-4 bg-stone-50 border-2 border-black font-bold appearance-none cursor-pointer focus:bg-white transition-colors"
                    >
                      {(convInputType === 'AD' ? monthsAD : monthsBS).map((m, i) => <option key={m} value={i+1}>{m}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Day</label>
                    <select 
                      value={convDate.day}
                      onChange={(e) => setConvDate({...convDate, day: parseInt(e.target.value)})}
                      className="w-full p-4 bg-stone-50 border-2 border-black font-bold appearance-none cursor-pointer focus:bg-white transition-colors"
                    >
                      {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handleConvert}
                  className="w-full bg-red-700 text-white py-6 font-black uppercase tracking-[0.4em] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all hover:bg-gray-950"
                >
                  Convert Date
                </button>

                {conversionResult && (
                  <div className="pt-12 border-t-4 border-red-700 flex flex-col items-center text-center animate-fade-in">
                    <div className="text-[10px] font-black uppercase text-gray-400 mb-3 tracking-[0.2em]">Target {convInputType === 'AD' ? 'Nepali (BS)' : 'English (AD)'} Date</div>
                    <div className="text-5xl md:text-7xl font-black text-gray-950 tracking-tighter mb-4">{conversionResult.main}</div>
                    <div className="text-sm md:text-base font-black text-red-700 uppercase tracking-widest bg-red-50 px-6 py-2 rounded-sm border-2 border-red-700/10">
                      {conversionResult.details}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Age Calculator Section */}
          <div className="space-y-8 animate-fade-in-up delay-200">
            <div className="bg-white border-4 border-gray-950 p-6 md:p-12 shadow-[15px_15px_0px_0px_rgba(185,28,28,1)] max-w-4xl mx-auto w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-950 flex items-center justify-center text-white text-2xl transform -rotate-6">
                    <i className="ri-calendar-event-line"></i>
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Age Calculator</h2>
                </div>
                <div className="flex bg-stone-100 p-1.5 rounded-sm border-2 border-black w-fit">
                  <button 
                    onClick={() => setAgeInputType('AD')}
                    className={cn("px-5 py-1.5 text-[10px] font-black transition-all uppercase tracking-widest", ageInputType === 'AD' ? "bg-red-700 text-white shadow-md" : "text-gray-500")}
                  >AD</button>
                  <button 
                    onClick={() => setAgeInputType('BS')}
                    className={cn("px-5 py-1.5 text-[10px] font-black transition-all uppercase tracking-widest", ageInputType === 'BS' ? "bg-red-700 text-white shadow-md" : "text-gray-500")}
                  >BS</button>
                </div>
              </div>

              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Birth Year</label>
                    <select 
                      value={ageDate.year}
                      onChange={(e) => setAgeDate({...ageDate, year: parseInt(e.target.value)})}
                      className="w-full p-4 bg-stone-50 border-2 border-black font-bold appearance-none cursor-pointer focus:bg-white transition-colors"
                    >
                      {(ageInputType === 'AD' ? yearsAD : yearsBS).map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Birth Month</label>
                    <select 
                      value={ageDate.month}
                      onChange={(e) => setAgeDate({...ageDate, month: parseInt(e.target.value)})}
                      className="w-full p-4 bg-stone-50 border-2 border-black font-bold appearance-none cursor-pointer focus:bg-white transition-colors"
                    >
                      {(ageInputType === 'AD' ? monthsAD : monthsBS).map((m, i) => <option key={m} value={i+1}>{m}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Birth Day</label>
                    <select 
                      value={ageDate.day}
                      onChange={(e) => setAgeDate({...ageDate, day: parseInt(e.target.value)})}
                      className="w-full p-4 bg-stone-50 border-2 border-black font-bold appearance-none cursor-pointer focus:bg-white transition-colors"
                    >
                      {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <button 
                  onClick={handleCalculateAge}
                  className="w-full bg-gray-950 text-white py-6 font-black uppercase tracking-[0.4em] shadow-[10px_10px_0px_0px_rgba(185,28,28,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all hover:bg-red-700"
                >
                  Calculate Age
                </button>

                {age && (
                  <div className="pt-12 grid grid-cols-3 gap-6 border-t-4 border-stone-100 animate-fade-in">
                    <div className="text-center bg-stone-50 p-6 border-2 border-black/5 rounded-sm">
                      <div className="text-5xl md:text-6xl font-black text-red-700 tracking-tighter">{age.years}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2">Years</div>
                    </div>
                    <div className="text-center bg-stone-50 p-6 border-2 border-black/5 rounded-sm">
                      <div className="text-5xl md:text-6xl font-black text-red-700 tracking-tighter">{age.months}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2">Months</div>
                    </div>
                    <div className="text-center bg-stone-50 p-6 border-2 border-black/5 rounded-sm">
                      <div className="text-5xl md:text-6xl font-black text-red-700 tracking-tighter">{age.days}</div>
                      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mt-2">Days</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <AdUnit />

        {/* SEO Content Section */}
        <div className="mt-24 border-t-4 border-gray-950 pt-16 space-y-12 animate-fade-in">
          <section className="space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter">About Nepali Date Converter</h2>
            <p className="text-gray-600 font-medium leading-relaxed max-w-4xl">
              Our <strong>Nepali Date Converter</strong> is a precision tool designed to bridge the gap between the <strong>Gregorian Calendar (AD)</strong> and the <strong>Bikram Sambat (BS)</strong>. 
              Bikram Sambat is the official calendar of Nepal, which is approximately 56 years and 8 months ahead of the AD calendar. 
              This tool uses advanced algorithms to ensure 100% accuracy for historical and future dates, making it essential for official documentation, birthdays, and cultural planning.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl font-black uppercase tracking-widest text-red-700">How to convert AD to BS?</h3>
              <p className="text-gray-600 font-medium text-sm leading-relaxed">
                Simply select the English year, month, and day from the dropdowns in the converter section. 
                Click "Convert" and the system will instantly generate the corresponding Nepali date in Bikram Sambat format, 
                including the day of the week.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-black uppercase tracking-widest text-red-700">Accurate Age Calculation</h3>
              <p className="text-gray-600 font-medium text-sm leading-relaxed">
                Most calculators only work with English dates. Our <strong>Age Calculator</strong> is unique because it allows you to 
                input your birth date in either AD or BS. It handles the leap years and varying month lengths of the Nepali calendar 
                to give you your exact age down to the day.
              </p>
            </div>
          </div>

          <section className="bg-gray-950 text-white p-10 rounded-sm">
            <h3 className="text-xl font-black uppercase tracking-[0.2em] mb-6">Frequently Asked Questions</h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-red-500 font-black uppercase text-xs mb-2">What is the difference between AD and BS?</h4>
                <p className="text-stone-400 text-sm">AD (Anno Domini) follows the Gregorian calendar used globally, while BS (Bikram Sambat) is the lunar-solar Hindu calendar used in Nepal.</p>
              </div>
              <div>
                <h4 className="text-red-500 font-black uppercase text-xs mb-2">Is this converter accurate for 2081 and beyond?</h4>
                <p className="text-stone-400 text-sm">Yes, our tool is updated with the latest Nepali Patro data to support future years including 2081, 2082, and beyond.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Reused Footer Consistent with Home */}
      <footer className="bg-gray-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            <div className="max-w-sm space-y-6">
              <div className="text-3xl font-black tracking-tighter uppercase">
                Nikesh<span className="text-red-700"> Tamang</span>
              </div>
              <p className="text-stone-400 font-medium leading-relaxed italic">
                "Where precision logic meets artistic digital vision. Built with passion and purpose."
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              <div className="space-y-4">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-red-700">Navigation</div>
                <div className="flex flex-col space-y-2 text-stone-400 font-bold uppercase text-xs tracking-widest">
                  <Link href="/" className="hover:text-white transition-colors text-left">Home</Link>
                  <Link href="/#about" className="hover:text-white transition-colors text-left">About</Link>
                  <Link href="/projects" className="hover:text-white transition-colors text-left">Work</Link>
                  <Link href="/blog" className="hover:text-white transition-colors text-left">Blog</Link>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-red-700">Connect</div>
                <div className="flex flex-col space-y-2 text-stone-400 font-bold uppercase text-xs tracking-widest">
                  <a href="https://github.com/nikeshtamangghising" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                  <a href="mailto:nikeshtamangghising@gmail.com" className="hover:text-white transition-colors">Email</a>
                </div>
              </div>

              <div className="space-y-4 col-span-2 sm:col-span-1">
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-red-700">Support</div>
                <a 
                  href="https://buymeacoffee.com/nikeshtamag" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-sm font-black text-[10px] tracking-widest hover:bg-red-700 hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(185,28,28,1)]"
                >
                  <i className="ri-cup-line"></i> BUY COFFEE
                </a>
              </div>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-600">
              &copy; MMXXIV // NIKESH TAMANG
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 bg-red-700 rounded-full animate-pulse"></div>
              <div className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-600">
                Crafted in Kathmandu
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
