import { env } from '../util/constants/common';
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: env.SITE_URL,
    generateRobotsTxt: true, // (optional)
    sitemapSize: 5000,
    changefreq: 'daily',
    priority: 0.7,
  };