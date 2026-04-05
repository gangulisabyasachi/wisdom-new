'use server';

import { connectDB } from '../../lib/db';
import Journal from '../../lib/models/Journal';

// Helper to escape regex special characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function searchArticles(query, filters = {}) {
  try {
    await connectDB();

    const { vol, issue, year } = filters;
    const hasQuery = query && query.trim();
    const hasFilters = vol || issue || year;

    // Security Guard: Prevent database dump if everything is empty
    if (!hasQuery && !hasFilters) {
      console.log("[Search] Empty search blocked for security.");
      return [];
    }

    let dbFilter = {};

    // 1. Keyword Logic
    if (query && query.trim()) {
      const keywords = query.trim().split(/\s+/).filter(k => k.length > 0);
      
      if (keywords.length > 0) {
        // Prepare keyword filters
        const keywordFilters = keywords.map(keyword => {
          const escaped = escapeRegExp(keyword);
          return {
            $or: [
              { topic: { $regex: escaped, $options: 'i' } },
              { authors: { $regex: escaped, $options: 'i' } },
              { abstract: { $regex: escaped, $options: 'i' } },
              { keywords: { $regex: escaped, $options: 'i' } },
              { doi: { $regex: escaped, $options: 'i' } }
            ]
          };
        });

        // Use AND logic for keywords (more precise)
        dbFilter.$and = keywordFilters;
      }
    }

    // 2. Metadata Filters
    if (vol && !isNaN(parseInt(vol))) dbFilter.volume = parseInt(vol);
    if (issue && !isNaN(parseInt(issue))) dbFilter.issue = parseInt(issue);
    
    if (year && !isNaN(parseInt(year))) {
      const startYear = parseInt(year);
      const startDate = new Date(Date.UTC(startYear, 0, 1));
      const endDate = new Date(Date.UTC(startYear, 11, 31, 23, 59, 59));
      dbFilter.published_date = { $gte: startDate, $lte: endDate };
    }

    // 3. Robust Search Fallback
    console.log(`[Search] Attempting AND search:`, JSON.stringify(dbFilter));
    let results = await Journal.find(dbFilter).sort({ published_date: -1 }).limit(100).lean();

    // If AND search yields nothing but we have keywords, try OR search for better coverage
    if (results.length === 0 && dbFilter.$and) {
      const orFilter = { ...dbFilter };
      orFilter.$or = dbFilter.$and; 
      delete orFilter.$and;
      console.log(`[Search] No AND results. Falling back to OR search:`, JSON.stringify(orFilter));
      results = await Journal.find(orFilter).sort({ published_date: -1 }).limit(50).lean();
    }

    return results.map(a => ({
      _id: a._id.toString(),
      topic: a.topic || '',
      slug: a.slug || '',
      authors: a.authors || '',
      volume: a.volume || '',
      issue: a.issue || '',
      doi: a.doi || '',
      abstract: a.abstract || '',
      keywords: a.keywords || '',
      date: a.published_date ? new Date(a.published_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'
    }));
  } catch (error) {
    console.error("Search Action Error:", error);
    return [];
  }
}

export async function getDistinctFilters() {
  try {
    await connectDB();
    const volumes = await Journal.distinct('volume');
    const issues = await Journal.distinct('issue');
    const dates = await Journal.distinct('published_date');
    const years = [...new Set(dates.map(d => d ? new Date(d).getUTCFullYear() : null))]
      .filter(Boolean)
      .sort((a,b) => b - a);

    return { 
      volumes: volumes.filter(v => v != null).sort((a,b) => b-a), 
      issues: issues.filter(i => i != null).sort((a,b) => b-a), 
      years 
    };
  } catch (error) {
    console.error("Filter Fetch Error:", error);
    return { volumes: [], issues: [], years: [] };
  }
}
