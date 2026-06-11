// map.jsx — Mapbox map component with style toggle (Mapbox standard vs Google-like streets)
// Props: center, zoom, pitch, bearing, markers, route, fitBounds, mapStyle, interactive

const MAPBOX_TOKEN = (window.APP_CONFIG && window.APP_CONFIG.mapboxToken) || '';

// "mapbox" mode shows off the gorgeous 3D Standard style.
// "google" mode uses streets-v12 — simpler, more familiar to people who haven't used Mapbox.
const MAP_STYLES = {
  mapbox: 'mapbox://styles/mapbox/standard',
  google: 'mapbox://styles/mapbox/streets-v12',
};

// Bangkok pickup demo locations — Sukhumvit/Phrom Phong / Thonglor area.
const BKK = {
  user: [100.5703, 13.7307],          // user's home (around Phrom Phong)
  driverStart: [100.5790, 13.7395],    // driver currently here
  // multi-stop route for driver POV
  stops: [
    { coord: [100.5703, 13.7307], label: 'A', name: 'Pran T.', addr: 'Soi Sukhumvit 39', waste: 'recycle', kg: 4.5 },
    { coord: [100.5746, 13.7355], label: 'B', name: 'Nadol L.', addr: 'Soi Sukhumvit 33', waste: 'general', kg: 8.0 },
    { coord: [100.5810, 13.7338], label: 'C', name: 'Khun Mali', addr: 'Soi Sukhumvit 49', waste: 'recycle', kg: 12.2 },
    { coord: [100.5852, 13.7381], label: 'D', name: 'Khun Som', addr: 'Soi Thonglor 10', waste: 'organic', kg: 6.0 },
  ],
  // Smooth path the driver follows toward the user (manually-shaped polyline so
  // the demo movement looks like real navigation, not a straight line)
  driverPath: [
    [100.5790, 13.7395],
    [100.5780, 13.7375],
    [100.5755, 13.7360],
    [100.5740, 13.7340],
    [100.5725, 13.7325],
    [100.5710, 13.7315],
    [100.5703, 13.7307],
  ],
  // Multi-stop route polyline (curved-ish)
  routeStops: [
    [100.5790, 13.7395],
    [100.5852, 13.7381],
    [100.5810, 13.7338],
    [100.5746, 13.7355],
    [100.5703, 13.7307],
  ],
};

// Mapbox script loading — only inject once per page
let __mapboxLoading = null;
function loadMapbox() {
  if (window.mapboxgl) return Promise.resolve();
  if (__mapboxLoading) return __mapboxLoading;
  __mapboxLoading = new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css';
    document.head.appendChild(link);
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js';
    script.onload = () => { window.mapboxgl.accessToken = MAPBOX_TOKEN; resolve(); };
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return __mapboxLoading;
}

// ── Markers ───────────────────────────────────────────────────────────────────
// Markers are HTML elements (Mapbox Marker(el)) so we can style them with CSS.
function makeUserMarker() {
  const el = document.createElement('div');
  el.className = 'sg-marker sg-marker-user';
  el.innerHTML = `
    <div class="sg-pulse"></div>
    <div class="sg-pulse-dot"></div>
  `;
  return el;
}

function makeDriverMarker() {
  const el = document.createElement('div');
  el.className = 'sg-marker sg-marker-driver';
  el.innerHTML = `
    <svg width="44" height="52" viewBox="0 0 44 52" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sg-driver-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000" flood-opacity="0.25"/>
        </filter>
      </defs>
      <g filter="url(#sg-driver-shadow)">
        <path d="M22 2 C32 2 40 10 40 20 C40 32 22 50 22 50 C22 50 4 32 4 20 C4 10 12 2 22 2 Z" fill="#0d3b2e"/>
        <circle cx="22" cy="20" r="13" fill="#1fb55e"/>
        <g transform="translate(11,11)">
          <circle cx="5" cy="14" r="3" fill="#fff"/>
          <circle cx="17" cy="14" r="3" fill="#fff"/>
          <path d="M5 14 L9 5 L15 5 L17 14" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/>
          <path d="M9 5 L7 5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/>
        </g>
      </g>
    </svg>
  `;
  return el;
}

function makeStopMarker(label, color) {
  const el = document.createElement('div');
  el.className = 'sg-marker sg-marker-stop';
  el.innerHTML = `
    <svg width="36" height="44" viewBox="0 0 36 44" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sg-stop-shadow-${label}" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="2" flood-color="#000" flood-opacity="0.22"/>
        </filter>
      </defs>
      <g filter="url(#sg-stop-shadow-${label})">
        <path d="M18 1 C26 1 33 8 33 16 C33 26 18 42 18 42 C18 42 3 26 3 16 C3 8 10 1 18 1 Z" fill="${color}"/>
        <circle cx="18" cy="16" r="10" fill="#fff"/>
        <text x="18" y="20" text-anchor="middle" font-family="Inter,system-ui" font-size="13" font-weight="700" fill="${color}">${label}</text>
      </g>
    </svg>
  `;
  return el;
}

