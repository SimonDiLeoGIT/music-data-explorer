import { useEffect, useState } from "react";
import { musicService } from "../../../services/music.service";
import type { PlaylistArtistsFrequencyInterface } from "../../../interfaces/PlaylistInterface";
import { Doughnut } from "react-chartjs-2";
import * as Chart from 'chart.js';
import { generateColors } from "../../../utils/colorsGenerator";
Chart.Chart.register(...Chart.registerables);

interface Props {
  playlistId: string
}

const TopArtists: React.FC<Props> = ({ playlistId }) => {
  
  const [topArtists, setTopArtists] = useState<PlaylistArtistsFrequencyInterface|null>(null);

  const fetchTopArtists = async () => {
    try {
      const data = await musicService.getPlaylistTopArtists(playlistId);
      setTopArtists(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchTopArtists();
  }, [playlistId]);

  const colors = generateColors(topArtists?.artistsFrequency.length || 0);

  const data = {
    labels: topArtists?.artistsFrequency.map((artist) => artist.name),
    datasets: [
      {
        data: topArtists?.artistsFrequency.map((artist) => artist.count),
        backgroundColor: colors.backgroundColor,
        borderColor: colors.borderColor,
        borderWidth: 2,
        hoverBackgroundColor: colors.hoverBackgroundColor,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#e4e4e7',
          font: {
            size: 12,
          },
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            if (!topArtists) return `${label}: ${value} tracks`; // Return early if topArtists
            const percentage = topArtists?.totalArtists > 0 
              ? ((value / topArtists?.totalArtists) * 100).toFixed(1) 
              : 0;
            return `${label}: ${value} tracks (${percentage}%)`;
          }
        }
      },
    },
    cutout: '60%',
  };
  
  return (
    <section className="bg-zinc-800/50 p-4">
      <h2 className="text-zinc-100 text-xl font-semibold mb-6">
        Top 10 Frequent Artists
      </h2>
      <div className="h-40">
        {topArtists && (
          <Doughnut data={data} options={options} />
        )}
      </div>
    </section>
  )
}

export default TopArtists