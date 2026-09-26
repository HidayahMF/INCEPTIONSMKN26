import { useEffect, useRef, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { VisibleRangePlugin } from "@photo-sphere-viewer/visible-range-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import type { TourScene } from "../../data/tourScenes";

type PanoramaViewerProps = {
  scene: TourScene;
  onNavigate: (sceneId: string) => void;
};
export function PanoramaViewer({ scene, onNavigate }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const markersRef = useRef<MarkersPlugin | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!containerRef.current) return;
    const viewer = new Viewer({
      container: containerRef.current,
      panorama: scene.panorama,
      panoData: (image) => ({
        fullWidth: image.width,
        fullHeight: Math.round(image.width / 2),
        croppedWidth: image.width,
        croppedHeight: image.height,
        croppedX: 0,
        croppedY: Math.round((Math.round(image.width / 2) - image.height) / 2),
      }),
      defaultZoomLvl: 0,
      navbar: ["zoom", "fullscreen"],
      plugins: [
        [MarkersPlugin, { markers: [] }],
        [VisibleRangePlugin, { usePanoData: true }],
      ],
    });
    viewerRef.current = viewer;
    markersRef.current = viewer.getPlugin<MarkersPlugin>(MarkersPlugin);
    return () => {
      viewer.destroy();
      viewerRef.current = null;
      markersRef.current = null;
    };
  }, []);
  useEffect(() => {
    const viewer = viewerRef.current;
    const markers = markersRef.current;
    if (!viewer || !markers) return;
    markers.clearMarkers();
    scene.hotspots.forEach((hotspot) =>
      markers.addMarker({
        id: hotspot.id,
        position: { yaw: hotspot.yaw, pitch: hotspot.pitch },
        html: `<button type="button" class="tour-hotspot" aria-label="${hotspot.label}">→</button>`,
        tooltip: hotspot.label,
        anchor: "center center",
        size: { width: 48, height: 48 },
        data: { targetSceneId: hotspot.targetSceneId },
      }),
    );
    const handleSelect = (event: any) => {
      if (event.marker?.data?.targetSceneId) {
        onNavigate(event.marker.data.targetSceneId);
      }
    };
    markers.addEventListener("select-marker", handleSelect);
    viewer
      .setPanorama(scene.panorama, { transition: true })
      .catch(() => setError("Panorama gagal dimuat."));
    return () => markers.removeEventListener("select-marker", handleSelect);
  }, [scene, onNavigate]);
  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink shadow-xl">
      <div
        ref={containerRef}
        className="h-[clamp(420px,65vh,720px)] min-h-[420px] w-full"
      />
      {error && (
        <div className="absolute inset-0 grid place-items-center bg-ink/80 p-6 text-center text-white">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