function makeDestMarker() {
  const el = document.createElement('div');
  el.className = 'sg-marker sg-marker-dest';
  el.innerHTML = `
    <div class="sg-dest-ring">
      <div class="sg-dest-dot"></div>
    </div>
  `;
  return el;
}

// ── Map component ─────────────────────────────────────────────────────────────
function MapView({
  center = BKK.user,
  zoom = 14.5,
  pitch = 50,
  bearing = -20,
  mapStyle = 'mapbox',
  markers = [],
  route = null,        // { coords: [[lng,lat],...] }
  driverPath = null,   // animated driver — { progress: 0..1, coords: [[lng,lat],...] }
  fitBounds = null,    // optional [[lng,lat], [lng,lat]]
  interactive = false,
  showLabels = true,
  style = {},
}) {
  const containerRef = React.useRef(null);
  const mapRef = React.useRef(null);
  const markersRef = React.useRef([]);
  const [ready, setReady] = React.useState(false);

  // init
  React.useEffect(() => {
    let cancelled = false;
    loadMapbox().then(() => {
      if (cancelled || !containerRef.current) return;
      const map = new window.mapboxgl.Map({
        container: containerRef.current,
        style: MAP_STYLES[mapStyle] || MAP_STYLES.mapbox,
        center, zoom, pitch, bearing,
        interactive,
        attributionControl: false,
        antialias: true,
      });
      map.on('load', () => {
        if (cancelled) return;
        // Try to set a config for the new standard style: lighting, theme
        try {
          if (mapStyle === 'mapbox') {
            map.setConfigProperty('basemap', 'lightPreset', 'day');
            map.setConfigProperty('basemap', 'showPointOfInterestLabels', showLabels);
            map.setConfigProperty('basemap', 'showTransitLabels', false);
          }
        } catch (e) { /* style doesn't support config */ }
        mapRef.current = map;
        setReady(true);
      });
    });
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Switch style on the fly
  React.useEffect(() => {
    if (!mapRef.current || !ready) return;
    mapRef.current.setStyle(MAP_STYLES[mapStyle] || MAP_STYLES.mapbox);
    mapRef.current.once('style.load', () => {
      try {
        if (mapStyle === 'mapbox') {
          mapRef.current.setConfigProperty('basemap', 'lightPreset', 'day');
          mapRef.current.setConfigProperty('basemap', 'showPointOfInterestLabels', showLabels);
          mapRef.current.setConfigProperty('basemap', 'showTransitLabels', false);
        }
      } catch (e) { /* ignore */ }
      // re-add route on style change
      addRouteLayers();
    });
  }, [mapStyle, ready]);

  // Recenter / re-pitch
  React.useEffect(() => {
    if (!mapRef.current || !ready) return;
    if (fitBounds) {
      mapRef.current.fitBounds(fitBounds, { padding: 80, duration: 800, pitch, bearing });
    } else {
      mapRef.current.easeTo({ center, zoom, pitch, bearing, duration: 800 });
    }
  }, [center[0], center[1], zoom, pitch, bearing, fitBounds && fitBounds[0][0], ready]);

  // Markers
  React.useEffect(() => {
    if (!mapRef.current || !ready) return;
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    markers.forEach((m) => {
      let el;
      if (m.type === 'user') el = makeUserMarker();
      else if (m.type === 'driver') el = makeDriverMarker();
      else if (m.type === 'dest') el = makeDestMarker();
      else if (m.type === 'stop') el = makeStopMarker(m.label || '?', m.color || '#0d3b2e');
      else { el = document.createElement('div'); el.className = 'sg-marker'; }
      const marker = new window.mapboxgl.Marker({ element: el, anchor: m.anchor || 'bottom' })
        .setLngLat(m.coord)
        .addTo(mapRef.current);
      markersRef.current.push(marker);
    });
  }, [markers, ready]);

  // Route line
  function addRouteLayers() {
    const map = mapRef.current;
    if (!map) return;
    // wait until style is loaded
    if (!map.isStyleLoaded()) {
      map.once('style.load', addRouteLayers);
      return;
    }
    if (route && route.coords && route.coords.length >= 2) {
      const data = {
        type: 'Feature',
        geometry: { type: 'LineString', coordinates: route.coords },
      };
      if (map.getSource('sg-route')) {
        map.getSource('sg-route').setData(data);
      } else {
        map.addSource('sg-route', { type: 'geojson', data });
        // route casing (dark outline)
        map.addLayer({
          id: 'sg-route-casing',
          type: 'line',
          source: 'sg-route',
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: {
            'line-color': '#072117',
            'line-width': 9,
            'line-opacity': 0.95,
          },
        });
        // route fill (bright green)
        map.addLayer({
          id: 'sg-route-fill',
          type: 'line',
          source: 'sg-route',
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: {
            'line-color': '#1fb55e',
            'line-width': 5,
            'line-opacity': 1,
          },
        });
      }
    } else {
      // remove if exists
      ['sg-route-fill', 'sg-route-casing'].forEach((id) => {
        if (map.getLayer(id)) map.removeLayer(id);
      });
      if (map.getSource('sg-route')) map.removeSource('sg-route');
    }

    // driver path (dashed gray when set)
    if (driverPath && driverPath.coords && driverPath.coords.length >= 2) {
      const data = {
        type: 'Feature',
        geometry: { type: 'LineString', coordinates: driverPath.coords },
      };
      if (map.getSource('sg-driverpath')) {
        map.getSource('sg-driverpath').setData(data);
      } else {
        map.addSource('sg-driverpath', { type: 'geojson', data });
        map.addLayer({
          id: 'sg-driverpath-line',
          type: 'line',
          source: 'sg-driverpath',
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: {
            'line-color': '#0d3b2e',
            'line-width': 4,
            'line-dasharray': [0.5, 1.5],
            'line-opacity': 0.65,
          },
        });
      }
    } else {
      if (mapRef.current.getLayer('sg-driverpath-line')) mapRef.current.removeLayer('sg-driverpath-line');
      if (mapRef.current.getSource('sg-driverpath')) mapRef.current.removeSource('sg-driverpath');
    }
  }
  React.useEffect(() => {
    if (ready) addRouteLayers();
  }, [route && JSON.stringify(route.coords), driverPath && JSON.stringify(driverPath && driverPath.coords), ready]);

  return (
    <div ref={containerRef} style={{
      position: 'absolute', inset: 0, background: '#e6e2d6', ...style,
    }} />
  );
}

// Helper: interpolate along a polyline by progress 0..1
function pointOnPath(path, progress) {
  if (!path || path.length < 2) return path?.[0];
  const t = Math.max(0, Math.min(1, progress));
  // total length in lng/lat (good enough for short distances)
  let total = 0;
  const segLens = [];
  for (let i = 1; i < path.length; i++) {
    const dx = path[i][0] - path[i - 1][0];
    const dy = path[i][1] - path[i - 1][1];
    const d = Math.hypot(dx, dy);
    segLens.push(d);
    total += d;
  }
  let dist = t * total;
  for (let i = 0; i < segLens.length; i++) {
    if (dist <= segLens[i] || i === segLens.length - 1) {
      const f = segLens[i] === 0 ? 0 : dist / segLens[i];
      const lng = path[i][0] + (path[i + 1][0] - path[i][0]) * f;
      const lat = path[i][1] + (path[i + 1][1] - path[i][1]) * f;
      return [lng, lat];
    }
    dist -= segLens[i];
  }
  return path[path.length - 1];
}

function pathSliceFrom(path, progress) {
  // Returns the portion of the path from current progress to end (for "remaining route" animation)
  if (!path || path.length < 2) return path || [];
  const here = pointOnPath(path, progress);
  // figure out which seg we're on
  let total = 0;
  const segLens = [];
  for (let i = 1; i < path.length; i++) {
    segLens.push(Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]));
    total += segLens[i - 1];
  }
  let dist = progress * total;
  let idx = path.length - 1;
  for (let i = 0; i < segLens.length; i++) {
    if (dist <= segLens[i]) { idx = i + 1; break; }
    dist -= segLens[i];
  }
  return [here, ...path.slice(idx)];
}

