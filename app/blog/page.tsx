import Link from 'next/link';
import { blogPosts } from '../../data/blogPosts';
import { Navbar } from '@/components/Navbar';

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#fcfaf2] text-gray-950">
      <Navbar />
      
      <main className="pt-32 pb-24 max-w-7xl mx-auto px-8 md:px-12">
        {/* Header Section */}
        <div className="mb-20 space-y-6">
          <div className="inline-flex items-center px-4 py-1 rounded-sm bg-red-700 text-white text-[10px] font-black tracking-[0.3em] uppercase transform -skew-x-12">
            The Journal
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter">
            Insights & <br />
            <span className="text-red-700">Digital Logic</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl font-medium border-l-4 border-red-700/20 pl-6">
            Exploring the intersection of architectural precision, AI integration, and the art of clean code.
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div className="mb-24 group relative">
            <Link href={`/blog/${blogPosts[0].slug}`} className="block">
              <div className="grid lg:grid-cols-2 bg-white border-4 border-gray-950 shadow-[20px_20px_0px_0px_rgba(185,28,28,1)] overflow-hidden transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
                <div className="relative h-80 lg:h-auto overflow-hidden">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-red-700/10 mix-blend-multiply opacity-40"></div>
                </div>
                <div className="p-10 md:p-16 flex flex-col justify-center space-y-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.4em] text-red-700">Featured Article // {blogPosts[0].date}</div>
                  <h2 className="text-3xl md:text-5xl font-black leading-tight group-hover:text-red-700 transition-colors">{blogPosts[0].title}</h2>
                  <p className="text-gray-600 text-lg font-medium leading-relaxed">{blogPosts[0].excerpt}</p>
                  <div className="pt-4 inline-flex items-center text-sm font-black uppercase tracking-[0.2em] border-b-2 border-black group-hover:border-red-700 transition-colors w-fit">
                    Read Full Details <i className="ri-arrow-right-line ml-3"></i>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {blogPosts.slice(1).map((post, idx) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="bg-white border-4 border-gray-950 p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full animate-fade-in-up" style={{ animationDelay: `${0.1 * idx}s`, animationFillMode: 'both' }}>
                <div className="relative h-64 mb-8 overflow-hidden border-2 border-gray-950">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-red-700/5 mix-blend-multiply opacity-30"></div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-red-700 mb-4">{post.date}</div>
                <h3 className="text-2xl lg:text-3xl font-black mb-4 tracking-tighter leading-tight group-hover:text-red-700 transition-colors">{post.title}</h3>
                <p className="text-gray-600 font-medium mb-8 flex-grow">{post.excerpt}</p>
                <div className="inline-flex items-center text-xs font-black uppercase tracking-[0.2em] text-gray-950 group-hover:text-red-700 transition-colors">
                  Continue Reading <i className="ri-arrow-right-s-line ml-2"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Reused Footer from home redesign */}
      <footer className="bg-gray-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            <div className="max-w-sm space-y-6">
              <div className="text-3xl font-black tracking-tighter">
                NIKESH<span className="text-red-700">T</span>
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