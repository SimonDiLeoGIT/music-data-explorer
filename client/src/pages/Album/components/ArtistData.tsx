import type { ArtisInterface } from "../../../interfaces/ArtistInterface"

interface Props {
  artist: ArtisInterface
}

const ArtistData: React.FC<Props> = ({artist}) => {
  return (
    <section className="bg-zinc-700 p-2 text-sm">
      <img src={artist.image} alt={artist.name + 's image '} className="w-8 h-8 rounded-full float-left mr-2"/>
      <p className="">
        <span className="font-semibold">{artist.name}: </span>
        {artist.bio}
      </p>
    </section>
  )
}

export default ArtistData