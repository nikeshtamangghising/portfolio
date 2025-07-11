import { blogPosts } from '../../data/blogPosts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return notFound();
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
      <main className="pt-28 pb-20 max-w-2xl mx-auto px-6">
        <Link href="/blog" className="text-indigo-600 hover:underline mb-8 inline-block">← Back to Blog</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{post.title}</h1>
        <div className="text-sm text-gray-500 mb-8">{post.date}</div>
        <article className="prose prose-indigo max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
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