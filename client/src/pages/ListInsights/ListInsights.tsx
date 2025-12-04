import { useEffect, useState } from "react";
import { getAlbumInsights } from "../../services/music.service";


function ListInsights() {

  const [insights, setInsights] = useState(null);

  const fetchData = async () => {
    const data =  await getAlbumInsights();
    setInsights(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return( 
    <main>
      <h1 className="text-2xl font-bold mb-4">Album Insights</h1>
      <section>
        {insights && (
          <div>
            {insights.name}
          </div>
        )}
      </section>
    </main>
  )
}

export default ListInsights;