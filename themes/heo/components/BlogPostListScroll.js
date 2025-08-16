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
    <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {posts.map((post, index) => (
          <article
            key={post.id}
            className="bg-white rounded-xl overflow-hidden transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 p-0"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Link href={`/${post.slug}`}>
              <div className="flex flex-col h-full">
                {showCover && post.pageCoverThumbnail && (
                  <div className="relative overflow-hidden">
                    <LazyImage
                      src={post.pageCoverThumbnail}
                      alt={post.title}
                      className="w-full aspect-video object-cover"
                    />
                  </div>
                )}

                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 flex-1">{post.title}</h2>

                  {showSummary && post.summary && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.summary}</p>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                    <div className="flex items-center space-x-2">
                      {post.category && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded">{post.category}</span>
                      )}
                      <time dateTime={post.publishDay}>{post.publishDay}</time>
                    </div>

                    <div className="flex items-center space-x-2">
                      {post.readTime && <span>{post.readTime} min</span>}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}

export default BlogPostListScroll
