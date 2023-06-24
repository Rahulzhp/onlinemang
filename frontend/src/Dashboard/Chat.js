import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./Chat.css";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BarChart = () => {
  // State variables
  const [projectData, setProjectData] = useState(null);
  // Custom media query for mobile devices
  const [isMobile, setIsMobile] = useState(false);

  // Fetch data from the backend
  useEffect(() => {
    axios
      .get("https://light-bat-gown.cyclic.app/project/dashboard")
      .then((res) => {
        setProjectData(res.data)
        console.log(res.data)
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Set initial state

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Check if data is available before rendering the chart
  if (!projectData) {
    return <div>Loading...</div>;
  }
  const str = Math.floor((projectData.Total_STR_Closed / projectData.Total_STR) * 100 || 0)
  const fin = Math.floor((projectData.Total_FIN_Closed / projectData.Total_FIN) * 100 || 0)
  const qlt = Math.floor((projectData.Total_QLT_Closed / projectData.Total_QLT) * 100 || 0)
  const man = Math.floor((projectData.Total_MAN_Closed / projectData.Total_MAN) * 100 || 0)
  const sto = Math.floor((projectData.Total_STO_Closed / projectData.Total_STO) * 100 || 0)
  const hr = Math.floor((projectData.Total_HR_Closed / projectData.Total_HR) * 100 || 0)

  // Prepare the chart data
  const chartData = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [[`${str}%`, "STR"], [`${fin}%`, "FIN"], [`${qlt}%`, "QLT"], [`${man}%`, "MAN"], [`${sto}%`, "STO"], [`${hr}%`, "HR"]],
      },
      plotOptions: {
        bar: {
          columnWidth: "40%", // Set the desired width for bars
          borderRadius: 3, // Set the desired border radius for bars
          barHeight: "50%", // Set the desired height for bars (80% of available space)
        },
      },
    },
    series: [
      {
        name: "Total",
        data: [
          projectData.Total_STR,
          projectData.Total_FIN,
          projectData.Total_QLT,
          projectData.Total_MAN,
          projectData.Total_STO,
          projectData.Total_HR,
        ],
        color: "#044F94", // Blue color for the "Total" series
      },
      {
        name: "Closed",
        data: [
          projectData.Total_STR_Closed,
          projectData.Total_FIN_Closed,
          projectData.Total_QLT_Closed,
          projectData.Total_MAN_Closed,
          projectData.Total_STO_Closed,
          projectData.Total_HR_Closed,
        ],
        color: "#1bad0a", // Green color for the "Closed" series
      },
    ],
  };
  // Inside the BarChart component
  const settings = {
    dots: false, // Show navigation dots
    infinite: true, // Enable infinite scrolling
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 2.5, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    arrows: false, // Hide navigation arrows
    autoplay: true, // Auto play slides
    autoplaySpeed: 5000, // Delay between slides in milliseconds
    adaptiveHeight: true // Adjust slide height based on content
  };

  return (
    <div className="Project_parent" style={{ padding: "15px" }}>
      {/* Display other project data */}
      {isMobile ? (
        <Slider {...settings}>
          <div className="project">
            <div className="Total-pro">
              <h4>Total-Project</h4>
              <h1>{projectData && projectData.Total}</h1>
            </div>
          </div>
          <div className="project">
            <div className="closed">
              <h4>Closed</h4>
              <h1>{projectData && projectData.Closed}</h1>
            </div>
          </div>
          <div className="project">
            <div className="running">
              <h4>Running</h4>
              <h1>{projectData && projectData.Running}</h1>
            </div>
          </div>
          <div className="project">
            <div className="closure">
              <h4>Closure Delay</h4>
              <h1>{projectData && projectData.closureDelay}</h1>
            </div>
          </div>
          <div className="project">
            <div className="cancelled">
              <h4>Cancelled</h4>
              <h1>{projectData && projectData.Canceled}</h1>
            </div>
          </div>
        </Slider>
      ) : (
        <div className="project">
          <div className="Total-pro">
            <h4>Total-Project</h4>
            <h1>{projectData && projectData.Total}</h1>
          </div>
          <div className="closed">
            <h4>Closed</h4>
            <h1>{projectData && projectData.Closed}</h1>
          </div>
          <div className="running">
            <h4>Running</h4>
            <h1>{projectData && projectData.Running}</h1>
          </div>
          <div className="closure">
            <h4>Closure Delay</h4>
            <h1>{projectData && projectData.closureDelay}</h1>
          </div>
          <div className="cancelled">
            <h4>Cancelled</h4>
            <h1>{projectData && projectData.Canceled}</h1>
          </div>
        </div>
      )}

      <p>Department wise - Total Vs Closed</p>
      {/* Render the chart */}
      <div className="chart-container">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          width={isMobile ? "100%" : "79%"}
          className="chart-card"
        />
      </div>
    </div>
  );
};

export default BarChart;
