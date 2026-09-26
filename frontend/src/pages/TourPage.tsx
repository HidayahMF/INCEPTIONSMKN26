import { useState } from "react";
import { PublicNavbar } from "../components/public/PublicNavbar";
import { PanoramaViewer } from "../components/tour/PanoramaViewer";
import { tourScenes } from "../data/tourScenes";

export function TourPage() {
  const [currentSceneId, setCurrentSceneId] = useState(tourScenes[0].id);
  const scene =
    tourScenes.find((item) => item.id === currentSceneId) ?? tourScenes[0];
  return (
    <div className="min-h-screen bg-school-bg pb-16">
      <PublicNavbar />
      <main className="mx-auto w-[calc(100%-32px)] max-w-[1272px] pt-36">
        <span className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-soft-blue shadow-sm">
          Virtual Tour
        </span>
        <h1 className="mt-5 text-4xl font-bold text-ink md:text-5xl">
          Jelajahi SMKN 26 Jakarta
        </h1>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-primary-dark">
              {scene.name}
            </h2>
            <p className="text-sm text-muted">{scene.description}</p>
          </div>
          <p className="text-sm text-muted">Drag untuk melihat sekeliling</p>
        </div>
        <div className="mt-6">
          <PanoramaViewer scene={scene} onNavigate={setCurrentSceneId} />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          {tourScenes.map((item) => (
            <button
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${item.id === scene.id ? "bg-primary-dark text-white" : "bg-white text-primary-dark hover:bg-light-blue"}`}
              onClick={() => setCurrentSceneId(item.id)}
              key={item.id}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2 text-sm text-muted">
          <span className="size-2 rounded-full bg-primary" />
          Lapangan 1 → Lapangan 2 → Lapangan 3
        </div>
        <p className="mt-8 text-xs text-muted">
          Prototype virtual tour menggunakan panorama Lapangan. File saat ini
          berupa foto wide-angle, belum tervalidasi sebagai panorama spherical
          360° equirectangular.
        </p>
      </main>
    </div>
  );
}
