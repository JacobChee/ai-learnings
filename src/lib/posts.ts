import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  category: string
  readTime?: string
}

export interface Post extends PostMeta {
  content: string
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDirectory)) return []

  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.mdx'))

  const posts = files.map(filename => {
    const slug = filename.replace('.mdx', '')
    const fullPath = path.join(postsDirectory, filename)
    const { data } = matter(fs.readFileSync(fullPath, 'utf8'))

    return {
      slug,
      title: data.title ?? '',
      date: data.date ?? '',
      description: data.description ?? '',
      category: data.category ?? 'General',
      readTime: data.readTime,
    }
  })

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    description: data.description ?? '',
    category: data.category ?? 'General',
    readTime: data.readTime,
    content,
  }
}
