import { connectDB } from '../lib/db';
import Journal from '../models/Journal';
import Announcement from '../lib/models/Announcement';

/**
 * Automated Sitemap Generation System
 * This dynamic sitemap updates automatically when new articles or announcements are published.
 * It also includes all core scholarly and policy pages.
 */

const BASE_URL = 'https://www.wisdomj.in';

export default async function sitemap() {
  try {
    await connectDB();

    // 1. Dynamic Articles (from [slug] route)
    const articles = await Journal.find({}, 'slug published_date').lean();
    const articleEntries = articles.map((article) => ({
      url: `${BASE_URL}/${article.slug}`,
      lastModified: article.published_date || new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    // 2. Dynamic Announcements (from announcement/[id] route)
    const announcements = await Announcement.find({}, '_id updatedAt announcement_date').lean();
    const announcementEntries = announcements.map((ann) => ({
      url: `${BASE_URL}/announcement/${ann._id.toString()}`,
      lastModified: ann.updatedAt || ann.announcement_date || new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));

    // 3. Static Scholarly and Policy Pages
    const staticPages = [
      '',
      '/about',
      '/archives',
      '/call-for-papers',
      '/contact',
      '/cope-ethics',
      '/copyright-claims',
      '/current-issue',
      '/disclaimer',
      '/editorial-board',
      '/open-access-policy',
      '/payment-terms',
      '/peer-review-policy',
      '/privacy-policy',
      '/refund-policy',
      '/search',
    ].map((route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'monthly',
      priority: route === '' ? 1.0 : 0.7,
    }));

    return [...staticPages, ...articleEntries, ...announcementEntries];
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    // Fallback to minimal static sitemap if DB fails
    return [
      {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      }
    ];
  }
}
