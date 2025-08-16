import LazyImage from "@/components/LazyImage"
import { siteConfig } from "@/lib/config"
import { useGlobal } from "@/lib/global"
import Link from "next/link"
import CONFIG from "../config"

/**
 * 博客列表滚动组件
 */
const BlogPostListScroll = ({ posts = [] }) => {
  const { locale } = useGlobal()
  const showCover = siteConfig("HEO_MODERN_POST_LIST_COVER", true, CONFIG)
  const showSummary = siteConfig("HEO_MODERN_POST_LIST_SUMMARY", true, CONFIG)

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{locale.COMMON.NO_POSTS}</p>
      </div>
    )
  }

  return (
    <div className="heo-modern-grid">
      {posts.map((post, index) => (
        <article
          key={post.id}
          className="heo-modern-post-card heo-modern-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Link href={`/${post.slug}`}>
            <div>
              {/* 文章封面 */}
              {showCover && post.pageCoverThumbnail && (
                <div className="relative overflow-hidden">
                  <LazyImage src={post.pageCoverThumbnail} alt={post.title} className="heo-modern-post-image" />
                </div>
              )}

              {/* 文章内容 */}
              <div className="heo-modern-post-content">
                {/* 文章标题 */}
                <h2 className="heo-modern-post-title">{post.title}</h2>

                {/* 文章摘要 */}
                {showSummary && post.summary && <p className="heo-modern-post-summary">{post.summary}</p>}

                {/* 文章元信息 */}
                <div className="heo-modern-post-meta">
                  <div className="flex items-center space-x-4">
                    {post.category && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{post.category}</span>
                    )}
                    <time dateTime={post.publishDay}>{post.publishDay}</time>
                  </div>

                  <div className="flex items-center space-x-2 text-xs">
                    {post.readTime && <span>{post.readTime} min read</span>}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  )
}

export default BlogPostListScroll
