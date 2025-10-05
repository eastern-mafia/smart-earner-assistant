"use client";

import { DeckGL } from "@deck.gl/react";
import { H3HexagonLayer } from "@deck.gl/geo-layers";
import { Map } from "react-map-gl/mapbox";
import { env } from "@/env";
import { useState } from "react";
import { IconLayer } from "@deck.gl/layers";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export type ViewState = {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
};

export type Hex = {
  hex: string;
	value: number;
};

export type Marker = {
  color: [number, number, number];
  coordinates: [number, number];
};

export default function HexMap({
  hex,
  marker,
  viewState,
}: {
  hex: Hex[] | null;
  marker: Marker | null;
  viewState: ViewState;
}) {
  const hexLayer = new H3HexagonLayer<Hex>({
    id: "hex-layer",
    data: hex ?? [],
    getHexagon: (d: Hex) => d.hex,
    getFillColor: (d: Hex) => [d.value, 0, 0],
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
      className="absolute z-10 rounded-full transition-all duration-300"
      style={{
        width: isFullScreen ? "100%" : 150,
        height: isFullScreen ? "100%" : 240,
        bottom: isFullScreen ? 0 : 16,
        right: isFullScreen ? 0 : 16,
      }}
    >
      {isFullScreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 h-full w-full"
        >
          <Button
            size="icon"
            className="bg-background text-foreground hover:bg-background/90 absolute top-4 left-1/2 z-20 h-16 w-16 -translate-x-1/2 cursor-pointer rounded-full shadow-md"
            onClick={() => setIsFullScreen((prev) => !prev)}
          >
            <ArrowLeft className="size-6" />
          </Button>
        </motion.div>
      )}
      <DeckGL
        width={isFullScreen ? "100%" : 150}
        height={isFullScreen ? "100%" : 240}
        initialViewState={viewState}
        controller={true}
        layers={[hexLayer, iconLayer]}
        onClick={() => setIsFullScreen(true)}
      >
        <Map
          mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        />
      </DeckGL>
    </div>
  );
}
