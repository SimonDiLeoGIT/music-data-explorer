const AlbumSkeleton = () => (
  <div className="bg-zinc-800 rounded-md overflow-hidden animate-pulse">
    <div className="w-full aspect-square bg-zinc-700" />
    <div className="p-2 space-y-2">
      <div className="h-5 bg-zinc-700 rounded w-3/4" />
      <div className="h-4 bg-zinc-700 rounded w-1/2" />
      <div className="h-4 bg-zinc-700 rounded w-1/3" />
    </div>
  </div>
);

export default AlbumSkeleton