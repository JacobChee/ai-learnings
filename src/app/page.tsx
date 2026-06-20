import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <>
      {/* Hero */}
      <section
        className="bg-navy-dark py-24 px-6"
        style={{ background: 'linear-gradient(135deg, #152a45 0%, #1e3a5f 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-gold border border-gold/30 px-3 py-1 rounded-full mb-6">
            AI Learnings
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight max-w-2xl">
            What we&apos;re building<br />
            <span className="text-gold">with AI.</span>
          </h1>
          <p className="mt-6 text-lg text-white/60 max-w-xl font-sans leading-relaxed">
            Real experiments, agents, and lessons from atsell.io — an ecommerce enabler
            operating across Shopee, Lazada, and TikTok Shop in Southeast Asia.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-offwhite py-16 px-6 flex-1">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-body-gray text-center py-16">No posts yet — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group bg-white rounded-[18px] border border-border-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden"
                >
                  {/* Gold accent bar */}
                  <div className="h-1 bg-gradient-to-r from-gold to-gold-light" />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium uppercase tracking-wider text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      {post.readTime && (
                        <span className="text-xs text-body-gray">{post.readTime}</span>
                      )}
                    </div>
                    <h2 className="font-serif text-xl text-navy leading-snug mb-3 group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-body-gray leading-relaxed flex-1">
                      {post.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <time className="text-xs text-body-gray/70">
                        {new Date(post.date).toLocaleDateString('en-SG', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="text-xs font-medium text-gold group-hover:translate-x-0.5 transition-transform">
                        Read →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
