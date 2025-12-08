const GenresInsightsSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex gap-4">
        <div className="w-2/3 h-[500px] bg-zinc-800 rounded-md"></div>
        <div className="flex-1 flex flex-col justify-center gap-4">
          <TopCardSkeleton />
          <TopCardSkeleton />
          <TopCardSkeleton />
        </div>
      </div>
      <div className="h-4 bg-zinc-800 rounded w-1/3 mt-2"></div>
      <div className="grid grid-cols-3 gap-4 mt-4 bg-zinc-900 p-4 rounded-md">
        <TopFiveListSkeleton />
        <TopFiveListSkeleton />
        <TopFiveListSkeleton />
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        <TopChartSkeleton />
        <TopChartSkeleton />
        <TopChartSkeleton />
      </div>
    </div>
  )
}

const TopCardSkeleton = () => {
  return (
    <article className="flex gap-2 bg-zinc-700/80 p-2 rounded-md animate-pulse">
      <span className="h-full bg-zinc-600 w-[1.5px]"></span>
      <div className="space-y-2 flex-1">
        <div className="h-5 bg-zinc-600 rounded w-24"></div>
        <div className="h-4 bg-zinc-600 rounded w-3/4"></div>
      </div>
    </article>
  )
}

const TopFiveListSkeleton = () => {
  return (
    <div className="flex-1 animate-pulse">
      <div className="h-6 bg-zinc-700 rounded w-32 mb-2"></div>
      <div className="mt-4">
        <ul className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <li 
              key={index} 
              className="flex gap-2 items-center bg-zinc-800/80 p-4 rounded-md w-full"
            >
              <div className="h-4 bg-zinc-700 rounded w-6"></div>
              <div className="h-4 bg-zinc-700 rounded flex-1"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const TopChartSkeleton = () => {
  return (
    <div className="h-[400px] bg-zinc-800 rounded-md animate-pulse"></div>
  )
}

export default GenresInsightsSkeleton
export { TopCardSkeleton, TopFiveListSkeleton, TopChartSkeleton }