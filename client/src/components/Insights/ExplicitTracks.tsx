import { Doughnut } from "react-chartjs-2";
import * as Chart from 'chart.js';
import type React from "react";

Chart.Chart.register(...Chart.registerables);

interface Props {
  totalTracks: number
  explicitTracks: number
}

const ExplicitTracks: React.FC<Props> = ({totalTracks, explicitTracks}) => {
  const cleanTracks = totalTracks - explicitTracks;
  const explicitPercentage = totalTracks > 0 ? ((explicitTracks / totalTracks) * 100).toFixed(1) : 0;
  const cleanPercentage = totalTracks > 0 ? ((cleanTracks / totalTracks) * 100).toFixed(1) : 0;

  const data = {
    labels: ['Explicit', 'Clean'],
    datasets: [
      {
        data: [explicitTracks, cleanTracks],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(34, 197, 94, 0.8)', 
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(34, 197, 94, 1)',
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(34, 197, 94, 1)',
        ],
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
        backgroundColor: 'rgba(24, 24, 27, 0.95)',
        titleColor: '#e4e4e7',
        bodyColor: '#e4e4e7',
        borderColor: 'rgba(63, 63, 70, 0.5)',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = totalTracks > 0 
              ? ((value / totalTracks) * 100).toFixed(1) 
              : 0;
            return `${label}: ${value} tracks (${percentage}%)`;
          }
        }
      },
    },
    cutout: '60%',
  };

  return (
    <section className="bg-zinc-800/50 p-4 rounded">
      <h2 className="text-zinc-100 text-xl font-semibold mb-6">
        Explicit Tracks
      </h2>
      <div className="flex flex-col gap-4">
        {/* Chart */}
        <div className="min-h-[250px] max-h-[250px]">
          <Doughnut data={data} options={options} />
        </div>
        
        {/* Stats debajo del chart */}
        <div className="grid grid-cols-2 justify-center gap-4 mt-4">
          <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/30">
            <p className="text-red-400 text-xs font-semibold mb-1">Explicit</p>
            <p className="text-2xl font-bold text-red-400">{explicitTracks}</p>
            <p className="text-red-400/70 text-xs mt-1">{explicitPercentage}%</p>
          </div>
          
          <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
            <p className="text-green-400 text-xs font-semibold mb-1">Clean</p>
            <p className="text-2xl font-bold text-green-400">{cleanTracks}</p>
            <p className="text-green-400/70 text-xs mt-1">{cleanPercentage}%</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExplicitTracks;