import { projects } from '../../data/projects';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <div className="pt-24 pb-12">
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8 md:px-12">
            <div className="text-center mb-20 space-y-4">
              <div className="inline-flex items-center px-4 py-1 rounded-sm bg-stone-100 text-stone-600 text-[10px] font-black tracking-[0.3em] uppercase transform -skew-x-12">
                Archives
              </div>
              <h2 className="text-4xl md:text-7xl font-black text-gray-950 tracking-tighter">
                Complete <span className="text-red-700">Works</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
                A comprehensive look at my engineering journey and technical breakthroughs.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.map((project, idx) => (
                <div key={project.slug} className="group relative bg-[#fcfaf2] border-4 border-gray-950 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
                  <div className="relative h-56 overflow-hidden border-b-4 border-gray-950">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-red-700/5 mix-blend-multiply"></div>
                  </div>
                  <div className="p-8 flex flex-col h-full">
                    <h3 className="text-2xl font-black text-gray-950 mb-3 uppercase tracking-tighter">{project.title}</h3>
                    <p className="text-gray-600 mb-6 text-sm font-medium leading-relaxed flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white border-2 border-gray-950 text-gray-950 text-[10px] font-black uppercase tracking-widest">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-red-700">{project.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer - Japanese Ink Style */}
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