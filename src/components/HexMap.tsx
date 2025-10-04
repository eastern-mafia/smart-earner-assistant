"use client";

import { DeckGL } from "@deck.gl/react";
import { H3HexagonLayer } from "@deck.gl/geo-layers";
import { Map } from "react-map-gl/mapbox";
import { env } from "@/env";
import { useState } from "react";

type Hex = {
  hex: string;
  color: [number, number, number];
};

const data: Hex[] = [
  { hex: "8828308281fffff", color: [255, 0, 0] },
  { hex: "8828308283fffff", color: [0, 255, 0] },
  { hex: "8828308285fffff", color: [0, 0, 255] },
];

const INITIAL_VIEW_STATE = {
  longitude: -122.4,
  latitude: 37.8,
  zoom: 12,
  pitch: 45,
  bearing: 0,
};

export default function HexMap() {
  const layer = new H3HexagonLayer<Hex>({
    id: "hex-layer",
    data,
    getHexagon: (d: Hex) => d.hex,
    getFillColor: (d: Hex) => d.color,
    extruded: false,
    pickable: true,
  });

  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div
      className="absolute rounded-full transition-all duration-300 z-10"
			onClick={() => setIsFullScreen((prev) => !prev)}
      style={{
        width: isFullScreen ? "100%" : 150,
        height: isFullScreen ? "100%" : 240,
				bottom: isFullScreen ? 0 : 16,
				right: isFullScreen ? 0 : 16,
      }}
    >
      <DeckGL
        width={isFullScreen ? "100%" : 150}
        height={isFullScreen ? "100%" : 240}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={[layer]}
      >
        <Map
          mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        />
      </DeckGL>
    </div>
  );
}
