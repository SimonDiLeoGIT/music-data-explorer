import { useEffect, useState } from "react";
import { musicService } from "../../services/music.service";
import { useParams, Link } from "react-router-dom";
import { PlaylistHeaderSkeleton } from "../../components/Skeleton/PlaylistSkeleton";
import { formatNumber, formatNumberWithCommas } from "../../utils/formatNumbers";
import AlbumSkeleton from "../../components/Skeleton/AlbumReleasesSkeleton";
import type { ArtistInterface } from "../../interfaces/ArtistInterface";
import { HtmlRenderer } from "../../components/HtmlRenderer";


const Artist = () => {
  const { id } = useParams();

  const [artist, setArtist] = useState<ArtistInterface | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchArtistData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await musicService.getArtistData(id);
      setArtist(data);
    } catch (error) {
      console.error("Error fetching artist data:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchArtistData();
  }, [id]);

  return (
    <main className="p-8 py-4 w-11/12 max-w-[1600px] mx-auto">
      {/* Header */}
      {loading || !artist ? (
        <PlaylistHeaderSkeleton />
      ) : (
        <header className="bg-zinc-800 p-4 rounded-md relative overflow-hidden mb-6">
          {artist?.image && (
            <div
              className="absolute inset-0 bg-cover bg-center blur-xl brightness-40 scale-110"
              style={{ backgroundImage: `url(${artist?.image})` }}
            />
          )}
          <section className="flex relative z-10">
            <img
              src={artist?.image}
              alt={artist?.name}
              className="w-64 h-64 rounded-full object-cover"
            />
            <div className="m-auto mb-0 ml-4 text-zinc-100 font-semibold flex flex-col gap-2">
              <p className="text-sm">Artist</p>
              <p className="text-5xl">{artist?.name}</p>
              <div className="flex gap-2 flex-wrap">
                {artist?.genres?.slice(0, 3).map((genre) => (
                  <span
                    key={genre}
                    className="text-xs bg-purple-500/30 px-3 py-1 rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-sm text-zinc-400">
                Popularity: {artist?.popularity}/100
              </p>
            </div>
          </section>
          <section className="absolute bottom-0 right-0 p-4 grid grid-cols-2 gap-4 z-50">
            <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-1 shadow-md hover:cursor-default">
              <h2 className="text-lg font-semibold text-center">Listeners</h2>
              {artist?.listeners ? (
                <p
                  className="font-semibold text-2xl text-purple-400 m-auto text-center"
                  title={formatNumberWithCommas(artist?.listeners)}
                >
                  {formatNumber(artist?.listeners)}
                </p>
              ) : (
                <p className="text-zinc-400 text-center">N/A</p>
              )}
            </article>
            <article className="bg-zinc-700/50 p-4 rounded-md flex flex-col gap-1 place-content-center shadow-md hover:cursor-default">
              <h2 className="text-lg font-semibold text-center">Plays</h2>
              {artist?.playcount ? (
                <p
                  className="font-semibold text-2xl text-purple-400 m-auto text-center"
                  title={formatNumberWithCommas(artist?.playcount)}
                >
                  {formatNumber(artist?.playcount)}
                </p>
              ) : (
                <p className="text-zinc-400 text-center">N/A</p>
              )}
            </article>
          </section>
        </header>
      )}

      {/* Bio */}
      {artist?.bio && (
        <section className="bg-zinc-800/50 p-6 rounded-md mb-6">
          <h2 className="text-2xl text-zinc-100 font-semibold mb-4">Biography</h2>
          <HtmlRenderer text={artist?.bio} />
        </section>
      )}

      {/* Top Tracks */}
      <section className="bg-zinc-800/50 p-6 rounded-md mb-6">
        <h2 className="text-2xl text-zinc-100 font-semibold mb-4">
          Top Tracks
        </h2>
        {artist?.topTracks && artist.topTracks.length > 0 ? (
          <div className="space-y-2">
            {artist.topTracks.slice(0, 10).map((track, index) => (
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

      {/* Albums */}
      <section>
        <h2 className="text-3xl text-zinc-100 font-bold mb-4">
          Albums{" "}
          <span className="text-zinc-400/70 text-xs">Discography</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <AlbumSkeleton key={index} />
              ))
            : artist?.albums?.map((album) => (
                <div
                  key={album.id}
                  className="bg-zinc-800 rounded-md overflow-hidden hover:scale-105 transition-transform duration-200"
                >
                  <Link to={`/albums/${album.id}`}>
                    <img
                      src={album.cover}
                      alt={album.name}
                      className="w-full h-auto"
                    />
                  </Link>
                  <div className="p-2">
                    <h3
                      className="text-lg text-zinc-100 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                      title={album.name}
                    >
                      {album.name}
                    </h3>
                    <p
                      className="text-sm text-zinc-400 whitespace-nowrap overflow-hidden text-ellipsis"
                      title={album.releaseDate}
                    >
                      {album.releaseDate}
                    </p>
                    <p className="text-sm text-zinc-400">
                      {album.totalTracks} tracks
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </section>
    </main>
  );
};

export default Artist;