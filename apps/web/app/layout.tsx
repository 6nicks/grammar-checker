import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://grammar.koalakoala.cn'),
  title: {
    default: 'Grammar Checker - AI英语语法检查工具 | 免费在线语法纠错',
    template: '%s | Grammar Checker',
  },
  description: '免费AI驱动的英语语法检查工具。输入英语句子，智能检测语法错误，提供中英文双语解释和修正建议。支持时态、语态、单复数等多种语法问题检查。',
  keywords: [
    '英语语法检查',
    '语法纠错',
    '英语写作',
    'AI语法工具',
    '在线语法检查',
    'grammar checker',
    'English grammar',
    'grammar corrector',
    'AI grammar',
    '语法检查器',
    '英语学习',
    '写作助手',
  ],
  authors: [{ name: 'Koala Koala' }],
  creator: 'Koala Koala',
  publisher: 'Koala Koala',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://grammar.koalakoala.cn',
    siteName: 'Grammar Checker',
    title: 'Grammar Checker - AI英语语法检查工具',
    description: '免费AI驱动的英语语法检查工具。智能检测语法错误，提供中英文双语解释和修正建议。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Grammar Checker - AI英语语法检查工具',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grammar Checker - AI英语语法检查工具',
    description: '免费AI驱动的英语语法检查工具。智能检测语法错误，提供中英文双语解释。',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://grammar.koalakoala.cn',
  },
  category: 'education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}