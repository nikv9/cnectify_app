import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { getPostsAction } from "../../redux/post_store";
import { useDispatch, useSelector } from "react-redux";

Chart.register(...registerables);

const Dashboard = () => {
  const post = useSelector((state) => state.post);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsAction());
  }, [dispatch]);

  useEffect(() => {
    if (post.posts && post.posts.length > 0) {
      const mediaTypeCounts = post.posts.reduce((acc, post) => {
        const { mediaType } = post;
        acc[mediaType] = (acc[mediaType] || 0) + 1;
        return acc;
      }, {});

      const labels = Object.keys(mediaTypeCounts);
      const data = Object.values(mediaTypeCounts);

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstanceRef.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels,
          datasets: [
            {
              label: "Media Type Distribution",
              data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const total = data.reduce((sum, value) => sum + value, 0);
                  const value = data[tooltipItem.dataIndex];
                  const percentage = ((value / total) * 100).toFixed(2);
                  return `${
                    labels[tooltipItem.dataIndex]
                  }: ${value} (${percentage}%)`;
                },
              },
            },
          },
        },
      });
    }
  }, [post]);

  return (
    <div className="flex-[4]">
      <div className="flex">
        <div className="p-10">
          <canvas ref={chartRef} width="500"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
