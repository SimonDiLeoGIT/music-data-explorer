import type { AlbumInsightsInterface } from "../../../interfaces/MusicInterfaces"

interface Props {
  insights: AlbumInsightsInterface
}

const AlbumCards: React.FC<Props> = ({insights}) => {
  return (
    <section className="bg-zinc-700/80 p-4 text-zinc-100 flex w-full gap-2">
       <section className="w-full flex gap-2 bg-zinc-900 p-2 rounded-md">
          <span className="h-full bg-purple-400 w-[1.5px]"></span>
          <article className="flex flex-col gap-1 w-1/3">
            <h2 className="text-lg font-semibold">Total Duration</h2>
            <p className="font-semibold text-2xl text-purple-400 m-auto">{insights?.totalDuration}</p>
          </article>
          <div className="flex flex-col gap-2 flex-1">
            <article className="flex gap-2 bg-zinc-900 p-2 rounded-md">
              <span className="h-full bg-purple-400 w-[1.5px]"></span>
              <div className="flex flex-col gap-1 w-full">
                <h2 className="text-lg font-semibold">Longest Track</h2>
                <div className="flex gap-2 items-center">
                  <p className="flex-1 text-sm">{insights?.longestTrack.name}</p>
                  <p className="font-semibold text-purple-400 justify-self-end px-2">{insights?.longestTrack.duration.timeString}</p>
                </div>
              </div>
            </article>
            <article className="flex gap-2 bg-zinc-900 p-2 rounded-md">
              <span className="h-full bg-purple-400 w-[1.5px]"></span>
              <div className="flex flex-col gap-1 w-full">
                <h2 className="text-lg font-semibold">Shortest Track</h2>
                <div className="flex gap-2 items-center">
                  <p className="flex-1 text-sm">{insights?.shortestTrack.name}</p>
                  <p className="font-semibold text-purple-400 justify-self-end px-2">{insights?.shortestTrack.duration.timeString}</p>
                </div>
              </div>
            </article>
          </div>
       </section>
       <section className="w-full flex gap-2 bg-zinc-900 p-2 rounded-md">
          <span className="h-full bg-purple-400 w-[1.5px]"></span>
          <article className="flex flex-col gap-1 w-1/3">
            <h2 className="text-lg font-semibold">Popularity</h2>
            <p className="font-semibold text-2xl text-purple-400 m-auto">{insights?.popularity.average}</p>
          </article>
          <div className="flex flex-col gap-2 flex-1">
            <article className="flex gap-2 bg-zinc-900 p-2 rounded-md">
              <span className="h-full bg-purple-400 w-[1.5px]"></span>
              <div className="flex flex-col gap-1 w-full">
                <h2 className="text-lg font-semibold">Most Popular Track</h2>
                <p className="font-semibold text-purple-400 ">{insights?.popularity.mostPopularTrack.popularity}</p>                
              </div>
            </article>
            <article className="flex gap-2 bg-zinc-900 p-2 rounded-md">
              <span className="h-full bg-purple-400 w-[1.5px]"></span>
              <div className="flex flex-col gap-1 w-full">
                <h2 className="text-lg font-semibold">Least Popular Track</h2>
                <p className="font-semibold text-purple-400">{insights?.popularity.leastPopularTrack.popularity}</p>
              </div>
            </article>
          </div>
       </section>
      </section>
  )
}

export default AlbumCards