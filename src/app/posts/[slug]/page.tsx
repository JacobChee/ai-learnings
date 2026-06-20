import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPost, getAllPosts } from '@/lib/posts'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: `${post.title} — atsell AI Learnings`, description: post.description }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <div className="bg-offwhite min-h-screen">
      {/* Header */}
      <div
        className="py-16 px-6"
        style={{ background: 'linear-gradient(135deg, #152a45 0%, #1e3a5f 100%)' }}
      >
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors mb-8"
          >
            ← All learnings
          </Link>
          <span className="inline-block text-xs font-medium uppercase tracking-wider text-gold border border-gold/30 px-3 py-1 rounded-full mb-5">
            {post.category}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl">{post.description}</p>
          <div className="flex items-center gap-4 mt-6 text-sm text-white/40">
            <time>
              {new Date(post.date).toLocaleDateString('en-SG', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.readTime && <span>· {post.readTime}</span>}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-14">
        <article className="bg-white rounded-[18px] border border-border-card p-8 sm:p-12">
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-navy prose-a:text-gold prose-a:no-underline hover:prose-a:underline prose-strong:text-navy-dark prose-code:text-navy prose-code:bg-offwhite prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-blockquote:border-l-gold prose-blockquote:text-body-gray">
            <MDXRemote source={post.content} />
          </div>
        </article>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light transition-colors"
          >
            ← Back to all learnings
          </Link>
        </div>
      </div>
    </div>
  )
}
