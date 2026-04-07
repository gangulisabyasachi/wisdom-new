import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Presence from '@/models/Presence';

export async function GET() {
  try {
    await connectDB();
    
    // Fetch nodes from the last 24 hours (TTL handles actual deletion, but we filter for visual activity)
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const activeNodes = await Presence.find({
      lastSeen: { $gte: fifteenMinutesAgo }
    }).select('latitude longitude -_id');

    return NextResponse.json({ success: true, nodes: activeNodes });
  } catch (error) {
    console.error('Presence GET error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { latitude, longitude } = await req.json();

    if (!latitude || !longitude) {
      return NextResponse.json({ success: false, error: 'Missing coordinates' }, { status: 400 });
    }

    // Upsert logic: Find a node within 0.1 deg (~11km) radius and update it, or create new
    // This prevents map overcrowding and keeps the DB small
    const roundLat = Math.round(latitude * 10) / 10;
    const roundLon = Math.round(longitude * 10) / 10;

    await Presence.findOneAndUpdate(
      { 
        latitude: { $gt: roundLat - 0.05, $lt: roundLat + 0.05 },
        longitude: { $gt: roundLon - 0.05, $lt: roundLon + 0.05 }
      },
      { latitude, longitude, lastSeen: Date.now() },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Presence POST error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
