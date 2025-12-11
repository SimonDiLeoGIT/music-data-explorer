import { Link } from "react-router-dom"
import type { AlbumInterface } from "../../../interfaces/ArtistInterface"

interface Props {
  albums: AlbumInterface[]
}

export const Albums: React.FC<Props> = ({albums}) => {
  return (
    <section>
      <h2 className="text-3xl text-zinc-100 font-bold mb-4">
        Albums{" "}
        <span className="text-zinc-400/70 text-xs">Discography</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 min-w-[250px]">
        {albums?.map((album) => (
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
  )
} 