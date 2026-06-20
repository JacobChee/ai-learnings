import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPost, getAllPosts } from '@/lib/posts'
import { Slide, Hook } from '@/components/mdx'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: `${post.title} — Jacob Chee`, description: post.description }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <div className="bg-offwhite min-h-screen">
      {/* Header */}
      <div
        className="py-10 px-4 sm:py-14 sm:px-6"
        style={{ background: 'linear-gradient(135deg, #111111 0%, #1a1a1a 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors mb-6"
          >
            ← All learnings
          </Link>
          <span className="inline-block text-[10px] font-medium uppercase tracking-wider text-gold border border-gold/30 px-2.5 py-1 rounded-full mb-4">
            {post.category}
          </span>
          <h1 className="font-serif text-xl sm:text-2xl text-white leading-tight mb-3">
            {post.title}
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-2xl">{post.description}</p>
          <div className="flex items-center gap-4 mt-5 text-xs text-white/40">
            <time>
              {new Date(post.date).toLocaleDateString('en-SG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.readTime && <span>· {post.readTime}</span>}
          </div>
          {(post.applicableScore !== undefined || post.learningCurve) && (
            <div className="flex flex-wrap items-start gap-6 mt-4 pt-4 border-t border-white/10">
              {post.applicableScore !== undefined && (
                <div className="flex flex-col gap-1.5">
                  <p className="text-[10px] uppercase tracking-widest text-white/30">Physio and Sole Clinic / Anjouhealth</p>
                  <div className="flex items-center gap-1 flex-wrap">
                    {Array.from({ length: 10 }, (_, i) => (
                      <span
                        key={i}
                        className={`block w-2.5 h-2.5 rounded-full ${i < post.applicableScore! ? 'bg-gold' : 'bg-white/15'}`}
                      />
                    ))}
                    <span className="ml-1.5 text-xs font-semibold text-white">{post.applicableScore}/10 applicability</span>
                  </div>
                </div>
              )}
              {post.learningCurve && (
                <div className="flex flex-col gap-1.5">
                  <p className="text-[10px] uppercase tracking-widest text-white/30">Learning curve</p>
                  <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full ${
                    post.learningCurve === 'Easy' ? 'bg-emerald-500/20 text-emerald-300' :
                    post.learningCurve === 'Moderate' ? 'bg-amber-500/20 text-amber-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {post.learningCurve === 'Easy' ? '▁▃▅' : post.learningCurve === 'Moderate' ? '▁▃█' : '▁██'} {post.learningCurve}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 sm:py-12">

        {/* Links strip */}
        {(post.skillLink || post.sourceLink) && (
          <div className="bg-white rounded-[14px] border border-border-card px-4 py-3 mb-5 flex flex-wrap gap-2">
            {post.sourceLink && (
              <a
                href={post.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-body-gray hover:text-navy border border-border-card hover:border-gold/40 px-3 py-1.5 rounded-full transition-colors"
              >
                <span>📄</span> Source article
              </a>
            )}
            {post.skillLink && (
              <a
                href={post.skillLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-white bg-gold hover:bg-gold-light px-3 py-1.5 rounded-full transition-colors"
              >
                <span>⚡</span> Download skill / template
              </a>
            )}
          </div>
        )}

        {/* End result images — shown before the article */}
        {post.resultImages && post.resultImages.length > 0 && (
          <div className="mb-5">
            <h2 className="font-serif text-base text-navy mb-3">End result</h2>
            <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory">
              {post.resultImages.map((src, i) => (
                <a
                  key={i}
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 snap-start rounded-[12px] overflow-hidden border border-border-card hover:shadow-lg transition-shadow"
                  style={{ width: 220 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Result ${i + 1}`} className="w-full h-auto object-cover" />
                </a>
              ))}
            </div>
          </div>
        )}

        <article className="bg-white rounded-[14px] border border-border-card p-5 sm:p-8">
          <div className="prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-navy prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-navy-dark prose-code:text-navy prose-code:bg-offwhite prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-blockquote:border-l-gold prose-blockquote:text-body-gray">
            <MDXRemote source={post.content} components={{ Slide, Hook }} />
          </div>
        </article>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-gold hover:text-gold-light transition-colors"
          >
            ← Back to all learnings
          </Link>
        </div>
      </div>
    </div>
  )
}
