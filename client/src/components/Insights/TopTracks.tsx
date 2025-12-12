import { useEffect, useState } from "react";
import BarChart from "../charts/BarChart";
import type { TopTracksInterface, TrackInterface } from "../../interfaces/TrackInterface";
import { SkeletonChart } from "../Skeleton/PlaylistSkeleton";

interface Props {
  topTracks: TopTracksInterface | null
}

type ColorType = "green" | "red" | "purple" | "blue";

const TopTracks: React.FC<Props> = ({ topTracks}) => {

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("popular");

  useEffect(() => {
    if (topTracks) {
      setLoading(false);
    }
  }, [topTracks])

    const tabs: Array<{
    id: string;
    label: string;
    color: ColorType;
    data: TrackInterface[] | undefined;
    model: string;
    chartLabel: string;
  }> = [
    { 
      id: "popular", 
      label: "Most Popular", 
      color: "green" as ColorType,
      data: topTracks?.mostPopularTracks,
      model: "popularity",
      chartLabel: "Popularity"
    },
    { 
      id: "unpopular", 
      label: "Least Popular", 
      color: "red" as ColorType,
      data: topTracks?.leastPopularTracks,
      model: "popularity",
      chartLabel: "Popularity"
    },
    { 
      id: "longest", 
      label: "Longest", 
      color: "purple" as ColorType,
      data: topTracks?.longestTracks,
      model: "time",
      chartLabel: "Duration (ms)"
    },
    { 
      id: "shortest", 
      label: "Shortest", 
      color: "blue" as ColorType,
      data: topTracks?.shortestTracks,
      model: "time",
      chartLabel: "Duration (ms)"
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="bg-zinc-800/50 p-4">
      <h2 className="text-zinc-100 text-2xl font-semibold mb-6">
        Top Tracks Analysis
      </h2>
      <div className="flex flex-col gap-6">
        {loading ? (
          <SkeletonChart />
        ) : (
          currentTab?.data && (
            <>
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const colorClasses = {
                    green: isActive ? "bg-green-500/20 border-green-500 text-green-400" : "border-zinc-700 text-zinc-400 hover:border-green-500/50",
                    red: isActive ? "bg-red-500/20 border-red-500 text-red-400" : "border-zinc-700 text-zinc-400 hover:border-red-500/50",
                    purple: isActive ? "bg-purple-500/20 border-purple-500 text-purple-400" : "border-zinc-700 text-zinc-400 hover:border-purple-500/50",
                    blue: isActive ? "bg-blue-500/20 border-blue-500 text-blue-400" : "border-zinc-700 text-zinc-400 hover:border-blue-500/50"
                  };

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:cursor-pointer ${colorClasses[tab.color]}`}
                    >
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Top Chart and List */}
              <div className={`bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/30`}>
                <h3 className={`text-lg font-semibold ${currentTab && currentTab?.color ? `text-${currentTab.color}-400` : "text-zinc-400"} mb-3 flex items-center gap-2`}>
                  Top 10 {currentTab?.label} Tracks
                </h3>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <TopList top={currentTab?.data} model="populatiry"/>
                  <TopChart top={currentTab?.data} model="populatiry" label="Popularity" titles={["Popularity", "Tracks"]} horizontal={false} />
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
    <div className="h-[400px] w-full md:w-2/3">
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
    <ul className="space-y-2 w-full md:w-1/3 md:flex-1">
      {top.map((track, index) => (
        <li 
          key={track?.name || `empty-${index}`} 
          className="flex gap-3 items-center bg-zinc-800 p-2 rounded-md hover:bg-zinc-700 transition-colors"
        >
          <span className="text-purple-400 font-bold text-lg w-6">#{index + 1}</span>
          {track ? (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-zinc-200 truncate" title={track.name}>{track.name}</p>
              </div>
              {model === "time" ? (
                <span className="text-zinc-400">{track.duration.ms}</span>
              ) : (
                <span className="text-zinc-400">{track.popularity}</span>
              )}
            </>
          ) : (
            <p className="text-zinc-600">-</p>
          )}
        </li>
      ))}
    </ul>
  )
} 

export default TopTracks;