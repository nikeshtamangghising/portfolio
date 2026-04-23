'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AdUnitProps {
  className?: string;
  slot?: string;
}

export function AdUnit({ className, slot = "8746231905" }: AdUnitProps) {
  useEffect(() => {
    const pushAd = () => {
      try {
        // @ts-ignore
        const adsbygoogle = window.adsbygoogle || [];
        // Only push if there are unprocessed 'ins' elements
        const insElements = document.querySelectorAll('ins.adsbygoogle');
        const unprocessed = Array.from(insElements).filter(ins => !ins.getAttribute('data-adsbygoogle-status'));
        
        if (unprocessed.length > 0) {
          adsbygoogle.push({});
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(pushAd, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn(
      "w-full flex flex-col items-center my-16 animate-fade-in",
      className
    )}>
      <div className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-400 mb-4 flex items-center gap-4 w-full max-w-4xl px-4">
        <div className="h-px flex-1 bg-stone-200"></div>
        Advertisement
        <div className="h-px flex-1 bg-stone-200"></div>
      </div>
      
      <div className="w-full max-w-4xl bg-[#fcfaf2] border-2 border-dashed border-stone-300 p-4 rounded-sm min-h-[100px] flex items-center justify-center overflow-hidden">
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%' }}
             data-ad-client="ca-pub-3352477473738081"
             data-ad-slot={slot}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
      </div>
    </div>
  );
}
