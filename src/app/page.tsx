import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <>
      {/* Hero */}
      <section className="bg-offwhite py-24 px-6 border-b border-border-card">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block text-xs font-medium uppercase tracking-widest text-gold border border-gold/40 bg-gold/10 px-3 py-1 rounded-full mb-6">
            Jacob&apos;s AI Learnings
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-navy leading-tight max-w-2xl">
            AI for Boomers
          </h1>
          <p className="mt-6 text-lg text-body-gray max-w-xl font-sans leading-relaxed">
            Honest notes on what actually works — shared so the team doesn&apos;t have to start from scratch.
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
                    {(post.applicableScore !== undefined || post.learningCurve) && (
                      <div className="mt-4 pt-4 border-t border-border-card flex items-center gap-3 flex-wrap">
                        {post.applicableScore !== undefined && (
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] uppercase tracking-wider text-body-gray/60">Physio & Sole / Anjou</span>
                            <span className="text-xs font-semibold text-navy">{post.applicableScore}/10 applicable</span>
                          </div>
                        )}
                        {post.learningCurve && (
                          <div className="flex flex-col gap-0.5 ml-auto text-right">
                            <span className="text-[10px] uppercase tracking-wider text-body-gray/60">Learning curve</span>
                            <span className={`text-xs font-semibold ${
                              post.learningCurve === 'Easy' ? 'text-emerald-500' :
                              post.learningCurve === 'Moderate' ? 'text-amber-500' :
                              'text-red-500'
                            }`}>{post.learningCurve}</span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="mt-4 flex items-center justify-between">
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
