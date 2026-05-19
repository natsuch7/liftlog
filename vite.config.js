import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'
import { VitePWA } from 'vite-plugin-pwa'

const blogRoutes = [
  '/blog',
  '/blog/bench-press-plateau-periodization',
  '/blog/bench-press-plateau-causes',
  '/blog/squat-depth-hypertrophy',
  '/blog/squat-depth-misconceptions',
  '/blog/deload-signs-and-methods',
  '/blog/deload-vs-rest-difference',
  '/blog/block-periodization-beginner-guide',
  '/blog/squat-plateau-accessory-exercises',
  '/blog/overtraining-recovery-method',
  '/blog/periodization-training-guide',
  '/blog/bench-squat-deadlift-training-frequency',
]

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.png'],
      manifest: {
        name: 'LIFTLOG - BIG3トレーニングプランナー',
        short_name: 'LIFTLOG',
        description: 'BIG3に特化した9週間ブロックピリオダイゼーション自動生成アプリ',
        theme_color: '#e63946',
        background_color: '#0a0a0a',
        display: 'standalone',
        start_url: '/',
        orientation: 'portrait',
        lang: 'ja',
        categories: ['health', 'fitness', 'sports'],
        icons: [
          { src: '/icons/icon-72x72.png',   sizes: '72x72',   type: 'image/png', purpose: 'any maskable' },
          { src: '/icons/icon-96x96.png',   sizes: '96x96',   type: 'image/png', purpose: 'any maskable' },
          { src: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png', purpose: 'any maskable' },
          { src: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png', purpose: 'any maskable' },
          { src: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png', purpose: 'any maskable' },
          { src: '/icons/icon-180x180.png', sizes: '180x180', type: 'image/png', purpose: 'any maskable' },
          { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/icons/icon-384x384.png', sizes: '384x384', type: 'image/png', purpose: 'any maskable' },
          { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,ico,png,svg,woff,woff2}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/blog/],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
      },
    }),
    sitemap({
      hostname: 'https://liftlog-theta.vercel.app',
      dynamicRoutes: blogRoutes,
    }),
  ],
})
