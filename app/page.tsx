
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    setIsMenuOpen(false);
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
      {/* Clean Navigation */}
      <nav className="fixed top-0 w-full bg-white/85 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-gray-900 cursor-pointer" onClick={() => scrollToSection('hero')}>
              Nikesh<span className="text-indigo-600">T</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">About</button>
              <button onClick={() => scrollToSection('skills')} className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Expertise</button>
              <button onClick={() => scrollToSection('projects')} className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Portfolio</button>
              <Link href="/blog" className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer flex items-center">Blog</Link>
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-gray-600`}></i>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200 animate-fade-in">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('about')} className="text-left text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer py-2">About</button>
                <button onClick={() => scrollToSection('skills')} className="text-left text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer py-2">Expertise</button>
                <button onClick={() => scrollToSection('projects')} className="text-left text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer py-2">Portfolio</button>
                <Link href="/blog" className="text-left text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer py-2 flex items-center">Blog</Link>
                <button onClick={() => scrollToSection('contact')} className="text-left text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer py-2">Contact</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 pt-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium animate-pulse">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                Currently available
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight animate-fade-in-up">
                Hey, I'm <span className="text-indigo-600">Nikesh</span>
              </h1>

              <div className="text-xl md:text-2xl text-gray-600 h-12 flex items-center">
                <span className="mr-2">A passionate</span>
                <span className="text-indigo-600 font-bold">
                  {currentText}
                  <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
                </span>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg animate-fade-in-up delay-200">
                I'm a passionate developer who loves turning ideas into reality through code. 
                I specialize in Python, Django, and AI technologies, creating web applications 
                that are both beautiful and functional. From concept to deployment, I bring 
                your digital vision to life with clean, efficient code.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
              <button 
                onClick={() => scrollToSection('projects')}
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                View Portfolio
              </button>
              <button 
                onClick={downloadResume}
                className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 whitespace-nowrap cursor-pointer"
              >
                Get My Resume
              </button>
            </div>

            <div className="flex items-center space-x-6 pt-4 animate-fade-in-up delay-400">
              <a href="https://github.com/nikeshtamangghising" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer group"
                aria-label="GitHub profile of Nikesh Tamang"
              >
                <i className="ri-github-fill text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer group"
                aria-label="LinkedIn profile of Nikesh Tamang"
              >
                <i className="ri-linkedin-fill text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
            </div>
          </div>

          <div className="relative animate-fade-in-right">
            <div className="relative z-10">
              <img 
                src="/images/hero.jpg"
                alt="Nikesh Tamang"
                className="rounded-2xl shadow-2xl object-cover w-full h-96 md:h-[500px] hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-indigo-100 rounded-2xl -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-200 rounded-full opacity-70 animate-float"></div>
            <div className="absolute top-1/3 -right-8 w-16 h-16 bg-amber-200 rounded-full opacity-60 animate-float-delay"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
              <i className="ri-user-3-line mr-2"></i>
              About Nikesh
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">My Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From learning to code to building real-world applications that make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="mb-6">
                <p className="text-gray-800 text-lg leading-relaxed">
                  With over three years of dedicated experience in full-stack development, I am a passionate problem-solver adept at crafting robust and scalable web applications. My expertise spans Python, Django, and modern front-end frameworks like React, complemented by a strong foundation in AI technologies. I am committed to writing clean, maintainable code and translating complex ideas into intuitive user experiences.
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-4">
                  <li>Built and launched 25+ projects, including an e-commerce platform that reduced checkout times by 40%.</li>
                </ul>
              </div>

              <div className="prose prose-lg">
                <p className="text-gray-600 leading-relaxed">
                  My coding journey began with curiosity and a desire to create. I started with Python and quickly fell in love 
                  with Django's elegant framework. What started as simple scripts has evolved into full-stack web applications 
                  that solve real problems.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  I believe in writing code that's not just functional, but also readable and maintainable. Every project 
                  is an opportunity to learn something new, whether it's mastering a new framework or exploring AI integration. 
                  I'm passionate about creating user-friendly applications that make technology accessible to everyone.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">25+</div>
                  <div className="text-gray-600">Projects Built</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">3+</div>
                  <div className="text-gray-600">Years Coding</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-50 p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                  <span className="text-gray-500 text-sm">developer-profile.py</span>
                </div>

                <div className="font-mono text-sm space-y-2">
                  <div className="text-purple-600">class <span className="text-blue-600">Developer</span>:</div>
                  <div className="ml-4 space-y-1">
                    <div className="ml-4 space-y-1">
                      <div><span className="text-red-600">def</span> <span className="text-blue-600">__init__</span>(<span className="text-green-600">self</span>):</div>
                      <div className="ml-4 space-y-1">
                        <div><span className="text-green-600">self</span>.<span className="text-red-600">name</span> = <span className="text-green-600">"Nikesh Tamang"</span></div>
                        <div><span className="text-green-600">self</span>.<span className="text-red-600">role</span> = <span className="text-green-600">"Full Stack Developer"</span></div>
                        <div><span className="text-green-600">self</span>.<span className="text-red-600">experience</span> = <span className="text-orange-600">3</span></div>
                        <div><span className="text-green-600">self</span>.<span className="text-red-600">specialties</span> = [</div>
                        <div className="ml-4 space-y-1">
                          <div><span className="text-green-600">"Python"</span>,</div>
                          <div><span className="text-green-600">"Django"</span>,</div>
                          <div><span className="text-green-600">"React"</span>,</div>
                          <div><span className="text-green-600">"AI/ML"</span></div>
                        </div>
                        <div>]</div>
                        <div><span className="text-green-600">self</span>.<span className="text-red-600">philosophy</span> = <span className="text-green-600">"Code with passion"</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
              <i className="ri-tools-line mr-2"></i>
              Technical Expertise
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What I Do Best</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A mix of frontend creativity and backend logic, with a passion for clean, efficient code
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-window-line text-2xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Frontend Development</h3>
              <p className="text-gray-600 mb-6">Creating responsive, user-friendly interfaces that look great and work smoothly across all devices.</p>
              <p className="italic text-gray-500 mb-4">Example: Built a dynamic product dashboard for an e-commerce site using React and Next.js, improving user engagement and SEO.</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">React & Next.js</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-10/12"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">HTML/CSS/JavaScript</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-11/12"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Tailwind CSS</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-9/12"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-database-2-line text-2xl text-emerald-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Backend Development</h3>
              <p className="text-gray-600 mb-6">Building robust APIs and server-side logic that powers modern web applications with Python and Django.</p>
              <p className="italic text-gray-500 mb-4">Example: Designed and implemented RESTful APIs with Django REST Framework, enabling secure data exchange and efficient order processing for a multi-vendor platform.</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Python & Django</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-600 h-2 rounded-full w-11/12"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">REST APIs</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full w-10/12"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Database Design</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full w-9/12"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-rocket-line text-2xl text-amber-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tools & Technologies</h3>
              <p className="text-gray-600 mb-6">Using modern tools and platforms to build, deploy, and maintain web applications efficiently.</p>
              <p className="italic text-gray-500 mb-4">Example: Integrated OpenAI APIs for a customer support chatbot, and deployed full-stack apps to Vercel for seamless CI/CD and global performance.</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Git & GitHub</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-600 h-2 rounded-full w-11/12"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Vercel & Netlify</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-600 h-2 rounded-full w-10/12"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">AI Integration</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-600 h-2 rounded-full w-9/12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
              <i className="ri-briefcase-line mr-2"></i>
              Featured Work
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A collection of web applications and tools I've built to solve real problems
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <div className="relative overflow-hidden">
                <img 
                  src="/images/projects/ecommerce-platform.jpg"
                  alt="Screenshot of E-Commerce Platform project homepage"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                  <span className="text-sm text-emerald-600 font-medium">Production</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">E-Commerce Platform</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  A full-featured online store with user authentication, product management, 
                  shopping cart, and payment integration. Built with Django and React.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Django</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">React</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">PostgreSQL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Full-stack web app</span>
                  <div className="flex gap-2">
                    <a href="https://ecommerce-platform.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline text-xs">Live Demo</a>
                    <a href="https://github.com/nikeshtamangghising/ecommerce-platform" target="_blank" rel="noopener noreferrer" className="text-gray-700 underline text-xs">GitHub</a>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2"><strong>My Role:</strong> Full Stack Developer, Lead Frontend Architect</p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <div className="relative overflow-hidden">
                <img 
                  src="/images/projects/task-manager.jpg"
                  alt="Screenshot of Task Management App dashboard"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-blue-600 font-medium">Enterprise</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Task Management App</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  A collaborative task management tool with real-time updates, user roles, 
                  and progress tracking. Features drag-and-drop interface and team collaboration.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full">Python</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">Django</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">JavaScript</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Team collaboration tool</span>
                  <div className="flex gap-2">
                    <a href="https://task-management-app.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline text-xs">Live Demo</a>
                    <a href="https://github.com/nikeshtamangghising/task-management-app" target="_blank" rel="noopener noreferrer" className="text-gray-700 underline text-xs">GitHub</a>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2"><strong>My Role:</strong> Backend Developer, API Architect</p>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <div className="relative overflow-hidden">
                <img 
                  src="/images/projects/ai-chat-assistant.jpg"
                  alt="Screenshot of AI Chat Assistant conversation interface"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-sm text-amber-600 font-medium">AI/ML</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Chat Assistant</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  An intelligent chatbot integrated with OpenAI API for customer support. 
                  Features conversation history, sentiment analysis, and automated responses.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">Python</span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">OpenAI API</span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">Next.js</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">AI-powered chatbot</span>
                  <div className="flex gap-2">
                    <a href="https://ai-chat-assistant.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline text-xs">Live Demo</a>
                    <a href="https://github.com/nikeshtamangghising/ai-chat-assistant" target="_blank" rel="noopener noreferrer" className="text-gray-700 underline text-xs">GitHub</a>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2"><strong>My Role:</strong> AI Engineer, Chatbot Architect</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer">
                View More Projects
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              <i className="ri-chat-quote-line mr-2"></i>
              Testimonials
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Feedback from clients and collaborators</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <p className="text-gray-700 text-lg mb-4">“Nikesh is a highly skilled developer who delivered our project on time and exceeded our expectations. His attention to detail and problem-solving skills are top-notch.”</p>
              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <i className="ri-user-3-line text-indigo-600"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">A. Sharma</div>
                  <div className="text-gray-500 text-xs">Product Manager, TechFlow</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              <p className="text-gray-700 text-lg mb-4">“Working with Nikesh was a fantastic experience. He communicates clearly, writes clean code, and always finds creative solutions to tough problems.”</p>
              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <i className="ri-user-3-line text-indigo-600"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">S. Lama</div>
                  <div className="text-gray-500 text-xs">Team Lead, Everest Solutions</div>
                </div>
              </div>
            </div>
            {/* New Feedback Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <p className="text-gray-700 text-lg mb-4">“Nikesh’s expertise in Django and React helped us launch our MVP in record time. He’s proactive, reliable, and a true team player.”</p>
              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <i className="ri-user-3-line text-indigo-600"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">M. Gurung</div>
                  <div className="text-gray-500 text-xs">CTO, StartupHub</div>
                </div>
              </div>
            </div>
            {/* New Feedback Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              <p className="text-gray-700 text-lg mb-4">“I was impressed by Nikesh’s ability to break down complex problems and deliver elegant solutions. He’s a pleasure to work with and always goes the extra mile.”</p>
              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <i className="ri-user-3-line text-indigo-600"></i>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">R. Karki</div>
                  <div className="text-gray-500 text-xs">Project Lead, CodeCrafters</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
              <i className="ri-chat-3-line mr-2"></i>
              Let's Connect
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Collaborate?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Looking for technical leadership or system architecture expertise? Let's discuss how we can build something exceptional together.<br />
              <span className="block mt-2 font-semibold text-indigo-700">Currently available for remote full-time positions and freelance projects.</span>
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <a href="https://github.com/nikeshtamangghising" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 hover:scale-110 cursor-pointer group"
                aria-label="GitHub profile of Nikesh Tamang"
              >
                <i className="ri-github-fill text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 hover:scale-110 cursor-pointer group"
                aria-label="LinkedIn profile of Nikesh Tamang"
              >
                <i className="ri-linkedin-fill text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Let's build the future</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Whether you need to scale your current system, architect a new platform, or lead a technical transformation, 
                  I bring proven experience in delivering complex solutions that drive business growth.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4 hover:bg-white p-4 rounded-lg transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <i className="ri-mail-line text-indigo-600"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">nikeshtamangghising@gmail.com</div>
                      <div className="text-gray-600 text-sm">Response within 4 hours</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 hover:bg-white p-4 rounded-lg transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <i className="ri-phone-line text-emerald-600"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">+977 9869078280</div>
                      <div className="text-gray-600 text-sm">Available Mon-Fri, flexible hours</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 hover:bg-white p-4 rounded-lg transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <i className="ri-map-pin-line text-amber-600"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Naldum, Mandandeupur -2, Kavreplanchok, Nepal</div>
                      <div className="text-gray-600 text-sm">Open to remote opportunities worldwide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Sarah"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Johnson"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="sarah@company.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collaboration Type</label>
                  <div className="relative">
                    <select 
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 pr-8 appearance-none bg-white"
                    >
                      <option value="">Select collaboration type</option>
                      <option value="fullstack">Full-Stack Development</option>
                      <option value="ai">AI Integration</option>
                      <option value="architecture">System Architecture</option>
                      <option value="leadership">Technical Leadership</option>
                      <option value="consulting">Consulting</option>
                      <option value="mentorship">Mentorship</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <i className="ri-arrow-down-s-line text-gray-400"></i>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Vision</label>
                  <textarea 
                    name="message"
                    rows={4}
                    maxLength={500}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Share your technical challenges, goals, and how I can help drive your project forward..."
                    required
                  />
                  <div className="text-xs text-gray-500 mt-2">{formData.message.length}/500 characters</div>
                </div>

                {submitStatus && (
                  <div className={`p-4 rounded-lg text-sm ${submitStatus.includes('Thanks') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {submitStatus}
                    {submitStatus.includes('Thanks') && (
                      <div className="mt-2 text-gray-700">I typically respond to inquiries within 24-48 hours. I look forward to connecting!</div>
                    )}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    'Start Conversation'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <div className="text-2xl font-bold text-gray-900 mb-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
                Nikesh<span className="text-indigo-600">T</span>
              </div>
              <p className="text-gray-600">Engineering solutions that scale with your ambitions</p>
            </div>

            <div className="flex space-x-4">
              <a href="https://github.com/nikeshtamangghising" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 hover:scale-110 cursor-pointer group">
                <i className="ri-github-fill text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 hover:scale-110 cursor-pointer group">
                <i className="ri-linkedin-fill text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
              <a href="mailto:nikeshtamangghising@gmail.com" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 hover:scale-110 cursor-pointer group"
                aria-label="Email Nikesh Tamang"
              >
                <i className="ri-mail-line text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500">&copy; 2024 Nikesh Tamang. Built with purpose and precision.</p>
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
