import { useEffect } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { LatLng, RouteSegment } from "../data/dummy-data";

const concernLineColor: Record<RouteSegment["concern"], string> = {
  low: "#10b981", // emerald-500
  moderate: "#f59e0b", // amber-500
  high: "#f97316", // orange-500
};

function makeMarkerIcon(label: string, backgroundClass: string) {
  return L.divIcon({
    className: "",
    html: `<div style="display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:9999px;background:${backgroundClass};color:white;font-size:12px;font-weight:700;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.35);">${label}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

const originIcon = makeMarkerIcon("A", "#0f766e"); // teal-700
const destinationIcon = makeMarkerIcon("B", "#334155"); // slate-700

interface FitBoundsProps {
  points: LatLng[];
}

function FitBounds({ points }: FitBoundsProps) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;
    map.fitBounds(points, { padding: [28, 28] });
  }, [map, points]);

  return null;
}

interface RouteMapProps {
  segments: RouteSegment[];
}

export function RouteMap({ segments }: RouteMapProps) {
  const allPoints = segments.flatMap((segment) => segment.path);
  const origin = allPoints[0];
  const destination = allPoints[allPoints.length - 1];

  if (!origin || !destination) return null;

  return (
    <div className="h-64 w-full overflow-hidden rounded-xl border border-slate-200 sm:h-72">
      <MapContainer
        center={origin}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={allPoints} />
        {segments.map((segment, index) => (
          <Polyline
            key={index}
            positions={segment.path}
            pathOptions={{ color: concernLineColor[segment.concern], weight: 5, opacity: 0.85, lineCap: "round" }}
          />
        ))}
        <Marker position={origin} icon={originIcon} />
        <Marker position={destination} icon={destinationIcon} />
      </MapContainer>
    </div>
  );
}
