'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import Link from 'next/link';
import NepaliDate from 'nepali-date-converter';
import { cn } from '@/lib/utils';

export default function ToolsPage() {
  // Age Calculator State
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  // Date Converter State
  const [adDate, setAdDate] = useState('');
  const [bsDate, setBsDate] = useState({ year: 2081, month: 1, day: 1 });
  const [convertedBs, setConvertedBs] = useState('');
  const [convertedAd, setConvertedAd] = useState('');

  // Age Calculation Logic
  const calculateAge = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const now = new Date();
    
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setAge({ years, months, days });
  };

  // AD to BS Logic
  const convertAdToBs = () => {
    if (!adDate) return;
    try {
      const ad = new Date(adDate);
      const bs = new NepaliDate(ad);
      setConvertedBs(bs.format('YYYY-MM-DD'));
    } catch (e) {
      setConvertedBs('Invalid Date');
    }
  };

  // BS to AD Logic
  const convertBsToAd = () => {
    try {
      const bs = new NepaliDate(bsDate.year, bsDate.month - 1, bsDate.day);
      const ad = bs.toJsDate();
      setConvertedAd(ad.toISOString().split('T')[0]);
    } catch (e) {
      setConvertedAd('Invalid Date');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf2] text-gray-950">
      <Navbar />
      
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-8 md:px-12">
        {/* Header Section */}
        <div className="mb-20 space-y-6 text-left">
          <div className="inline-flex items-center px-4 py-1 rounded-sm bg-red-700 text-white text-[10px] font-black tracking-[0.3em] uppercase transform -skew-x-12">
            Utility Hub
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter">
            Digital <br />
            <span className="text-red-700">Instruments</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl font-medium border-l-4 border-red-700/20 pl-6">
            A collection of precise tools for calculations and cultural date conversions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Age Calculator Card */}
          <div className="bg-white border-4 border-gray-950 p-10 shadow-[15px_15px_0px_0px_rgba(185,28,28,1)] animate-fade-in-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gray-950 flex items-center justify-center text-white text-2xl transform -rotate-6">
                <i className="ri-calendar-event-line"></i>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter">Age Calculator</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Select Birth Date (AD)</label>
                <input 
                  type="date" 
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-4 bg-stone-50 border-2 border-gray-950 focus:bg-white focus:outline-none font-bold"
                />
              </div>
              <button 
                onClick={calculateAge}
                className="w-full bg-red-700 text-white py-4 font-black uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
              >
                Calculate Age
              </button>

              {age && (
                <div className="mt-10 p-8 bg-gray-950 text-white rounded-sm border-l-8 border-red-700">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-4xl font-black text-red-500">{age.years}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">Years</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-red-500">{age.months}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">Months</div>
                    </div>
                    <div>
                      <div className="text-4xl font-black text-red-500">{age.days}</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-stone-500">Days</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Date Converter Card */}
          <div className="bg-white border-4 border-gray-950 p-10 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] animate-fade-in-up delay-200">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-red-700 flex items-center justify-center text-white text-2xl transform rotate-6">
                <i className="ri-arrow-left-right-line"></i>
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter">AD ⟷ BS Converter</h2>
            </div>

            <div className="space-y-10">
              {/* AD to BS */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-red-700">English to Nepali (AD to BS)</label>
                <div className="flex gap-4">
                  <input 
                    type="date" 
                    value={adDate}
                    onChange={(e) => setAdDate(e.target.value)}
                    className="flex-1 px-4 py-3 bg-stone-50 border-2 border-gray-950 font-bold"
                  />
                  <button 
                    onClick={convertAdToBs}
                    className="px-6 bg-gray-950 text-white font-black uppercase text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(185,28,28,1)]"
                  >
                    Convert
                  </button>
                </div>
                {convertedBs && (
                  <div className="p-4 bg-red-50 border-2 border-red-700/20 text-center">
                    <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">Nepali Date (BS)</span>
                    <span className="text-2xl font-black text-red-700">{convertedBs}</span>
                  </div>
                )}
              </div>

              {/* BS to AD */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-red-700">Nepali to English (BS to AD)</label>
                <div className="grid grid-cols-3 gap-3">
                  <input 
                    type="number" placeholder="YYYY" 
                    value={bsDate.year}
                    onChange={(e) => setBsDate({...bsDate, year: parseInt(e.target.value)})}
                    className="px-3 py-3 bg-stone-50 border-2 border-gray-950 font-bold text-center"
                  />
                  <input 
                    type="number" placeholder="MM" 
                    value={bsDate.month}
                    onChange={(e) => setBsDate({...bsDate, month: parseInt(e.target.value)})}
                    className="px-3 py-3 bg-stone-50 border-2 border-gray-950 font-bold text-center"
                  />
                  <input 
                    type="number" placeholder="DD" 
                    value={bsDate.day}
                    onChange={(e) => setBsDate({...bsDate, day: parseInt(e.target.value)})}
                    className="px-3 py-3 bg-stone-50 border-2 border-gray-950 font-bold text-center"
                  />
                </div>
                <button 
                  onClick={convertBsToAd}
                  className="w-full bg-gray-950 text-white py-4 font-black uppercase tracking-[0.2em] shadow-[6px_6px_0px_0px_rgba(185,28,28,1)] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                >
                  Convert to AD
                </button>
                {convertedAd && (
                  <div className="p-4 bg-stone-900 text-white text-center">
                    <span className="text-[10px] font-black uppercase text-stone-500 block mb-1">English Date (AD)</span>
                    <span className="text-2xl font-black text-white">{convertedAd}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-20 mt-12">
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
