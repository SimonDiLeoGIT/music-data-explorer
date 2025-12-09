import { HtmlRenderer } from "../../../components/HtmlRenderer"
import type { ArtistCompactInterface } from "../../../interfaces/ArtistInterface"
import { formatNumber, formatNumberWithCommas } from "../../../utils/formatNumbers"

interface Props {
  artist: ArtistCompactInterface
}

const ArtistData: React.FC<Props> = ({artist}) => {

  return (
    <section className="bg-zinc-700 p-2 text-sm flex gap-2">
      <div className="w-10/12">
        <div className="flex items-center">
          <img src={artist.image} alt={artist.name + 's image '} className="w-8 h-8 rounded-full float-left mr-2"/>
          <span className="font-semibold">{artist.name}</span>
        </div>
        <HtmlRenderer text={artist.bio} />
      </div>
      <div className="grid grid-cols-2 gap-2 m-auto p-2">
        <article className="bg-zinc-900/50 p-4 rounded-md flex flex-col shadow-md hover:cursor-default">
          <h2 className="font-semibold text-center">Listeners</h2>
          {
            artist.listeners === null
            ?
            <p className="font-semibold m-auto text-center">-</p>
            :
            <p className="font-semibold m-auto text-center" title={formatNumberWithCommas(artist.listeners)}>
              {formatNumber(artist.listeners)}
            </p>
          }
        </article>
        <article className="bg-zinc-900/50 p-4 rounded-md flex flex-col gap-1 shadow-md hover:cursor-default">
          <h2 className="font-semibold text-center">Plays</h2>
          {
            artist.playcount === null
            ?
            <p className="font-semibold m-auto text-center">-</p>
            :
            <p className="font-semibold m-auto text-center" title={formatNumberWithCommas(artist.playcount)}>
              {formatNumber(artist.playcount)}
            </p>
          }
        </article>
      </div>
    </section>
  )
}

export default ArtistData