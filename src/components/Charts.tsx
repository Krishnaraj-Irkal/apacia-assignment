import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  ChartData,
  ChartOptions,
  registerables,
} from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  zoomPlugin
);


const months = ["January", "February", "March", "April", "May", "June", "July"];

interface BarChartProps {
  horizontal?: boolean;
  data_1: number[];
  data_2: number[];
  title_1: string;
  title_2: string;
  bgColor_1: string;
  bgColor_2: string;
  labels?: string[];
}

export const BarChart = ({
  data_1 = [],
  data_2 = [],
  title_1,
  title_2,
  bgColor_1,
  bgColor_2,
  horizontal = false,
  labels = months,
}: BarChartProps) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Sales done and unites sold for a entire year',
        font: {
          weight: 'bold',
          size: 16,
        },
      },
    },
    animation: {
      duration: 2000, // Animation duration in milliseconds
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
    },
  };

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: title_1,
        data: data_1,
        backgroundColor: bgColor_1,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
      {
        label: title_2,
        data: data_2,
        backgroundColor: bgColor_2,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
    ],
  };

  return <Bar width={horizontal ? "200%" : ""} options={options} data={data} />;
};

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  cutout?: number | string;
  legends?: boolean;
  offset?: number[];
}

export const DoughnutChart = ({
  labels,
  data,
  backgroundColor,
  cutout,
  legends = true,
  offset,
}: DoughnutChartProps) => {
  const doughnutData: ChartData<"doughnut", number[], string> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 0,
        offset,
      },
    ],
  };

  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: legends,
        position: "bottom",
        labels: {
          padding: 40,
        },
      },
    },
    // cutout,
    animation: {
      animateRotate: true, // Enable rotation animation
      animateScale: true, // Enable scale animation
      duration: 2000, // Animation duration in milliseconds
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    elements: {
      arc: {
        hoverOffset: 30, // Set the hover offset to 10 pixels
      },
    },
  };

  return <Doughnut data={doughnutData} options={doughnutOptions} />;
};

interface PieChartProps {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  offset?: number[];
}
export const PieChart = ({
  labels,
  data,
  backgroundColor,
  offset,
}: PieChartProps) => {
  const pieChartData: ChartData<"pie", number[], string> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 1,
        offset,
      },
    ],
  };

  const pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Pie data={pieChartData} options={pieChartOptions} />;
};

interface LineChartProps {
  data: {
    totalSales: number[];
    totalUnits: number[];
  };
  labels: string[];
  borderColor: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  labels,
  borderColor,
}) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        text: 'Sales and Units Over Time',
        font: {
          weight: 'bold',
          size: 16, // You can adjust the size as needed
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
      x: {
        ticks: {
          font: {
            weight: 'bold',
          },
        },
      },
    },
  };

  const lineChartData: ChartData<'line', number[], string> = {
    labels,
    datasets: [
      {
        fill: false,
        label: 'Total Sales',
        data: data.totalSales,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,

      },
      {
        fill: false,
        label: 'Total Units',
        data: data.totalUnits,
        borderColor: 'rgba(192,75,192,1)',
        tension: 0.1,
      },
    ],
  };

  return <Line options={options} data={lineChartData} />;
};