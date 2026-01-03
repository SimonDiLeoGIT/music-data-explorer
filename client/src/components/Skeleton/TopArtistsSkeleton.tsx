import { useState } from "react";

const TopArtistsSkeleton = () => {

  const [bars] = useState(() =>
    Array.from({ length: 10 }, () => 60 + Math.random() * 40)
  );

  return (
    <div className="flex items-center justify-center h-full gap-8">
      <div className="w-2/3">
        <div className="w-40 h-40 m-auto">
          <div className="w-full h-full rounded-full border-8 border-zinc-700/50 animate-pulse" />
        </div>
      </div>
      
      <div className="flex-1 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-zinc-700/50 animate-pulse" />
            <div className="h-3 bg-zinc-700/50 rounded animate-pulse" style={{ width: `${bars[i]}%` }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopArtistsSkeleton