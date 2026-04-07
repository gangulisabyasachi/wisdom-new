'use client';

import React, { useEffect, useState, useMemo } from 'react';
import './WorldMap.css';

/**
 * Miller Projection Mapping constants derived from worldUltra.svg viewBox:
 * Width: 967, Height: 503.49
 */
const MAP_WIDTH = 967;
const MAP_HEIGHT = 503.49;
const X_OFFSET = -3.5;
const Y_OFFSET = 1.76;

const WorldMap = () => {
  const [liveNodes, setLiveNodes] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Projects Lat/Lon to SVG viewBox coordinates using Miller Projection
   */
  const project = (lat, lon) => {
    const x = ((lon + 180) * (MAP_WIDTH / 360)) + X_OFFSET;
    const latRad = (lat * Math.PI) / 180;
    const maxLatRad = (85 * Math.PI) / 180;
    const maxY = 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * maxLatRad));
    const currentY = 1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * latRad));
    const y = ((maxY - currentY) / (2 * maxY)) * MAP_HEIGHT + Y_OFFSET;
    return { x, y };
  };

  // Fetch live traces from the API
  const fetchNodes = async () => {
    try {
      const res = await fetch('/api/presence');
      const data = await res.json();
      if (data.success) {
        const projected = data.nodes.map(n => ({
          ...n,
          ...project(n.latitude, n.longitude)
        }));
        setLiveNodes(projected);
      }
    } catch (err) {
      console.error('Failed to fetch research nodes:', err);
    }
  };

  // Ping current location to the API
  const pingPresence = async (lat, lon) => {
    try {
      await fetch('/api/presence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude: lat, longitude: lon })
      });
      fetchNodes(); // Refresh immediately after ping
    } catch (err) {
      console.warn('Presence ping failed');
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchNodes();

    // Geolocation and Ping
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lon: longitude });
          pingPresence(latitude, longitude);
        },
        null,
        { enableHighAccuracy: false, timeout: 5000 }
      );
    }

    // Refresh nodes every 60 seconds
    const interval = setInterval(fetchNodes, 60000);
    const loadTimer = setTimeout(() => setIsLoaded(true), 500);

    return () => {
      clearInterval(interval);
      clearTimeout(loadTimer);
    };
  }, []);

  const userCoords = useMemo(() => userLocation ? project(userLocation.lat, userLocation.lon) : null, [userLocation]);

  return (
    <div className={`world-presence-container ${isLoaded ? 'active' : ''}`}>
      <div className="map-wrapper">
        <svg 
          viewBox={`${X_OFFSET} ${Y_OFFSET} ${MAP_WIDTH} ${MAP_HEIGHT}`} 
          className="presence-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <image 
            href="/images/world-map.svg" 
            width={MAP_WIDTH} 
            height={MAP_HEIGHT} 
            x={X_OFFSET} 
            y={Y_OFFSET} 
            className="map-base"
          />

          {/* Dynamic Presence Nodes */}
          <g className="hubs-group">
            {liveNodes.map((node, i) => (
              <g key={`node-${i}`} className="hub-beacon">
                <circle cx={node.x} cy={node.y} r="2.5" className="hub-dot" />
                <circle cx={node.x} cy={node.y} r="5" className="hub-glow" />
              </g>
            ))}
          </g>

          {/* Primary Local User Beacon */}
          {userCoords && (
            <g className="user-beacon">
              <circle cx={userCoords.x} cy={userCoords.y} r="4" className="user-dot" />
              <circle cx={userCoords.x} cy={userCoords.y} r="10" className="user-pulse" />
              <circle cx={userCoords.x} cy={userCoords.y} r="15" className="user-pulse-outer" />
            </g>
          )}
        </svg>
      </div>

      <div className="map-overlay">
        <div className="presence-label">LIVE RESEARCH TRACE</div>
        <div className="presence-stats">
          <span className="pulse-indicator"></span>
          REAL-TIME NODES: {liveNodes.length}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
