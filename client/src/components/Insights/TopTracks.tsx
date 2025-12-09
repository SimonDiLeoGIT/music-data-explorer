import { useEffect, useState } from "react";
import BarChart from "../charts/BarChart";
import type { TopTracksInterface, TrackInterface } from "../../interfaces/TrackInterface";
import { SkeletonChart } from "../Skeleton/PlaylistSkeleton";

interface Props {
  topTracks: TopTracksInterface | null
}

const TopTracks: React.FC<Props> = ({ topTracks}) => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topTracks) {
      setLoading(false);
    }
  }, [topTracks])

  return (
    <section className="bg-zinc-800/50 p-4">
      <h2 className="text-zinc-100 text-2xl font-semibold mb-6">
        Top Tracks Analysis
      </h2>
      <div className="flex flex-col gap-6">
        {loading ? (
          <>
            <SkeletonChart />
            <SkeletonChart />
            <SkeletonChart />
            <SkeletonChart />
          </>
        ) : (
          topTracks && (
            <>
              {/* Most Popular Tracks */}
              <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/30 hover:border-green-500/30 transition-colors">
                <h3 className="text-lg font-semibold text-green-400 mb-3 flex items-center gap-2">
                  Most Popular Tracks
                </h3>
                <div className="flex gap-4 items-center">
                  <TopChart top={topTracks.mostPopularTracks} model="populatiry" label="Popularity" titles={["Popularity", "Tracks"]} horizontal={false} />
                  <TopList top={topTracks.mostPopularTracks} model="populatiry"/>
                </div>
              </div>
              
              {/* Least Popular Tracks */}
              <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/30 hover:border-red-500/30 transition-colors">
                <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
                  Least Popular Tracks
                </h3>
                <div className="flex gap-4 items-center">
                  <TopChart top={topTracks.leastPopularTracks} model="populatiry" label="Popularity" titles={["Popularity", "Tracks"]} horizontal={false} />
                  <TopList top={topTracks.leastPopularTracks} model="populatiry"/>
                </div>
              </div>

              {/* Longest Tracks */}
              <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/30 hover:border-purple-500/30 transition-colors">
                <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  Longest Tracks
                </h3>
                <div className="flex gap-4 items-center">
                  <TopChart top={topTracks.longestTracks}  model="time" label="Duration (ms)" titles={["Duration (ms)", "Tracks"]} horizontal />
                  <TopList top={topTracks.longestTracks} model="time"/>
                </div>
              </div>
              
              {/* Shortest Tracks */}
              <div className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/30 hover:border-blue-500/30 transition-colors">
                <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                  Shortest Tracks
                </h3>
                <div className="flex gap-4 items-center">
                  <TopChart top={topTracks.shortestTracks} model="time" label="Duration (ms)" titles={["Duration (ms)", "Tracks"]} horizontal />
                  <TopList top={topTracks.shortestTracks} model="time"/>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </section>
  )
}


const TopChart: React.FC<{top: TrackInterface[], model: string, label: string, titles: [string, string], horizontal: boolean}> = ({top, model, label, titles, horizontal}) => {
  const truncateLabel = (text: string, maxLength: number = 20) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const datasets = {
    backgroundColor: "rgba(168, 85, 247, 0.3)",
    borderColor: "rgba(168, 85, 247, 1)",
    borderWidth: 1,
    borderRadius: 10,
    barPercentage: 0.5,
    categoryPercentage: 0.5,
  }
  
  return (
    <div className="h-[400px] w-2/3">
      <BarChart 
        data={{
          labels: top.map((track) => 
            truncateLabel(track.name)
          ),
          datasets: [{
            label: label,
            data: model === "time" ? top.map((track) => track.duration.ms) : top.map((track) => track.popularity),
            ...datasets
          }],
          xTitle: titles[0],
          yTitle: titles[1]
        }}
        horizontal={horizontal}
        onClick={() => {}}
      />
    </div>
  )
} 

const TopList: React.FC<{top: TrackInterface[], model: string}> = ({top, model}) => {
  return (
    <div className="rounded-lg p-4 flex-1">
      <ol className="space-y-2">
        {top.map((track, index) => (
          <li key={track.id} className="flex items-start gap-2 p-2 text-sm bg-zinc-700/50 rounded">
            <span className="text-purple-400 font-bold">
              {index + 1}.
            </span>
            <div className="flex-1 flex">
              <p className="text-zinc-100 font-medium line-clamp-2">
                {track.name}
              </p>
              <p className="text-zinc-400 text-xs mt-1 m-auto mr-0">
                {
                  model === 'time' ? track.duration.timeString : track.popularity
                }
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
} 

export default TopTracks;