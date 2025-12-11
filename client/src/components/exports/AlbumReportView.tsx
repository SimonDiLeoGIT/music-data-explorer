// src/components/Reports/AlbumReportView.tsx
import type { AlbumInterface } from "../../interfaces/AlbumInteface";
import type { InsightsInterface } from "../../interfaces/InisightsInterfaces";
import type { TopTracksInterface } from "../../interfaces/TrackInterface";
import { formatNumber } from "../../utils/formatNumbers";

interface AlbumReportViewProps {
  album: AlbumInterface;
  insights: InsightsInterface;
  topTracks: TopTracksInterface;
}

const AlbumReportView: React.FC<AlbumReportViewProps> = ({ 
  album, 
  insights, 
  topTracks 
}) => {
  return (
    <div className="bg-white text-black p-8 max-w-[210mm]">
      <header className="mb-8 border-b-2 border-purple-500 pb-4">
        <div className="flex gap-4 items-center">
          <img 
            src={album.cover} 
            alt={album.name} 
            className="w-32 h-32 rounded"
          />
          <div>
            <p className="text-sm text-gray-600 uppercase">Album Report</p>
            <h1 className="text-4xl font-bold mb-2">{album.name}</h1>
            <p className="text-lg text-gray-700">{album.artist.name}</p>
            <p className="text-sm text-gray-500">
              {album.releaseDate} • {album.totalTracks} tracks • {insights.time.totalDuration}
            </p>
          </div>
        </div>
      </header>
      <section className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Listeners</h3>
          <p className="text-3xl font-bold text-purple-600">
            {formatNumber(album.stats.listeners)}
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-sm font-semibold text-gray-600 mb-1">Plays</h3>
          <p className="text-3xl font-bold text-purple-600">
            {formatNumber(album.stats.playcount)}
          </p>
        </div>
      </section>
      <section className="grid grid-cols-2 gap-4 mb-8">
        <div className="border-l-4 border-purple-500 pl-4">
          <h3 className="font-semibold mb-2">Duration</h3>
          <p className="text-2xl font-bold text-purple-600 mb-2">{insights.time.totalDuration}</p>
          <div className="text-sm space-y-1">
            <p><span className="font-semibold">Longest:</span> {insights.time.longestTrack.name} ({insights.time.longestTrack.duration.timeString})</p>
            <p><span className="font-semibold">Shortest:</span> {insights.time.shortestTrack.name} ({insights.time.shortestTrack.duration.timeString})</p>
          </div>
        </div>
        <div className="border-l-4 border-purple-500 pl-4">
          <h3 className="font-semibold mb-2">Popularity</h3>
          <p className="text-2xl font-bold text-purple-600 mb-2">{insights.popularity.average}</p>
          <div className="text-sm space-y-1">
            <p><span className="font-semibold">Most Popular:</span> {insights.popularity.mostPopularTrack.name} ({insights.popularity.mostPopularTrack.popularity})</p>
            <p><span className="font-semibold">Least Popular:</span> {insights.popularity.leastPopularTrack.name} ({insights.popularity.leastPopularTrack.popularity})</p>
          </div>
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Content Rating</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border-2 border-red-300 bg-red-50 p-4 rounded">
            <p className="text-sm font-semibold text-red-700 mb-1">Explicit Tracks</p>
            <p className="text-3xl font-bold text-red-600">{insights.explicitTracks}</p>
            <p className="text-sm text-red-600">
              {((insights.explicitTracks / album.totalTracks) * 100).toFixed(1)}%
            </p>
          </div>
          <div className="border-2 border-green-300 bg-green-50 p-4 rounded">
            <p className="text-sm font-semibold text-green-700 mb-1">Clean Tracks</p>
            <p className="text-3xl font-bold text-green-600">
              {album.totalTracks - insights.explicitTracks}
            </p>
            <p className="text-sm text-green-600">
              {(((album.totalTracks - insights.explicitTracks) / album.totalTracks) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </section>
      <div style={{ pageBreakAfter: 'always' }}></div>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-purple-500 pb-2">
          Top Tracks Analysis
        </h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-green-600 mb-3">Most Popular Tracks</h3>
          <ol className="space-y-2">
            {topTracks.mostPopularTracks.map((track, i) => (
              <li key={track.id} className="flex justify-between bg-gray-50 p-3 rounded">
                <span className="font-medium">{i + 1}. {track.name}</span>
                <span className="text-green-600 font-bold">{track.popularity}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-red-600 mb-3">Least Popular Tracks</h3>
          <ol className="space-y-2">
            {topTracks.leastPopularTracks.map((track, i) => (
              <li key={track.id} className="flex justify-between bg-gray-50 p-3 rounded">
                <span className="font-medium">{i + 1}. {track.name}</span>
                <span className="text-red-600 font-bold">{track.popularity}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-purple-600 mb-3">Longest Tracks</h3>
          <ol className="space-y-2">
            {topTracks.longestTracks.map((track, i) => (
              <li key={track.id} className="flex justify-between bg-gray-50 p-3 rounded">
                <span className="font-medium">{i + 1}. {track.name}</span>
                <span className="text-purple-600 font-bold">{track.duration.timeString}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-blue-600 mb-3">Shortest Tracks</h3>
          <ol className="space-y-2">
            {topTracks.shortestTracks.map((track, i) => (
              <li key={track.id} className="flex justify-between bg-gray-50 p-3 rounded">
                <span className="font-medium">{i + 1}. {track.name}</span>
                <span className="text-blue-600 font-bold">{track.duration.timeString}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
};

export default AlbumReportView;