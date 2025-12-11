const ExplicitTracksSkeleton = () => {
  return (
    <section className="bg-zinc-800/50 p-4 rounded-lg animate-pulse">
      {/* Título */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-zinc-700 rounded"></div>
        <div className="h-6 bg-zinc-700 w-40 rounded"></div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 items-center">
        {/* Gráfico circular */}
        <div className="relative w-40 h-40 shrink-0">
          <div className="w-full h-full rounded-full border-12 border-zinc-700"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="h-8 w-12 bg-zinc-700 rounded mb-1"></div>
            <div className="h-3 w-16 bg-zinc-700 rounded"></div>
          </div>
        </div>

        {/* Stats cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          {/* Card 1 */}
          <div className="bg-zinc-700/30 rounded-lg p-4 border border-zinc-700/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-zinc-700 rounded-full"></div>
              <div className="h-4 bg-zinc-700 w-20 rounded"></div>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <div className="h-10 bg-zinc-700 w-16 rounded"></div>
              <div className="h-6 bg-zinc-700 w-12 rounded"></div>
            </div>
            <div className="h-2 bg-zinc-700 rounded-full"></div>
          </div>

          {/* Card 2 */}
          <div className="bg-zinc-700/30 rounded-lg p-4 border border-zinc-700/50">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 bg-zinc-700 rounded-full"></div>
              <div className="h-4 bg-zinc-700 w-20 rounded"></div>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <div className="h-10 bg-zinc-700 w-16 rounded"></div>
              <div className="h-6 bg-zinc-700 w-12 rounded"></div>
            </div>
            <div className="h-2 bg-zinc-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplicitTracksSkeleton;