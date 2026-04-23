import { blogPosts } from '../../../data/blogPosts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { FiCalendar } from 'react-icons/fi';
import { Navbar } from '@/components/Navbar';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return notFound();
  
  return (
    <div className="min-h-screen bg-[#fcfaf2] text-gray-950">
      <Navbar />
      
      <main className="pt-32 pb-24">
        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-8 md:px-12 mb-16 text-center">
          <div className="inline-flex items-center px-4 py-1 rounded-sm bg-red-700 text-white text-[10px] font-black tracking-[0.3em] uppercase transform -skew-x-12 mb-8">
            {post.date}
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight mb-12">
            {post.title}
          </h1>
          
          <div className="relative aspect-video w-full border-4 border-gray-950 shadow-[20px_20px_0px_0px_rgba(185,28,28,1)] overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-red-700/5 mix-blend-multiply"></div>
          </div>
        </header>

        {/* Article Content */}
        <article className="max-w-3xl mx-auto px-8 md:px-12">
          <div className="prose prose-lg prose-stone max-w-none 
            prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
            prose-h2:text-3xl prose-h2:border-l-4 prose-h2:border-red-700 prose-h2:pl-6
            prose-p:font-medium prose-p:text-gray-700 prose-p:leading-relaxed
            prose-strong:text-red-700 prose-strong:font-black
            prose-code:bg-gray-950 prose-code:text-white prose-code:px-2 prose-code:py-1 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none
            prose-a:text-red-700 prose-a:no-underline prose-a:border-b-2 prose-a:border-red-700/20 hover:prose-a:border-red-700 transition-all">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <div className="mt-20 pt-10 border-t-4 border-gray-950 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 text-left">
              <div className="w-16 h-16 rounded-sm bg-gray-950 flex items-center justify-center text-3xl font-black text-white transform -rotate-6">N</div>
              <div>
                <div className="font-black text-gray-950 uppercase tracking-wider">Nikesh Tamang</div>
                <div className="text-red-700 text-[10px] font-black uppercase tracking-widest">Architect & Solo Developer</div>
              </div>
            </div>
            <Link 
              href="/blog" 
              className="px-8 py-4 bg-white border-4 border-gray-950 font-black text-xs uppercase tracking-[0.3em] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
            >
              Back to Journal
            </Link>
          </div>
        </article>
      </main>

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