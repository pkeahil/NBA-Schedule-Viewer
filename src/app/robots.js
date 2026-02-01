export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://nbaschd.vercel.app/sitemap.xml',
  }
}
