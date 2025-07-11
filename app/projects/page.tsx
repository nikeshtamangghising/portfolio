import { projects } from '../../data/projects';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header (copied from homepage) */}
      <nav className="fixed top-0 w-full bg-white/85 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-gray-900 cursor-pointer">
              Nikesh<span className="text-indigo-600">T</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/#about" className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">About</Link>
              <Link href="/#skills" className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Expertise</Link>
              <Link href="/#projects" className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Portfolio</Link>
              <Link href="/#contact" className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Contact</Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="pt-24 pb-12">
        <section className="py-12 bg-white min-h-screen">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
                <i className="ri-briefcase-line mr-2"></i>
                All Projects
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Project Portfolio</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore more details about my work and technical skills.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.slug} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105">
                  <div className="relative overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{project.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* Footer (copied from homepage) */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold text-gray-900 mb-2 cursor-pointer">
                Nikesh<span className="text-indigo-600">T</span>
              </Link>
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
              <a href="mailto:nikeshtamangghising@gmail.com" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 hover:scale-110 cursor-pointer group">
                <i className="ri-mail-line text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500">&copy; 2024 Nikesh Tamang. Built with purpose and precision.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 