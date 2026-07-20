import { getAllPosts } from '@/lib/posts'

// Static JSON feed of posts, regenerated on each deploy.
// CORS-open so other sites (e.g. the PSC AI Transformation hub) can pull it in.
export const dynamic = 'force-static'

export function GET() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    description: p.description,
    // `category` is kept as the primary category string so existing feed
    // consumers keep working; `categories` carries the full list.
    category: p.categories[0],
    categories: p.categories,
    readTime: p.readTime ?? null,
    url: `/posts/${p.slug}`,
  }))

  return new Response(JSON.stringify({ posts }, null, 2), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': '*',
      'cache-control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
