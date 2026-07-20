import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

/**
 * Frontmatter `category` accepts either a single string or a list.
 * It is always normalised to an array here so the UI can render one pill per
 * category without every call site re-checking the type.
 */
function toCategories(value: unknown): string[] {
  if (Array.isArray(value)) {
    const cleaned = value.map(v => String(v).trim()).filter(Boolean)
    return cleaned.length > 0 ? cleaned : ['General']
  }
  if (typeof value === 'string' && value.trim()) return [value.trim()]
  return ['General']
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  /** Always at least one entry. First entry is the primary category. */
  categories: string[]
  readTime?: string
  applicableScore?: number
  learningCurve?: 'Easy' | 'Moderate' | 'Steep'
  skillLink?: string
  sourceLink?: string | string[]
  resultImages?: string[]
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
      categories: toCategories(data.category),
      readTime: data.readTime,
      applicableScore: data.applicableScore,
      learningCurve: data.learningCurve,
      skillLink: data.skillLink,
      sourceLink: data.sourceLink,
      resultImages: data.resultImages,
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
    categories: toCategories(data.category),
    readTime: data.readTime,
    applicableScore: data.applicableScore,
    learningCurve: data.learningCurve,
    skillLink: data.skillLink,
    sourceLink: data.sourceLink,
    resultImages: data.resultImages,
    content,
  }
}
