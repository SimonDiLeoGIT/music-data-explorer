import { Doughnut } from "react-chartjs-2";
import * as Chart from 'chart.js';
import type React from "react";

Chart.Chart.register(...Chart.registerables);

interface Props {
  totalTracks: number;
  explicitTracks: number;
}

const ExplicitTracks: React.FC<Props> = ({ totalTracks, explicitTracks }) => {
  const cleanTracks = totalTracks - explicitTracks;
  const explicitPercentage = totalTracks > 0 ? ((explicitTracks / totalTracks) * 100).toFixed(1) : 0;
  const cleanPercentage = totalTracks > 0 ? ((cleanTracks / totalTracks) * 100).toFixed(1) : 0;

  const maxValue = Math.max(explicitTracks, cleanTracks);

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
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
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
    cutout: '65%',
  };

  return (
    <section className="bg-zinc-800/50 p-4 ">
      <h2 className="text-zinc-100 text-2xl font-semibold mb-4 flex items-center gap-2">
        Content Rating
      </h2>
      
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative w-40 h-40 shrink-0">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-3xl font-bold text-zinc-100">{totalTracks}</p>
            <p className="text-xs text-zinc-400">tracks</p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <div className="bg-red-500/10 rounded-lg p-4 border border-red-500/30 hover:border-red-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <p className="text-red-400 text-sm font-semibold uppercase tracking-wide">Explicit</p>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-red-400">{explicitTracks}</p>
              <p className="text-red-400/70 text-lg font-semibold">{explicitPercentage}%</p>
            </div>
            <div className="mt-3 h-2 bg-zinc-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 rounded-full transition-all duration-500"
                style={{ width: `${(explicitTracks / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/30 hover:border-green-500/50 transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <p className="text-green-400 text-sm font-semibold uppercase tracking-wide">Clean</p>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-bold text-green-400">{cleanTracks}</p>
              <p className="text-green-400/70 text-lg font-semibold">{cleanPercentage}%</p>
            </div>
            <div className="mt-3 h-2 bg-zinc-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${(cleanTracks / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExplicitTracks;