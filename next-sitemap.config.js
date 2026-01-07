/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://fitmindlab.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/api/*', '/login', '/mypage'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
}
