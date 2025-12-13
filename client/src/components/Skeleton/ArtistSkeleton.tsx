export const ArtistHeaderSkeleton = () => {
  return (
    <header className="bg-zinc-800 p-4 rounded-t-md relative overflow-hidden">
      <div className="absolute inset-0 bg-zinc-900/50" />
      <section className="flex flex-col md:flex-row relative z-10">
        <div className="w-64 h-64 bg-zinc-700 rounded-full mx-auto md:mx-0 animate-pulse mb-4 md:mb-0" />
        <div className="m-auto mb-0 md:ml-4 flex flex-col items-center md:items-start gap-2 w-1/2">
          <div className="h-4 w-16 bg-zinc-700 rounded animate-pulse" />
          <div className="h-12 w-full bg-zinc-700 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-zinc-700 rounded animate-pulse" />
        </div>
      </section>
      <section className="relative md:absolute top-0 right-0 p-4 grid grid-cols-2 place-items-center gap-4 z-50">
        <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-2 shadow-md w-32">
          <div className="h-6 w-20 bg-zinc-600 rounded animate-pulse mx-auto" />
          <div className="h-8 w-16 bg-zinc-600 rounded animate-pulse mx-auto" />
        </article>
        <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-2 shadow-md w-32">
          <div className="h-6 w-20 bg-zinc-600 rounded animate-pulse mx-auto" />
          <div className="h-8 w-16 bg-zinc-600 rounded animate-pulse mx-auto" />
        </article>
      </section>
    </header>
  );
};

export const TopTracksSkeleton = () => {
  return (
    <section className="bg-zinc-800/50 p-6 rounded-md mb-6">
      <div className="h-8 w-32 bg-zinc-700 rounded animate-pulse mb-4" />
      
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 rounded-md"
          >
            <div className="w-6 h-6 bg-zinc-700 rounded animate-pulse" />
            
            <div className="w-12 h-12 bg-zinc-700 rounded animate-pulse" />
            
            <div className="flex-1">
              <div className="h-5 bg-zinc-700 rounded animate-pulse w-3/4" />
            </div>
            
            {index % 3 === 0 && (
              <div className="w-6 h-6 bg-zinc-700 rounded animate-pulse" />
            )}
            
            <div className="w-12 h-5 bg-zinc-700 rounded animate-pulse" />
            
            <div className="w-8 h-5 bg-zinc-700 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
};

export const BiographySkeleton = () => {
  return (
    <section className="bg-zinc-800/50 p-6 rounded-md my-6">
      {/* Título */}
      <div className="h-8 w-40 bg-zinc-700 rounded animate-pulse mb-4" />
      
      {/* Líneas de texto */}
      <div className="space-y-3">
        <div className="h-4 bg-zinc-700 rounded animate-pulse w-full" />
        <div className="h-4 bg-zinc-700 rounded animate-pulse w-full" />
        <div className="h-4 bg-zinc-700 rounded animate-pulse w-11/12" />
      </div>
    </section>
  );
};