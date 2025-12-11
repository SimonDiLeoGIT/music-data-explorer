import { Link } from "react-router-dom"
import BarChart from "../../../components/charts/BarChart"
import { FaExternalLinkAlt } from "react-icons/fa"
import type { TopGenreTagInterface } from "../../../interfaces/GenderInterface"

interface Props {
  top: TopGenreTagInterface[],
  title: string,
  currentGenre: string
}


const GenreTopSection: React.FC<Props> = ({ top, title, currentGenre }) => {

  return (
    <div className="bg-zinc-800/50 p-6 rounded-lg my-6">
      <h3 className="text-zinc-100 text-xl font-bold mb-4">
        Top {title} <span className="text-purple-400 text-base font-semibold">· {currentGenre}</span>
      </h3>

      {
        top.length === 0 ? (
          <p className="text-zinc-400 text-sm">No data available</p>
        )
        :
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lista Top 5 */}
          <div>
            <ul className="space-y-2">
              {top.map((item, index) => (
                <li 
                  key={item?.name || `empty-${index}`} 
                  className="flex gap-3 items-center bg-zinc-800 p-4 rounded-md hover:bg-zinc-700 transition-colors"
                >
                  <span className="text-purple-400 font-bold text-lg w-6">#{index + 1}</span>
                  {item ? (
                    <>
                      <div className="flex-1 min-w-0">
                        <p className="text-zinc-200 truncate">{item.name}</p>
                        {item.artist && (
                          <p className="text-zinc-400 text-sm truncate">{item.artist.name}</p>
                        )}
                      </div>
                      <Link
                        to={item.apiUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="m-auto mr-0 justify-self-end hover:cursor-pointer"
                      >
                        <FaExternalLinkAlt className="text-zinc-400 hover:text-zinc-100 transition-colors duration-300" />
                      </Link>
                    </>
                  ) : (
                    <p className="text-zinc-600">-</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Gráfico */}
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h4 className="text-zinc-300 text-sm font-semibold mb-4">Listeners Distribution</h4>
            <div className="h-[400px]">
              <BarChart
                data={{
                  labels: top.map((tag) => 
                    tag.name.length > 20 ? tag.name.substring(0, 10) + '...' : tag.name
                  ),
                  datasets: [
                    {
                      label: 'Listeners by ' + title,
                      data: top.map((tag) => tag.stats.listeners),
                      backgroundColor: 'rgba(220, 30, 220, 0.3)',
                      borderColor: 'rgba(220, 30, 220, 1)',
                      borderWidth: 1,
                      borderRadius: 2,
                      barPercentage: 0.9,
                      categoryPercentage: 1.0,
                    }
                  ],
                  xTitle: title,
                  yTitle: 'Listeners',
                }}
                horizontal={false}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default GenreTopSection