import { NextPage } from "next";
import { Scatter } from "react-chartjs-2";
import { Datum } from "./common";

export const PTRecordChart: NextPage<{ data: Datum[] }> = ({ data }) => {
  const getTimeNum = (date: Date) => {
    return Number(
      `${date.getFullYear()}${`00${date.getMonth() + 1}`.slice(
        -2
      )}${`00${date.getDate()}`.slice(-2)}${`00${date.getHours()}`.slice(
        -2
      )}${`00${date.getMinutes()}`.slice(-2)}`
    );
  };
  const chartData = {
    labels: ["Scatter"],
    datasets: [
      {
        label: "p-T path",
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 5,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        showLine: true,
        data: data.map((datum) => ({
          x: datum.pressure,
          y: datum.temperature,
        })),
      },
    ],
  };
  const tempChartData = {
    labels: ["Scatter"],
    datasets: [
      {
        label: "temperature",
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 5,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        showLine: true,
        data: data.map((datum) => ({
          x: getTimeNum(new Date(datum.time)),
          y: datum.temperature,
        })),
      },
    ],
  };
  const pressChartData = {
    labels: ["Scatter"],
    datasets: [
      {
        label: "pressure",
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 5,
        pointHoverRadius: 10,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        showLine: true,
        data: data.map((datum) => ({
          x: getTimeNum(new Date(datum.time)),
          y: datum.pressure,
        })),
      },
    ],
  };
  return (
    <>
      <div>
        <Scatter
          data={chartData}
          type=""
          options={{
            scales: {
              x: {
                min: 0,
                // max: 3,
              },
              y: {
                min: 0,
              },
            },
          }}
        ></Scatter>
      </div>
      <div>
        <Scatter
          type=""
          data={tempChartData}
          options={{
            scales: {
              x: {
                ticks: {
                  callback: function (label: number) {
                    return label.toString().replace(/\,/g, "").replace(/(.{4})(.{2})(.{2})(.{2})(.{2})/, "$1/$2/$3 $4:$5");
                  },
                },
              },
              y: {
                min: 0,
              },
            },
          }}
        ></Scatter>
      </div>
      <div>
        <Scatter
          type=""
          data={pressChartData}
          options={{
            scales: {
              x: {
                ticks: {
                  callback: function (label: number) {
                    return label.toString().replace(/\,/g, "").replace(/(.{4})(.{2})(.{2})(.{2})(.{2})/, "$1/$2/$3 $4:$5");
                  },
                },
              },
              y: {
                min: 0,
              },
            },
          }}
        ></Scatter>
      </div>
    </>
  );
};
