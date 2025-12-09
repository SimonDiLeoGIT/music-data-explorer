export const PlaylistHeaderSkeleton = () => {
  return (
    <header className="bg-zinc-800 p-4 rounded-t-md relative overflow-hidden">
      <div className="absolute inset-0 bg-zinc-900/50" />
      <section className="flex relative z-10">
        <div className="w-64 h-64 bg-zinc-700 rounded animate-pulse" />
        <div className="m-auto mb-0 ml-4 flex flex-col gap-2 w-1/2">
          <div className="h-4 w-16 bg-zinc-700 rounded animate-pulse" />
          <div className="h-12 w-full bg-zinc-700 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-zinc-700 rounded animate-pulse" />
        </div>
      </section>
      <section className="absolute bottom-0 right-0 p-4 grid grid-cols-2 gap-4 z-50">
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

export const ArtistDataSkeleton = () => {
  return (
    <section className="bg-zinc-700 p-2 text-sm flex gap-2">
      <div className="w-10/12">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-zinc-600 animate-pulse mr-2" />
          <div className="h-5 w-32 bg-zinc-600 rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-zinc-600 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-zinc-600 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-zinc-600 rounded animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 m-auto p-2">
        <article className="bg-zinc-900/50 p-4 rounded-md flex flex-col gap-2 shadow-md w-24">
          <div className="h-5 w-16 bg-zinc-700 rounded animate-pulse mx-auto" />
          <div className="h-6 w-12 bg-zinc-700 rounded animate-pulse mx-auto" />
        </article>
        <article className="bg-zinc-900/50 p-4 rounded-md flex flex-col gap-2 shadow-md w-24">
          <div className="h-5 w-16 bg-zinc-700 rounded animate-pulse mx-auto" />
          <div className="h-6 w-12 bg-zinc-700 rounded animate-pulse mx-auto" />
        </article>
      </div>
    </section>
  );
};

export const PlaylistCardsSkeleton = () => {
  return (
    <section className="bg-zinc-700/80 p-4 text-zinc-100 grid grid-cols-2 gap-4">
      {/* Total Duration Card */}
      <section className="w-full flex gap-2 bg-zinc-900 p-2 rounded-md">
        <span className="h-full bg-purple-400 w-[1.5px]"></span>
        <article className="flex flex-col gap-2 w-1/3">
          <div className="h-6 w-32 bg-zinc-700 rounded animate-pulse" />
          <div className="h-8 w-20 bg-zinc-700 rounded animate-pulse mx-auto" />
        </article>
        <div className="flex flex-col gap-2 flex-1">
          <article className="flex gap-2 bg-zinc-900 p-2 rounded-md">
            <span className="h-full bg-purple-400 w-[1.5px]"></span>
            <div className="flex flex-col gap-2 w-full">
              <div className="h-6 w-36 bg-zinc-700 rounded animate-pulse" />
              <div className="flex gap-2 items-center">
                <div className="h-4 flex-1 bg-zinc-700 rounded animate-pulse" />
                <div className="h-6 w-16 bg-zinc-700 rounded animate-pulse" />
              </div>
            </div>
          </article>
          <article className="flex gap-2 bg-zinc-900 p-2 rounded-md">
            <span className="h-full bg-purple-400 w-[1.5px]"></span>
            <div className="flex flex-col gap-2 w-full">
              <div className="h-6 w-36 bg-zinc-700 rounded animate-pulse" />
              <div className="flex gap-2 items-center">
                <div className="h-4 flex-1 bg-zinc-700 rounded animate-pulse" />
                <div className="h-6 w-16 bg-zinc-700 rounded animate-pulse" />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Popularity Card */}
      <section className="w-full flex gap-2 bg-zinc-900 p-2 rounded-md">
        <span className="h-full bg-purple-400 w-[1.5px]"></span>
        <article className="flex flex-col gap-2 w-1/3">
          <div className="h-6 w-32 bg-zinc-700 rounded animate-pulse" />
          <div className="h-8 w-20 bg-zinc-700 rounded animate-pulse mx-auto" />
        </article>
        <div className="flex flex-col gap-2 flex-1">
          <article className="flex gap-2 bg-zinc-900 p-2 rounded-md">
            <span className="h-full bg-purple-400 w-[1.5px]"></span>
            <div className="flex flex-col gap-2 w-full">
              <div className="h-6 w-40 bg-zinc-700 rounded animate-pulse" />
              <div className="flex gap-2 items-center">
                <div className="h-4 flex-1 bg-zinc-700 rounded animate-pulse" />
                <div className="h-6 w-12 bg-zinc-700 rounded animate-pulse" />
              </div>
            </div>
          </article>
          <article className="flex gap-2 bg-zinc-900 p-2 rounded-md">
            <span className="h-full bg-purple-400 w-[1.5px]"></span>
            <div className="flex flex-col gap-2 w-full">
              <div className="h-6 w-40 bg-zinc-700 rounded animate-pulse" />
              <div className="flex gap-2 items-center">
                <div className="h-4 flex-1 bg-zinc-700 rounded animate-pulse" />
                <div className="h-6 w-12 bg-zinc-700 rounded animate-pulse" />
              </div>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
};

export const TracksSkeleton = () => {
  return (
    <section className="bg-zinc-800/50 p-4 rounded-b-md">
      <div className="h-8 w-24 bg-zinc-700 rounded animate-pulse mb-4" />
      
      {/* Charts skeleton */}
      <div className="grid grid-cols-2 gap-4 h-[400px] p-4 mb-4">
        <div className="h-full bg-zinc-700/50 rounded animate-pulse" />
        <div className="h-full bg-zinc-700/50 rounded animate-pulse" />
      </div>

      {/* Table skeleton */}
      <ul className="text-zinc-100 p-2">
        <li className="grid grid-cols-4 gap-4 p-2 py-4 border-b border-zinc-700/50">
          <span className="flex gap-2 col-span-2">
            <div className="h-5 w-8 bg-zinc-700 rounded animate-pulse" />
            <div className="h-5 w-20 bg-zinc-700 rounded animate-pulse" />
          </span>
          <div className="h-5 w-24 bg-zinc-700 rounded animate-pulse ml-auto" />
          <div className="h-5 w-24 bg-zinc-700 rounded animate-pulse ml-auto" />
        </li>
        {[...Array(8)].map((_, i) => (
          <li key={i} className="grid grid-cols-4 gap-2 p-2 py-4 border-b border-zinc-700/20">
            <span className="flex gap-2 col-span-2">
              <div className="h-5 w-8 bg-zinc-700 rounded animate-pulse" />
              <div className="h-5 w-48 bg-zinc-700 rounded animate-pulse" />
            </span>
            <div className="h-5 w-12 bg-zinc-700 rounded animate-pulse ml-auto" />
            <div className="h-5 w-16 bg-zinc-700 rounded animate-pulse ml-auto" />
          </li>
        ))}
      </ul>
    </section>
  );
};

export const SkeletonChart: React.FC = () => {
  return (
    <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/30 animate-pulse">
      {/* Header */}
      <div className="h-6 bg-zinc-700/50 rounded w-1/4 mb-4"></div>
      <div className="flex gap-4 items-center">
        {/* Chart Skeleton */}
        <div className="w-2/3 h-[400px] bg-zinc-700/30 rounded-lg p-4">
          <div className="h-full flex flex-col justify-end gap-2">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className="bg-zinc-600/50 rounded"
                style={{ 
                  height: `${Math.random() * 60 + 20}%`,
                  width: '100%'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* List Skeleton */}
        <div className="flex-1 rounded-lg p-4">
          <div className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 p-2 bg-zinc-700/50 rounded h-12"
              >
                <div className="w-4 h-4 bg-zinc-600/50 rounded"></div>
                <div className="flex-1 h-4 bg-zinc-600/50 rounded"></div>
                <div 
                  className="h-4 bg-zinc-600/50 rounded" 
                  style={{ width: `${Math.random() * 30 + 40}px` }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};