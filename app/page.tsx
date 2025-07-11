
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
              <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Contact</button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
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
                Building modern web applications with Python, Django, and cutting-edge AI technologies. 
                I create seamless full-stack solutions and intelligent systems that drive business growth.
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
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer group">
                <i className="ri-github-fill text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer group">
                <i className="ri-linkedin-fill text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
              <a href="https://stackoverflow.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:scale-110 cursor-pointer group">
                <i className="ri-stack-overflow-line text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
            </div>
          </div>

          <div className="relative animate-fade-in-right">
            <div className="relative z-10">
              <img 
                src="https://readdy.ai/api/search-image?query=senior%20software%20engineer%20working%20at%20modern%20tech%20startup%20office%20with%20multiple%20monitors%20displaying%20code%2C%20wearing%20casual%20business%20attire%2C%20natural%20lighting%20through%20large%20windows%2C%20focused%20on%20complex%20system%20architecture%20design&width=600&height=700&seq=senior-dev&orientation=portrait"
                alt="Senior Software Engineer"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Engineering Excellence</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bridging the gap between innovative ideas and robust technical implementations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="prose prose-lg">
                <p className="text-gray-600 leading-relaxed">
                  With 8+ years in enterprise software development, I've architected systems that serve millions of users. 
                  My journey started at a fintech startup where I learned to build fast, secure, and scalable solutions 
                  under pressure.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Currently leading a team of 12 engineers at TechFlow Solutions, where we've reduced system downtime by 95% 
                  and improved deployment frequency from monthly to daily releases. I believe in code that not only works 
                  but tells a story.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">127+</div>
                  <div className="text-gray-600">Projects Delivered</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">43</div>
                  <div className="text-gray-600">Team Members Mentored</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-50 p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                  <span className="text-gray-500 text-sm">senior-architect.ts</span>
                </div>

                <div className="font-mono text-sm space-y-2">
                  <div className="text-purple-600">interface <span className="text-blue-600">TechLead</span> {`{`}</div>
                  <div className="ml-4 space-y-1">
                    <div><span className="text-red-600">name</span>: <span className="text-green-600">"Nikesh Tamang"</span>;</div>
                    <div><span className="text-red-600">role</span>: <span className="text-green-600">"Senior Software Architect"</span>;</div>
                    <div><span className="text-red-600">experience</span>: <span className="text-orange-600">8.5</span>;</div>
                    <div><span className="text-red-600">specialties</span>: [</div>
                    <div className="ml-4 space-y-1">
                      <div><span className="text-green-600">"Microservices"</span>,</div>
                      <div><span className="text-green-600">"Cloud Architecture"</span>,</div>
                      <div><span className="text-green-600">"Team Leadership"</span></div>
                    </div>
                    <div>];</div>
                    <div><span className="text-red-600">philosophy</span>: <span className="text-green-600">"Code with purpose"</span>;</div>
                  </div>
                  <div className="text-purple-600">{`}`}</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Competencies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep expertise across the full technology stack with focus on scalable architecture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-window-line text-2xl text-indigo-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Frontend Architecture</h3>
              <p className="text-gray-600 mb-6">Building performant, accessible user interfaces with modern frameworks and design systems.</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">React Ecosystem</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-11/12"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Vue.js & Nuxt</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full w-10/12"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Angular</span>
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">Backend Systems</h3>
              <p className="text-gray-600 mb-6">Designing distributed systems and APIs that handle millions of requests with reliability.</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Go & Microservices</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full w-11/12"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Python & Django</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full w-10/12"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">GraphQL & REST</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full w-11/12"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-rocket-line text-2xl text-amber-600"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">DevOps & Infrastructure</h3>
              <p className="text-gray-600 mb-6">Automating deployments and maintaining high-availability systems on cloud platforms.</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Kubernetes & Docker</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-600 h-2 rounded-full w-10/12"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">AWS & GCP</span>
                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-600 h-2 rounded-full w-11/12"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Terraform & GitOps</span>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Selected projects showcasing technical depth and business impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=fintech%20trading%20platform%20dashboard%20with%20real-time%20market%20data%2C%20financial%20charts%20and%20graphs%2C%20modern%20dark%20theme%20interface%20showing%20cryptocurrency%20and%20stock%20trading%20analytics%2C%20professional%20financial%20software%20design&width=400&height=250&seq=fintech-platform&orientation=landscape"
                  alt="FinTech Trading Platform"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                  <span className="text-sm text-emerald-600 font-medium">Production</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">FinTech Trading Platform</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Real-time trading platform processing 2M+ transactions daily. Built microservices architecture 
                  with sub-100ms latency and 99.99% uptime guarantee.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Go</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">Kafka</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">Redis</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">$2.4B traded volume</span>
                  <button className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors cursor-pointer">
                    <i className="ri-external-link-line text-indigo-600"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=healthcare%20management%20system%20interface%20showing%20patient%20records%2C%20medical%20data%20visualization%2C%20appointment%20scheduling%2C%20clean%20medical%20software%20design%20with%20charts%20and%20patient%20information%20dashboard&width=400&height=250&seq=healthcare-system&orientation=landscape"
                  alt="Healthcare Management System"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm text-blue-600 font-medium">Enterprise</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Healthcare Management Suite</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  HIPAA-compliant platform serving 150+ hospitals. Reduced patient wait times by 45% 
                  through intelligent scheduling and resource optimization algorithms.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 text-xs rounded-full">React</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">Node.js</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">PostgreSQL</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">2.3M patients served</span>
                  <button className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors cursor-pointer">
                    <i className="ri-external-link-line text-indigo-600"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105">
              <div className="relative overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=AI%20machine%20learning%20analytics%20platform%20showing%20data%20science%20workflow%2C%20neural%20network%20visualization%2C%20model%20training%20interface%2C%20modern%20data%20science%20dashboard%20with%20charts%20and%20AI%20metrics&width=400&height=250&seq=ai-platform&orientation=landscape"
                  alt="AI Analytics Platform"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                  <span className="text-sm text-amber-600 font-medium">AI/ML</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">AI Analytics Engine</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  Machine learning platform that processes 50TB+ daily data for predictive analytics. 
                  Achieved 94% accuracy in fraud detection for enterprise clients.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">Python</span>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">TensorFlow</span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs rounded-full">Spark</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">94% accuracy rate</span>
                  <button className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors cursor-pointer">
                    <i className="ri-external-link-line text-indigo-600"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer">
              Explore All Projects
            </button>
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
              Looking for technical leadership or system architecture expertise? Let's discuss how we can build something exceptional together.
            </p>
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
                      <div className="font-semibold text-gray-900">nikesh.tamang@techflow.dev</div>
                      <div className="text-gray-600 text-sm">Response within 4 hours</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 hover:bg-white p-4 rounded-lg transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <i className="ri-phone-line text-emerald-600"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">+1 (415) 892-3647</div>
                      <div className="text-gray-600 text-sm">Available Mon-Fri, 8am-7pm PST</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 hover:bg-white p-4 rounded-lg transition-colors cursor-pointer">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <i className="ri-map-pin-line text-amber-600"></i>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">San Francisco Bay Area</div>
                      <div className="text-gray-600 text-sm">Open to remote and hybrid opportunities</div>
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
                      <option value="architecture">System Architecture</option>
                      <option value="leadership">Technical Leadership</option>
                      <option value="fullstack">Full-Stack Development</option>
                      <option value="consulting">Strategic Consulting</option>
                      <option value="mentorship">Team Mentorship</option>
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
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 hover:scale-110 cursor-pointer group">
                <i className="ri-github-fill text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 hover:scale-110 cursor-pointer group">
                <i className="ri-linkedin-fill text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
              <a href="https://stackoverflow.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 hover:scale-110 cursor-pointer group">
                <i className="ri-stack-overflow-line text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
              <a href="mailto:nikesh.tamang@techflow.dev" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 hover:scale-110 cursor-pointer group">
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
