import { useState, useEffect, useRef, useContext } from "react";
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, PieController, ArcElement } from "chart.js";
import "tailwindcss/tailwind.css";
import { PContext } from "../Context/planContext";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, PieController, ArcElement, Title);

// Add this new component just before the main Visualization component
const ContributionChart = ({ plans }) => {
  const createContributionData = () => {
    const contributionData = {};
    plans.forEach(plan => {
      const planDate = new Date(plan.date);
      if (planDate.getFullYear() === new Date().getFullYear()) {
        const dateString = planDate.toDateString();
        const completedTasks = plan.tasks.filter(task => task.completed).length;
        contributionData[dateString] = (contributionData[dateString] || 0) + completedTasks;
      }
    });
    return contributionData;
  };

  const renderContributionChart = () => {
    const contributionData = createContributionData();
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const days = Array.from({ length: 365 }, (_, i) => {
      const date = new Date(startOfYear);
      date.setDate(startOfYear.getDate() + i);
      return date;
    });

    const getColor = (completed) => {
      if (completed >= 7) return '#196127';
      if (completed >= 5) return '#239a3b';
      if (completed >= 1) return '#7bc96f';
      return '#ebedf0';
    };

    return (
      <div className="w-full">
        <div className="text-center font-bold text-lg mb-4 text-gray-700">
          {currentYear} Contribution Graph
        </div>
        <div className="flex flex-wrap gap-1 justify-center">
          {days.map((date, index) => {
            const completed = contributionData[date.toDateString()] || 0;
            return (
              <div
                key={index}
                className="rounded-sm transition-all hover:scale-105 hover:shadow-md"
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: getColor(completed),
                  margin: '1px',
                }}
                title={`${date.toLocaleDateString()}: ${completed} tasks completed`}
              />
            );
          })}
        </div>
        <div className="mt-6 flex justify-center gap-4 text-sm text-gray-600">
          <div>
            <span className="inline-block w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: '#196127' }}></span>
            7+ tasks
          </div>
          <div>
            <span className="inline-block w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: '#239a3b' }}></span>
            5-6 tasks
          </div>
          <div>
            <span className="inline-block w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: '#7bc96f' }}></span>
            1-4 tasks
          </div>
          <div>
            <span className="inline-block w-4 h-4 rounded-sm mr-2" style={{ backgroundColor: '#ebedf0' }}></span>
            0 tasks
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      {renderContributionChart()}
    </div>
  );
};

const Visualization = () => {
  const { plan } = useContext(PContext); // Accessing plans from Context
  const [filteredPlans, setFilteredPlans] = useState(plan);
  const [timeframe, setTimeframe] = useState("all");
  const now = new Date();

  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    filterPlans(timeframe);
  }, [timeframe, plan]); 

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

    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }
    if (pieChartRef.current) {
      pieChartRef.current.destroy();
    }

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
      
      {/* Filter Controls */}
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

      {/* Grid Layout for Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Task Completion Timeline</h2>
          <canvas id="planChart" className="w-full h-80"></canvas>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Overall Completion</h2>
          <canvas id="completionPieChart" className="w-full h-80"></canvas>
        </div>

        {/* Contribution Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Yearly Contributions</h2>
          <ContributionChart plans={filteredPlans} />
        </div>
      </div>
    </div>
  );
};

export default Visualization;
