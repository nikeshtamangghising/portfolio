import Link from 'next/link';
import { blogPosts } from '../../data/blogPosts';

export default function Blog() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <nav className="fixed top-0 w-full bg-white/85 backdrop-blur-lg border-b border-gray-200 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-gray-900 cursor-pointer">
            <Link href="/">Nikesh<span className="text-indigo-600">T</span></Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Home</Link>
            <Link href="/blog" className="text-indigo-600 font-semibold cursor-pointer">Blog</Link>
            <Link href="/projects" className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Projects</Link>
            <Link href="#contact" className="text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer">Contact</Link>
          </div>
        </div>
      </nav>
      <main className="pt-28 pb-20 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            <i className="ri-article-line mr-2"></i>
            Blog
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Insights & Articles</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Sharing knowledge, tutorials, and thoughts on web development, AI, and more.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, idx) => (
            <div key={post.slug} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col animate-fade-in-up" style={{ animationDelay: `${0.1 + idx * 0.1}s`, animationFillMode: 'both' }}>
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <div className="text-sm text-gray-500 mb-4">{post.date}</div>
              <p className="text-gray-700 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-indigo-600 font-semibold hover:underline mt-auto">Read More</Link>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <div className="text-2xl font-bold text-gray-900 mb-2 cursor-pointer">
              <Link href="/">Nikesh<span className="text-indigo-600">T</span></Link>
            </div>
            <p className="text-gray-600">Engineering solutions that scale with your ambitions</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://github.com/nikeshtamangghising" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 hover:scale-110 cursor-pointer group" aria-label="GitHub profile of Nikesh Tamang">
              <i className="ri-github-fill text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 hover:scale-110 cursor-pointer group" aria-label="LinkedIn profile of Nikesh Tamang">
              <i className="ri-linkedin-fill text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
            </a>
            <a href="mailto:nikeshtamangghising@gmail.com" className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-100 transition-all duration-300 hover:scale-110 cursor-pointer group" aria-label="Email Nikesh Tamang">
              <i className="ri-mail-line text-gray-600 group-hover:text-indigo-600 transition-colors"></i>
            </a>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-500">&copy; 2024 Nikesh Tamang. Built with purpose and precision.</p>
        </div>
      </footer>
    </div>
  );
} 