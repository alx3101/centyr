import Link from 'next/link'

export default function CTA() {
  return (
    <section className="py-20 gradient-animated relative overflow-hidden">
      {/* SVG Pattern Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in-up">
          Ready to Transform Your Workflow?
        </h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Join thousands of professionals using Centyr to streamline their image processing
        </p>
        <Link
          href="/upload"
          className="inline-block bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:scale-105 hover:shadow-2xl transition-all duration-300 text-lg animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          Start Free Trial
        </Link>
        <p className="text-purple-100 mt-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>No credit card required</p>
      </div>
    </section>
  )
}
