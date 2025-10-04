"use client";

import { DeckGL } from "@deck.gl/react";
import { H3HexagonLayer } from "@deck.gl/geo-layers";
import { Map } from "react-map-gl/mapbox";
import { env } from "@/env";
import { useState } from "react";
import { IconLayer } from "@deck.gl/layers";

export type ViewState = {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
};

export type Hex = {
  hex: string;
  color: [number, number, number];
};

export type Marker = {
	color: [number, number, number];
	coordinates: [number, number];
};

export default function HexMap({ hex, marker, viewState }: { hex: Hex[] | null, marker: Marker | null, viewState: ViewState }) {
  const hexLayer = new H3HexagonLayer<Hex>({
    id: "hex-layer",
    data: hex ?? [],
    getHexagon: (d: Hex) => d.hex,
    getFillColor: (d: Hex) => d.color,
    extruded: false,
    pickable: true,
  });

	const iconLayer = new IconLayer<Marker>({
    id: "IconLayer",
    data: marker ? [marker] : [],
    getColor: (d: Marker) => d.color,
    getIcon: () => "marker",
    getPosition: (d: Marker) => d.coordinates,
    getSize: 40,
    iconAtlas:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png",
    iconMapping:
      "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json",
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
        initialViewState={viewState}
        controller={true}
        layers={[hexLayer, iconLayer]}
      >
        <Map
          mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        />
      </DeckGL>
    </div>
  );
}
