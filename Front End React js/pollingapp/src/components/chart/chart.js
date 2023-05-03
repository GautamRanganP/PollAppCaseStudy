import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['John', "Max"];

  const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [12,40],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function ChartPoll(props) {
  return <Bar options={options} data={data} style={{width:"600px",height:"600px"}}/>;
}
