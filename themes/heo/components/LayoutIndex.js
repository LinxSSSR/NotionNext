"use client"

import { useGlobal } from "@/lib/global"
import BLOG from "@/blog.config"
import CONFIG from "../config"
import LayoutBase from "./LayoutBase"
import BlogPostListScroll from "./BlogPostListScroll"
import Hero from "./Hero"
import { useState } from "react"

/**
 * 首页布局
 * @param {*} props
 * @returns
 */
const LayoutIndex = (props) => {
  const { posts, categories, tags, siteInfo } = props
  const { locale } = useGlobal()
  const [filteredPosts, setFilteredPosts] = useState(posts)

  // 过滤置顶文章
  const topPosts = posts?.filter((post) => post?.isTop) || []
  const normalPosts = posts?.filter((post) => !post?.isTop) || []

  return (
    <LayoutBase {...props}>
      <div className="heo-modern">
        {/* 英雄区 */}
        <Hero posts={topPosts} categories={categories} tags={tags} siteInfo={siteInfo} />

        {/* 文章列表区 */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 主内容区 */}
            <div className="lg:col-span-3">
              <BlogPostListScroll posts={normalPosts} tags={tags} currentSearch="" />
            </div>

            {/* 侧边栏 */}
            <div className="lg:col-span-1">
              <Sidebar categories={categories} tags={tags} posts={posts} />
            </div>
          </div>
        </div>
      </div>
    </LayoutBase>
  )
}

/**
 * 侧边栏组件
 */
const Sidebar = ({ categories, tags, posts }) => {
  const { locale } = useGlobal()
  const recentPosts = posts?.slice(0, CONFIG.SIDEBAR.RECENT_POSTS_COUNT) || []

  return (
    <div className="space-y-6">
      {/* 个人资料卡 */}
      {CONFIG.SIDEBAR.SHOW_PROFILE_CARD && (
        <div className="heo-sidebar-card text-center">
          <img src={BLOG.AVATAR || "/avatar.jpg"} alt="Avatar" className="heo-profile-avatar mx-auto" />
          <h3 className="heo-profile-name">{BLOG.AUTHOR}</h3>
          <p className="heo-profile-bio">{BLOG.BIO || "分享技术，记录生活"}</p>

          {/* 社交链接 */}
          {CONFIG.FOOTER.SHOW_SOCIAL_LINKS && (
            <div className="heo-social-links justify-center">
              {CONFIG.FOOTER.SOCIAL_LINKS.map((link, index) => (
                <a key={index} href={link.url} className="heo-social-link" target="_blank" rel="noopener noreferrer">
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 分类卡片 */}
      {CONFIG.SIDEBAR.SHOW_CATEGORY_CARD && categories && (
        <div className="heo-sidebar-card">
          <h3 className="text-lg font-semibold mb-4">文章分类</h3>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <a
                key={index}
                href={`/category/${category.name}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <span>{category.name}</span>
                <span className="text-sm text-gray-500">{category.count}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 标签云 */}
      {CONFIG.SIDEBAR.SHOW_TAG_CLOUD && tags && (
        <div className="heo-sidebar-card">
          <h3 className="text-lg font-semibold mb-4">标签云</h3>
          <div className="heo-tag-cloud">
            {tags.slice(0, 20).map((tag, index) => (
              <a key={index} href={`/tag/${tag.name}`} className="heo-tag">
                {tag.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 最新文章 */}
      {CONFIG.SIDEBAR.SHOW_RECENT_POSTS && recentPosts.length > 0 && (
        <div className="heo-sidebar-card">
          <h3 className="text-lg font-semibold mb-4">最新文章</h3>
          <div className="space-y-3">
            {recentPosts.map((post, index) => (
              <a
                key={index}
                href={`/${post.slug}`}
                className="block p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <h4 className="text-sm font-medium line-clamp-2 mb-1">{post.title}</h4>
                <p className="text-xs text-gray-500">{post.publishDay}</p>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LayoutIndex
