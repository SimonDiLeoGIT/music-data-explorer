export const GenresInsightsSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="my-6">
        <div className="w-full h-[500px] bg-zinc-800 rounded-md"></div>
      </div>
      <div className="my-6">
        <GenreTopSectionSkeleton />
        <GenreTopSectionSkeleton />
        <GenreTopSectionSkeleton />
      </div>
    </div>
  )
}

export const GenreTopSectionSkeleton = () => {
  return (
    <div className="bg-zinc-800/50 p-6 rounded-lg animate-pulse">
      {/* Título */}
      <div className="h-7 bg-zinc-700 w-64 rounded mb-4"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Lista Top 5 */}
        <div>
          <ul className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <li 
                key={i} 
                className="flex gap-3 items-center bg-zinc-800 p-4 rounded-md"
              >
                <div className="h-6 w-6 bg-zinc-700 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
                  {i % 2 === 0 && (
                    <div className="h-3 bg-zinc-700 rounded w-1/2"></div>
                  )}
                </div>
                <div className="h-4 w-4 bg-zinc-700 rounded"></div>
              </li>
            ))}
          </ul>
        </div>

        {/* Gráfico */}
        <div className="bg-zinc-800 p-4 rounded-lg">
          <div className="h-4 bg-zinc-700 w-40 rounded mb-4"></div>
          <div className="h-[400px] flex items-end justify-around gap-2">
            {[85, 65, 95, 50, 70].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-zinc-700 rounded-t"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="h-3 w-6 bg-zinc-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};