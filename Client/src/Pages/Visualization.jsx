import { useState, useEffect, useRef, useContext } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, PieController, ArcElement } from "chart.js";
import "tailwindcss/tailwind.css";
import { PContext } from "../Context/planContext";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, PieController, ArcElement, Title);

const Visualization = () => {
  const { plan } = useContext(PContext); // Accessing plans from Context
  const [filteredPlans, setFilteredPlans] = useState(plan);
  const [timeframe, setTimeframe] = useState("all");
  const now = new Date();

  // Chart references
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    filterPlans(timeframe);
  }, [timeframe, plan]); // Dependency includes plan from context

  useEffect(() => {
    updateCharts(filteredPlans);
  }, [filteredPlans]);

  const filterPlans = (timeframe) => {
    let startDate;
    switch (timeframe) {
      case "week":
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case "month":
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "year":
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = new Date(0);
    }
    setFilteredPlans(plan.filter((p) => new Date(p.date) >= startDate));
  };

  const updateCharts = (filteredPlans) => {
    const labels = filteredPlans.map((p) => p.title);
    const completionData = filteredPlans.map((p) => {
      const totalTasks = p.tasks.length;
      const completedTasks = p.tasks.filter((task) => task.completed).length;
      return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    });

    // Destroy previous chart instances if they exist
    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }
    if (pieChartRef.current) {
      pieChartRef.current.destroy();
    }

    // Create Line Chart
    const lineCanvas = document.getElementById("planChart");
    if (lineCanvas) {
      lineChartRef.current = new Chart(lineCanvas.getContext("2d"), {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Task Completion (%)",
              data: completionData,
              borderColor: "#4caf50",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: { scales: { y: { beginAtZero: true, max: 100 } } },
      });
    }

    // Create Pie Chart
    let totalTasks = 0,
      completedTasks = 0;
    filteredPlans.forEach((p) => {
      totalTasks += p.tasks.length;
      completedTasks += p.tasks.filter((task) => task.completed).length;
    });

    const pieCanvas = document.getElementById("completionPieChart");
    if (pieCanvas) {
      pieChartRef.current = new Chart(pieCanvas.getContext("2d"), {
        type: "pie",
        data: {
          labels: ["Completed", "Not Completed"],
          datasets: [
            {
              data: [completedTasks, totalTasks - completedTasks],
              backgroundColor: ["#4caf50", "#f44336"],
            },
          ],
        },
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Visualization
      </h1>
      <div className="mb-6 flex items-center">
        <label className="mr-3 text-lg font-semibold text-gray-700">
          Filter by:
        </label>
        <select
          onChange={(e) => setTimeframe(e.target.value)}
          className="border border-gray-400 p-3 rounded-lg shadow-md text-gray-800 focus:outline-none"
        >
          <option value="all">All Time</option>
          <option value="week">One Week</option>
          <option value="month">One Month</option>
          <option value="year">One Year</option>
        </select>
      </div>

      <div className="mb-8 bg-white p-6 rounded-xl shadow-lg">
        <canvas id="planChart" className="w-full h-96"></canvas>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 p-4 bg-white rounded-xl shadow-lg">
          <canvas id="completionPieChart" className="w-full h-80"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Visualization;
