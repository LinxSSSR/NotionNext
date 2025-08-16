"use client"

import { useGlobal } from "@/lib/global"
import Head from "next/head"
import BLOG from "@/blog.config"
import CONFIG from "../config"
import STYLES from "../style"
import Header from "./Header"
import Footer from "./Footer"
import { useEffect } from "react"

/**
 * 基础布局组件
 * @param {*} props
 * @returns
 */
const LayoutBase = (props) => {
  const { children, meta, siteInfo } = props
  const { locale, isDarkMode } = useGlobal()

  // 注入自定义样式
  useEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.innerHTML = STYLES
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  return (
    <>
      <Head>
        <title>{meta?.title || BLOG.TITLE}</title>
        <meta name="description" content={meta?.description || BLOG.DESCRIPTION} />
        <meta name="keywords" content={meta?.keywords || BLOG.KEYWORDS} />
        <meta name="author" content={BLOG.AUTHOR} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph */}
        <meta property="og:title" content={meta?.title || BLOG.TITLE} />
        <meta property="og:description" content={meta?.description || BLOG.DESCRIPTION} />
        <meta property="og:image" content={meta?.image || BLOG.AVATAR} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta?.title || BLOG.TITLE} />
        <meta name="twitter:description" content={meta?.description || BLOG.DESCRIPTION} />
        <meta name="twitter:image" content={meta?.image || BLOG.AVATAR} />

        {/* Favicon */}
        <link rel="icon" href={BLOG.FAVICON} />

        {/* Font Awesome */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
        <div className="heo-bg-gradient">
          {/* 顶部通知栏 */}
          {CONFIG.NOTICE_BAR.ENABLE && (
            <div className="bg-blue-600 text-white text-center py-2 px-4">
              <a href={CONFIG.NOTICE_BAR.URL} className="text-sm hover:underline">
                {CONFIG.NOTICE_BAR.TEXT}
              </a>
            </div>
          )}

          {/* 头部导航 */}
          <Header {...props} />

          {/* 主要内容 */}
          <main className="relative z-10">{children}</main>

          {/* 页脚 */}
          <Footer {...props} />
        </div>
      </div>
    </>
  )
}

export default LayoutBase
