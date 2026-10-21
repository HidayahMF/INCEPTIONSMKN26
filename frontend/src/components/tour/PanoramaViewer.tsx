import { useEffect, useRef, useState } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { VisibleRangePlugin } from "@photo-sphere-viewer/visible-range-plugin";
import "@photo-sphere-viewer/core/index.css";

type PanoramaViewerProps = {
  panorama: string;
  locationName?: string;
};

export function PanoramaViewer({ panorama, locationName = "lokasi sekolah" }: PanoramaViewerProps) {
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
    <div className="relative mx-auto block aspect-[2/1] w-full min-w-0 max-w-[1000px] overflow-hidden rounded-[24px] border-[12px] border-white bg-white shadow-[0_10px_28px_rgba(15,23,42,.14)] sm:rounded-[26px] sm:border-[12px]">
      <div
        ref={containerRef}
        className={`relative block size-full min-w-0 max-w-full overflow-hidden rounded-[14px] ${ready ? "opacity-100" : "opacity-0"}`}
      />
      {!error && (
        <img
          className={`absolute inset-3 size-[calc(100%-1.5rem)] rounded-[14px] object-contain transition-opacity ${ready ? "pointer-events-none opacity-0" : "opacity-100"}`}
          src={panorama}
          alt={`Panorama ${locationName}`}
        />
      )}
      {error && (
        <div className="absolute inset-3 grid place-items-center rounded-[14px] bg-[#f3f8ff] px-6 text-center">
          <div>
            <strong className="block text-lg text-ink">Panorama belum tersedia</strong>
            <p className="mt-2 text-sm leading-6 text-muted">{error} Asset panorama untuk lokasi ini belum tersedia atau tidak dapat dibaca.</p>
          </div>
        </div>
      )}
    </div>
  );
}
