import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const posts = getAllPosts()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: 320 }}>
        <Image
          src="https://images.unsplash.com/photo-1758691030817-a6271a533c42?w=1400&q=80"
          alt="Senior man smiling while using a tablet"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:px-6 sm:py-20">
          <span className="inline-block text-[10px] font-medium uppercase tracking-widest text-gold border border-gold/50 bg-black/30 px-3 py-1 rounded-full mb-4">
            Jacob&apos;s AI Learnings
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white leading-tight max-w-2xl">
            AI for Boomers
          </h1>
          <p className="mt-4 text-sm text-white/70 max-w-xl font-sans leading-relaxed">
            Honest notes on what actually works — shared so the team doesn&apos;t have to start from scratch.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="bg-offwhite py-10 px-4 sm:py-14 sm:px-6 flex-1">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-body-gray text-center py-14 text-sm">No posts yet — check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {posts.map(post => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="group bg-white rounded-[14px] border border-border-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden"
                >
                  {/* Gold accent bar */}
                  <div className="h-1 bg-gradient-to-r from-gold to-gold-light" />
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      {post.readTime && (
                        <span className="text-[10px] text-body-gray">{post.readTime}</span>
                      )}
                    </div>
                    <h2 className="font-serif text-base text-navy leading-snug mb-2 group-hover:text-gold transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-xs text-body-gray leading-relaxed flex-1">
                      {post.description}
                    </p>
                    {(post.applicableScore !== undefined || post.learningCurve) && (
                      <div className="mt-3 pt-3 border-t border-border-card flex flex-wrap items-center justify-between gap-3">
                        {post.applicableScore !== undefined && (
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] uppercase tracking-wider text-body-gray/60">Physio and Sole Clinic / Anjouhealth</span>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 10 }, (_, i) => (
                                <span
                                  key={i}
                                  className={`block w-2 h-2 rounded-full ${i < post.applicableScore! ? 'bg-gold' : 'bg-border-card'}`}
                                />
                              ))}
                              <span className="ml-1 text-[10px] font-semibold text-navy">{post.applicableScore}/10</span>
                            </div>
                          </div>
                        )}
                        {post.learningCurve && (
                          <div className="flex flex-col items-end gap-1">
                            <span className="text-[9px] uppercase tracking-wider text-body-gray/60">Learning curve</span>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              post.learningCurve === 'Easy' ? 'bg-emerald-50 text-emerald-600' :
                              post.learningCurve === 'Moderate' ? 'bg-amber-50 text-amber-600' :
                              'bg-red-50 text-red-600'
                            }`}>
                              {post.learningCurve === 'Easy' ? '▁▃▅' : post.learningCurve === 'Moderate' ? '▁▃█' : '▁██'} {post.learningCurve}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="mt-3 flex items-center justify-between">
                      <time className="text-[10px] text-body-gray/70">
                        {new Date(post.date).toLocaleDateString('en-SG', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="text-[10px] font-medium text-gold group-hover:translate-x-0.5 transition-transform">
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