// ── Mapbox Directions (real street-following routes + turn-by-turn) ──────────
// Returns { coords: [[lng,lat],...], steps: [{maneuver, instruction, distance, duration}], distance, duration }
// distance in meters, duration in seconds.
async function fetchMapboxRoute(from, to, profile = 'driving') {
  const coords = `${from[0]},${from[1]};${to[0]},${to[1]}`;
  const lang = 'en'; // Mapbox supports th too but EN is reliable
  const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coords}?geometries=geojson&overview=full&steps=true&language=${lang}&access_token=${MAPBOX_TOKEN}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error('directions failed: ' + r.status);
  const j = await r.json();
  if (!j.routes || !j.routes.length) throw new Error('no route');
  const route = j.routes[0];
  const steps = (route.legs?.[0]?.steps || []).map(s => ({
    instruction: s.maneuver?.instruction || '',
    type: s.maneuver?.type || 'turn',
    modifier: s.maneuver?.modifier || '',
    location: s.maneuver?.location,
    distance: s.distance,
    duration: s.duration,
    name: s.name || '',
  }));
  return {
    coords: route.geometry.coordinates,
    steps,
    distance: route.distance,
    duration: route.duration,
  };
}

function useMapboxRoute(from, to, profile = 'driving') {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  React.useEffect(() => {
    if (!from || !to) return;
    let alive = true;
    fetchMapboxRoute(from, to, profile).then(d => alive && setData(d)).catch(e => alive && setError(e));
    return () => { alive = false; };
  }, [from && from[0], from && from[1], to && to[0], to && to[1], profile]);
  return { route: data, error };
}

Object.assign(window, { MapView, BKK, MAPBOX_TOKEN, MAP_STYLES, pointOnPath, pathSliceFrom, loadMapbox, fetchMapboxRoute, useMapboxRoute });
