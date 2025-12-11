import type { TrackInterface } from "../../../interfaces/ArtistInterface";

interface Props {
  tracks: TrackInterface[];
}

export const TopTracks: React.FC<Props> = ({ tracks }) => {
  return (
    <section className="bg-zinc-800/50 p-6 rounded-md my-6">
      <h2 className="text-2xl text-zinc-100 font-semibold mb-4">
        Top Tracks
      </h2>
      {tracks && tracks.length > 0 ? (
        <div className="space-y-2">
          {tracks.slice(0, 10).map((track, index) => (
            <div
              key={track.id}
              className="flex items-center gap-4 p-3 hover:bg-zinc-700/50 rounded-md transition-colors"
            >
              <span className="text-zinc-400 font-semibold w-6">
                {index + 1}
              </span>
              <img
                src={track.album.cover}
                alt={track.album.name}
                className="w-12 h-12 rounded"
              />
              <div className="flex-1">
                <p className="text-zinc-100 font-semibold">{track.name}</p>
              </div>
              {track.explicit && (
                <span className="text-xs bg-red-700/50 text-zinc-100 px-2 py-1 rounded">
                  E
                </span>
              )}
              <span className="text-zinc-400">{track.duration}</span>
              <span className="text-purple-400 font-semibold">
                {track.popularity}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-zinc-400">No top tracks available</p>
      )}
    </section>
  )
};