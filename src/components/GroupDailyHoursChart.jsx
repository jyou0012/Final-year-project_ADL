"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GroupDailyHoursChart = () => {
  // 模拟数据
  const data = [
    {
      name: 'Xinrun Wu',
      dailyHours: {
        Monday: 2,
        Tuesday: 3,
        Wednesday: 1,
        Thursday: 4,
        Friday: 3,
      },
    },
    {
      name: 'Bofan Wang',
      dailyHours: {
        Monday: 3,
        Tuesday: 4,
        Wednesday: 2,
        Thursday: 5,
        Friday: 4,
      },
    },
    {
      name: 'Jiayu',
      dailyHours: {
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 2,
      },
    },
    {
      name: 'Shiyao',
      dailyHours: {
        Monday: 5,
        Tuesday: 2,
        Wednesday: 1,
        Thursday: 6,
        Friday: 1,
      },
    },
    {
      name: 'Jojo',
      dailyHours: {
        Monday: 2,
        Tuesday: 6,
        Wednesday: 2,
        Thursday: 1,
        Friday: 7,
      },
    },
  ];

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const datasets = data.map((student, index) => {
    const dailyHours = weekdays.map(day => student.dailyHours[day]);
    return {
      label: student.name,
      data: dailyHours,
      borderColor: `hsl(${index * 60}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.4)`,
      fill: false,
    };
  });

  const chartData = {
    labels: weekdays,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Hours Spent by Students',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '600px', height: '400px', margin: '20px auto' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default GroupDailyHoursChart;
