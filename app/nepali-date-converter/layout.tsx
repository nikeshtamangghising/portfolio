import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nepali Date Converter | AD to BS & BS to AD | Age Calculator',
  description: 'Fast and accurate Nepali Date Converter (AD to BS, BS to AD) and Age Calculator. Convert English dates to Nepali Bikram Sambat accurately. Perfect for birthdays and official documents.',
  keywords: 'Nepali Date Converter, AD to BS, BS to AD, English to Nepali Date, Nepali to English Date, Age Calculator, Bikram Sambat, Nepali Calendar converter',
  openGraph: {
    title: 'Nepali Date Converter | AD to BS & BS to AD',
    description: 'Accurate Nepali Date Converter and Age Calculator. Support for Bikram Sambat and Gregorian calendars.',
    url: 'https://tamangnikesh.com.np/nepali-date-converter',
    type: 'website',
  },
};

export default function NepaliDateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
