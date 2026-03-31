import big3Basics from '../data/blog/big3-basics.js'
import blockPeriodization from '../data/blog/block-periodization.js'
import relativeStrength from '../data/blog/relative-strength.js'

const allPosts = [big3Basics, blockPeriodization, relativeStrength].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
)

export function getAllPosts() {
  return allPosts
}

export function getPostBySlug(slug) {
  return allPosts.find((p) => p.slug === slug) || null
}
