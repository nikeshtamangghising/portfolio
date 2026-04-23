export const blogPosts = [
  {
    slug: 'scalable-django-api',
    title: 'How to Build a Scalable Django API',
    date: 'April 2024',
    image: '/images/projects/ecommerce-platform.jpg',
    excerpt: 'A step-by-step guide to designing and deploying robust Django APIs for production, with tips on authentication, testing, and scaling.',
    content: `# How to Build a Scalable Django API

Building a scalable API with Django requires careful planning of your architecture and choice of tools. In this guide, we'll explore the best practices for creating production-ready APIs that can handle significant traffic.

## 1. Project Structure
Organize your project by functionality rather than by file type. Use apps to encapsulate specific domains of your business logic.

## 2. Robust Authentication
Security is paramount. We recommend using **JWT (JSON Web Tokens)** for stateless authentication, especially when your API is consumed by modern frontend frameworks like React.

## 3. Database Optimization
Use indexing effectively and avoid N+1 queries by using \`select_related\` and \`prefetch_related\` in your Django QuerySets.

## 4. Scaling with Docker
Containerization ensures consistency across environments. A multi-stage Docker build can help keep your production images small and secure.`
  },
  {
    slug: 'prompt-engineering-ai',
    title: 'Prompt Engineering for Better AI Results',
    date: 'March 2024',
    image: '/images/projects/ai-chat-assistant.jpg',
    excerpt: 'Learn how to craft effective prompts for AI models, with real-world examples and best practices for developers and product teams.',
    content: `# Prompt Engineering for Better AI Results

Prompt engineering is the art of communicating with AI models to get the most accurate and useful outputs. As Large Language Models (LLMs) become more integrated into software, this skill is becoming essential for developers.

## The Chain of Thought
Encouraging the model to "think step by step" can significantly improve results for complex reasoning tasks.

## Few-Shot Prompting
Providing a few examples of input-output pairs helps the model understand the specific format and style you expect.

## Negative Constraints
Clearly state what the model should *not* do. This is often as important as telling it what to do.`
  },
  {
    slug: 'modern-frontend-nextjs',
    title: 'Modern Frontend Workflows with Next.js',
    date: 'February 2024',
    image: '/images/projects/task-management.jpg',
    excerpt: 'Explore the latest tools and techniques for building fast, maintainable web apps with Next.js, Tailwind CSS, and TypeScript.',
    content: `# Modern Frontend Workflows with Next.js

Next.js has revolutionized how we build React applications. With its new App Router and built-in support for Server Components, the developer experience has reached new heights.

## Why Next.js?
- **Server-Side Rendering (SSR):** Improved SEO and initial load times.
- **Static Site Generation (SSG):** Lightning-fast performance for content-heavy sites.
- **Turbopack:** A high-performance build tool that speeds up development.

## The Power of Tailwind CSS
Utility-first CSS allows for rapid UI development directly in your markup, ensuring your design system stays consistent and your bundle size remains small.`
  }
];
