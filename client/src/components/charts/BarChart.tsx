import { Bar } from "react-chartjs-2";
import * as Chart from 'chart.js';
import type React from "react";

Chart.Chart.register(...Chart.registerables);

interface Props {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
      borderRadius: number;
      barPercentage: number;
      categoryPercentage: number;
    }[];
    xTitle: string;
    yTitle: string;
  }
  horizontal: boolean
  onClick: (label: string) => void
}

const BarChart: React.FC<Props> = ({data, onClick, horizontal = false}) => {
  return (
    <Bar
      data={{
        labels: data.labels,
        datasets: [
          {
              label: data.datasets[0].label,
              data: data.datasets[0].data,
              backgroundColor: 'rgba(220, 30, 220, 0.3)',
              borderColor: 'rgba(220, 30, 220, 1)',
              borderWidth: 1,
              borderRadius: 2,
              barPercentage: 0.9,
              categoryPercentage: 1.0,
            },
          ],
        }}
        options={{
          onClick: (_event, elements) => {
            if (elements.length > 0) {
              const index = elements[0].index;
              onClick(data.labels[index]);
            }
          },
          indexAxis: horizontal ? 'y' : 'x',
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: data.yTitle,
                color: 'rgb(244, 244, 245)',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              },
              ticks: {
                color: 'rgb(212, 212, 216)'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            x: {
              title: {
                display: true,
                text: data.xTitle,
                color: 'rgb(244, 244, 245)',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              },
              ticks: {
                color: 'rgb(212, 212, 216)'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            }
          }
        }}
      />
  );
};

export default BarChart;