'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { cn } from '@/lib/utils';

export default function Home() {
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    project_type: '',
    message: ''
  });

  const phrases = ['Full Stack Developer', 'Prompt Engineer', 'Python Developer', 'Django Developer', 'Web Developer', 'AI Engineer'];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 60 : 120;
    const currentPhrase = phrases[phraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setCurrentText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentPhrase.length) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 480);
    return () => clearInterval(cursorInterval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > 500) return;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.message) {
      setSubmitStatus('Please fill in all required fields');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    if (formData.message.length > 500) {
      setSubmitStatus('Message must be 500 characters or less');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitStatus('Thanks! I\'ll get back to you within 4 hours.');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        project_type: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(''), 5000);
    }
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Nikesh Tamang - Senior Software Architect Resume';
    link.download = 'Nikesh_Tamang_Resume.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      {/* Hero Section - Fully Immersive & Responsive Japanese Ink Video Background */}
      <section id="hero" className="relative min-h-[100dvh] w-full flex items-center bg-[#fcfaf2] overflow-hidden">
        {/* Background Video Layer - Fully Responsive Object Cover */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-10"
          >
            <source src="/images/hero.mp4" type="video/mp4" />
          </video>

          {/* Aesthetic Overlays - Adjusted for better video visibility */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Elegant Ink Wash Gradient - Responsive Opacity */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#fcfaf2] via-[#fcfaf2]/30 md:via-[#fcfaf2]/10 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#fcfaf2]/80 via-transparent to-transparent md:hidden"></div>
            
            {/* Subtle Texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]"></div>
          </div>
        </div>

        {/* Foreground Content - Robust & Responsive Left Alignment */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-8 md:px-12 lg:px-16 pt-20 pb-12">
          <div className="max-w-3xl space-y-8 md:space-y-12 animate-fade-in-up">
            <div className="space-y-6 md:space-y-8">
              <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-sm bg-red-700/90 text-white text-[9px] md:text-xs font-black tracking-[0.2em] uppercase transform -skew-x-12 shadow-lg w-fit">
                <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 md:mr-3 animate-ping"></span>
                Software Architect
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gray-950 tracking-tighter leading-[1.1] md:leading-[0.9] drop-shadow-sm">
                NIKESH <br className="sm:hidden lg:block" />
                <span className="text-red-700">TAMANG</span>
              </h1>

              <div className="text-lg md:text-2xl lg:text-3xl text-gray-800 font-light flex flex-wrap items-center gap-x-2 md:gap-x-4 italic">
                <span className="opacity-60 tracking-wide uppercase text-[10px] md:text-xs font-black block w-full mb-1 sm:inline sm:w-auto sm:mb-0">Expert In</span>
                <span className="font-black text-red-600 border-b-2 md:border-b-4 border-red-700/10 pb-0.5 md:pb-1">
                  {currentText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
                </span>
              </div>

              <p className="text-sm md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-xl font-medium border-l-2 md:border-l-4 border-red-700/40 pl-4 md:pl-6">
                Solo developer leveraging <span className="text-red-700 font-black">AI-driven engineering</span> and deep software expertise to build high-performance applications that scale with your vision.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 md:gap-8 pt-2 md:pt-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 md:px-12 py-4 md:py-5 bg-red-700 text-white rounded-sm font-black text-sm md:text-lg transition-all hover:bg-black cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap text-center"
              >
                VIEW WORK
              </button>
              <button 
                onClick={downloadResume}
                className="px-8 md:px-12 py-4 md:py-5 bg-white text-black border-2 border-black rounded-sm font-black text-sm md:text-lg hover:bg-stone-50 transition-all cursor-pointer shadow-[6px_6px_0px_0px_rgba(185,28,28,0.3)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_0px_rgba(185,28,28,0.3)] whitespace-nowrap text-center"
              >
                RESUME
              </button>
            </div>

            <div className="flex items-center gap-6 md:gap-10 pt-6 md:pt-10">
              <div className="flex items-center gap-6 md:gap-8 text-2xl md:text-4xl">
                <a href="https://github.com/nikeshtamangghising" target="_blank" rel="noopener noreferrer" className="text-red-700/30 hover:text-red-700 transition-all hover:scale-110">
                  <i className="ri-github-fill"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-red-700/30 hover:text-red-700 transition-all hover:scale-110">
                  <i className="ri-linkedin-fill"></i>
                </a>
              </div>
              <div className="h-px flex-1 bg-red-700/10"></div>
              <div className="text-[10px] md:text-xs font-black text-red-700/30 uppercase tracking-[0.4em] hidden sm:block">
                Architect // 2024
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className="absolute bottom-6 right-6 lg:right-12 hidden sm:flex flex-col items-center gap-4 opacity-30 hover:opacity-100 transition-opacity">
          <span className="text-[10px] text-red-700 font-black tracking-[0.6em] uppercase [writing-mode:vertical-lr]">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-red-700/0 via-red-700 to-red-700/0 animate-shimmer"></div>
        </div>
      </section>

      {/* About Section - Japanese Ink Style */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-1 rounded-sm bg-stone-100 text-stone-600 text-[10px] font-black tracking-[0.3em] uppercase transform -skew-x-12">
                  The Architect
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tighter">
                  Crafting Digital <br />
                  <span className="text-red-700 underline decoration-4 underline-offset-8 decoration-red-700/20">Structures</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl font-medium">
                  With over 3 years of deep engineering experience, I specialize in building complex, 
                  high-performance systems that balance technical precision with artistic design.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="bg-[#fcfaf2] p-8 border-4 border-gray-950 shadow-[8px_8px_0px_0px_rgba(185,28,28,1)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
                  <div className="text-4xl font-black text-gray-950 mb-2">25+</div>
                  <div className="text-xs font-black uppercase tracking-widest text-red-700">Deployments</div>
                </div>
                <div className="bg-[#fcfaf2] p-8 border-4 border-gray-950 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none">
                  <div className="text-4xl font-black text-gray-950 mb-2">3+</div>
                  <div className="text-xs font-black uppercase tracking-widest text-red-700">Years XP</div>
                </div>
              </div>
            </div>

            <div className="relative animate-fade-in-right">
              <div className="bg-gray-950 p-8 rounded-sm shadow-[20px_20px_0px_0px_rgba(185,28,28,0.2)]">
                <div className="flex items-center mb-6 border-b border-gray-800 pb-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <div className="w-3 h-3 bg-stone-700 rounded-full"></div>
                    <div className="w-3 h-3 bg-stone-800 rounded-full"></div>
                  </div>
                  <span className="ml-6 font-mono text-[10px] text-stone-500 uppercase tracking-widest">architect.py</span>
                </div>

                <div className="font-mono text-sm space-y-3">
                  <div className="text-red-500">class <span className="text-white">Developer</span>:</div>
                  <div className="ml-4 space-y-1 text-stone-400">
                    <div>def __init__(self):</div>
                    <div className="ml-4 space-y-1">
                      <div>self.name = <span className="text-red-400">"Nikesh Tamang"</span></div>
                      <div>self.focus = <span className="text-red-400">"AI & Architecture"</span></div>
                      <div>self.stack = [<span className="text-white">"Python"</span>, <span className="text-white">"Django"</span>, <span className="text-white">"React"</span>]</div>
                      <div>self.approach = <span className="text-red-400">"Artistic Engineering"</span></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative ink splash element */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-700/5 rounded-full blur-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - Japanese Ink Style */}
      <section id="skills" className="py-24 bg-[#fcfaf2]">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-1 rounded-sm bg-red-700 text-white text-[10px] font-black tracking-[0.3em] uppercase transform -skew-x-12">
                Expertise
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tighter">
                Technical <span className="text-red-700">Mastery</span>
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-md font-medium border-l-2 border-red-700/30 pl-6 italic">
              "Precision in logic, fluid in design. The perfect balance of form and function."
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Frontend",
                icon: "ri-window-line",
                desc: "Responsive interfaces using React/Next.js with a focus on cinematic UX and performance.",
                color: "bg-red-700",
                skills: ["React & Next.js", "Tailwind CSS", "Framer Motion"]
              },
              {
                title: "Backend",
                icon: "ri-database-2-line",
                desc: "Scalable server architectures and RESTful APIs built with Python and Django framework.",
                color: "bg-gray-950",
                skills: ["Python & Django", "PostgreSQL", "System Design"]
              },
              {
                title: "AI & Tools",
                icon: "ri-rocket-line",
                desc: "Leveraging cutting-edge AI integration and modern DevOps for rapid development cycles.",
                color: "bg-red-700",
                skills: ["AI Integration", "Git & CI/CD", "Cloud Architecture"]
              }
            ].map((skill, idx) => (
              <div key={idx} className="group relative bg-white border-4 border-gray-950 p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className={cn("w-16 h-16 rounded-sm flex items-center justify-center mb-8 transform -rotate-6 group-hover:rotate-0 transition-transform", skill.color)}>
                  <i className={cn("text-3xl text-white", skill.icon)}></i>
                </div>
                <h3 className="text-2xl font-black text-gray-950 mb-4 uppercase tracking-tighter">{skill.title}</h3>
                <p className="text-gray-600 mb-8 font-medium leading-relaxed">{skill.desc}</p>
                <div className="space-y-4">
                  {skill.skills.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-red-700 rounded-full"></div>
                      <span className="text-xs font-black uppercase tracking-widest text-gray-950">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Japanese Ink Style */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-8 md:px-12">
          <div className="text-center mb-20 space-y-4">
            <div className="inline-flex items-center px-4 py-1 rounded-sm bg-stone-100 text-stone-600 text-[10px] font-black tracking-[0.3em] uppercase transform -skew-x-12">
              Feedback
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-950 tracking-tighter">
              Client <span className="text-red-700">Echoes</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                text: "Nikesh is a highly skilled developer who delivered our project on time and exceeded our expectations. His attention to detail and problem-solving skills are top-notch.",
                author: "A. Sharma",
                role: "Product Manager, TechFlow"
              },
              {
                text: "Working with Nikesh was a fantastic experience. He communicates clearly, writes clean code, and always finds creative solutions to tough problems.",
                author: "S. Lama",
                role: "Team Lead, Everest Solutions"
              },
              {
                text: "Nikesh’s expertise in Django and React helped us launch our MVP in record time. He’s proactive, reliable, and a true team player.",
                author: "M. Gurung",
                role: "CTO, StartupHub"
              },
              {
                text: "I was impressed by Nikesh’s ability to break down complex problems and deliver elegant solutions. He’s a pleasure to work with and always goes the extra mile.",
                author: "R. Karki",
                role: "Project Lead, CodeCrafters"
              }
            ].map((t, idx) => (
              <div key={idx} className="relative bg-[#fcfaf2] border-4 border-gray-950 p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] animate-fade-in-up" style={{ animationDelay: `${0.1 * idx}s`, animationFillMode: 'both' }}>
                <i className="ri-double-quotes-l text-4xl text-red-700/20 absolute top-6 left-6"></i>
                <p className="relative z-10 text-gray-700 text-lg font-medium mb-8 leading-relaxed italic">
                  “{t.text}”
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-950 rounded-sm flex items-center justify-center text-white font-black text-xl">
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="font-black text-gray-950 uppercase tracking-wider text-sm">{t.author}</div>
                    <div className="text-red-700 text-[10px] font-black uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Japanese Ink Style */}
      <section id="contact" className="py-24 bg-[#fcfaf2]">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-1 rounded-sm bg-red-700 text-white text-[10px] font-black tracking-[0.3em] uppercase transform -skew-x-12">
                  Get In Touch
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-gray-950 tracking-tighter">
                  Let's Build <br />
                  <span className="text-red-700">Together</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-md font-medium leading-relaxed">
                  Have a vision for a complex system or an AI-driven product? 
                  Let's combine our expertise to create something extraordinary.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-6 group cursor-pointer p-4 border-2 border-transparent hover:border-black hover:bg-white transition-all shadow-none hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="w-12 h-12 bg-gray-950 rounded-sm flex items-center justify-center group-hover:bg-red-700 transition-colors">
                    <i className="ri-mail-line text-white text-xl"></i>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-red-700">Direct Email</div>
                    <div className="font-black text-gray-950">nikeshtamangghising@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 group cursor-pointer p-4 border-2 border-transparent hover:border-black hover:bg-white transition-all shadow-none hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="w-12 h-12 bg-gray-950 rounded-sm flex items-center justify-center group-hover:bg-red-700 transition-colors">
                    <i className="ri-map-pin-line text-white text-xl"></i>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-red-700">Current Base</div>
                    <div className="font-black text-gray-950">Kathmandu, Nepal (Remote Worldwide)</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white border-4 border-gray-950 p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">First Name</label>
                    <input 
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-stone-50 border-2 border-gray-950 focus:bg-white focus:outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Last Name</label>
                    <input 
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-stone-50 border-2 border-gray-950 focus:bg-white focus:outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-stone-50 border-2 border-gray-950 focus:bg-white focus:outline-none transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Message</label>
                  <textarea 
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-stone-50 border-2 border-gray-950 focus:bg-white focus:outline-none transition-all resize-none"
                    required
                  />
                </div>

                {submitStatus && (
                  <div className={cn("p-4 font-black uppercase text-[10px] tracking-widest", submitStatus.includes('Thanks') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700')}>
                    {submitStatus}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-700 text-white py-5 font-black uppercase tracking-[0.3em] hover:bg-gray-950 transition-all cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Japanese Ink Style */}
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
                  <button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors text-left">Home</button>
                  <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors text-left">About</button>
                  <button onClick={() => scrollToSection('projects')} className="hover:text-white transition-colors text-left">Work</button>
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

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes fade-in-right {
          from { 
            opacity: 0; 
            transform: translateX(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float 3s ease-in-out infinite 1.5s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
