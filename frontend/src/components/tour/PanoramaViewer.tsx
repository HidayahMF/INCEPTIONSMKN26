import { useEffect, useRef, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { VisibleRangePlugin } from "@photo-sphere-viewer/visible-range-plugin";
import "@photo-sphere-viewer/core/index.css";

type PanoramaViewerProps = {
  panorama: string;
};

export function PanoramaViewer({ panorama }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;
    let disposed = false;
    const image = new Image();
    image.onload = () => {
      if (disposed || !containerRef.current) return;
      const fullHeight = Math.round(image.naturalWidth / 2);
      const viewer = new Viewer({
        container: containerRef.current,
        panorama,
        panoData: {
          fullWidth: image.naturalWidth,
          fullHeight,
          croppedWidth: image.naturalWidth,
          croppedHeight: image.naturalHeight,
          croppedX: 0,
          croppedY: Math.round((fullHeight - image.naturalHeight) / 2),
        },
        defaultZoomLvl: 0,
        navbar: ["zoom", "fullscreen"],
        plugins: [[VisibleRangePlugin, { usePanoData: true }]],
      });
      viewerRef.current = viewer;
      const handleReady = () => setReady(true);
      const handleError = () => setError("Panorama gagal dimuat.");
      viewer.addEventListener("ready", handleReady);
      viewer.addEventListener("panorama-error", handleError);
      viewer.addEventListener("panorama-loaded", handleReady);
    };
    image.onerror = () => setError("Panorama gagal dimuat.");
    image.src = panorama;
    return () => {
      disposed = true;
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
  }, [panorama]);

  return (
    <div className="relative block w-full min-w-0 max-w-full overflow-hidden rounded-3xl border-2 border-light-blue bg-white p-2 shadow-[0_4px_16px_rgba(15,23,42,.12)]">
      <div
        ref={containerRef}
        className={`relative block h-[clamp(420px,68vh,720px)] min-h-[420px] w-full min-w-0 max-w-full overflow-hidden rounded-[18px] ${ready ? "opacity-100" : "opacity-0"}`}
      />
      <img
        className={`absolute bottom-2 left-2 right-2 top-2 h-auto w-auto max-w-none rounded-[18px] object-cover transition-opacity ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`}
        src={panorama}
        alt="Panorama area lapangan SMKN 26 Jakarta"
      />
      {error && (
        <div className="absolute inset-x-0 bottom-0 bg-ink/75 px-4 py-3 text-center text-sm text-white">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
