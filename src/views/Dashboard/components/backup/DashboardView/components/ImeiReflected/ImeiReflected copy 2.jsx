import React from "react";

import DashboardContext from "context/DashboardContext";

import { AppTableToolbar, TableContainer } from "components";
// import { AppChart } from "components";
import {
  Chart,
  DoughnutController,
  Tooltip,
  ArcElement,
  CategoryScale,
} from "chart.js";
import { Box, Grid } from "@material-ui/core";

const ImeiReflected = (props) => {
  const { data } = props;

  const chartRef = React.createRef();
  Chart.register(ArcElement, CategoryScale, Tooltip, DoughnutController);
  function dynamicColors() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return `rgb(${r},${g},${b})`;
  }

  React.useEffect(() => {
    if (data) {
      const myChartRef = chartRef.current.getContext("2d");

      let count = [];
      let imei = [];
      let number = [];
      let color = [];
      data.map((value) => {
        count.push(value.count);
        imei.push(value.AImei);
        number.push(value.ANumber);
        color.push(dynamicColors());
      });
      const dataChart = {
        // labels: imei,
        datasets: [
          {
            title: imei,
            label: "Imei",
            data: count,
            backgroundColor: color,
            hoverOffset: 4,
          },
        ],
      };
      const options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          tooltip: {
            enabled: false,

            external: function (context) {
              // Tooltip Element
              var tooltipEl = document.getElementById("chartjs-tooltip");

              // Create element on first render
              if (!tooltipEl) {
                tooltipEl = document.createElement("div");
                tooltipEl.id = "chartjs-tooltip";
                tooltipEl.innerHTML = "<table></table>";
                document.body.appendChild(tooltipEl);
              }

              // Hide if no tooltip
              var tooltipModel = context.tooltip;
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              // Set caret Position
              tooltipEl.classList.remove("above", "below", "no-transform");
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add("no-transform");
              }

              function getBody(bodyItem) {
                return bodyItem.lines;
              }

              // Set Text
              if (tooltipModel.body) {
                var titleLines = tooltipModel.title || [];
                var bodyLines = tooltipModel.body.map(getBody);

                var innerHtml = "<thead>";

                titleLines.forEach(function (title) {
                  innerHtml += "<tr><th>" + title + "</th></tr>";
                });
                innerHtml += "</thead><tbody>";

                bodyLines.forEach(function (body, i) {
                  var colors = tooltipModel.labelColors[i];
                  var style = "background:" + "#212121";
                  style += "; border-color:" + colors.borderColor;
                  style += "; border-width: 2px";
                  var span = '<span style="' + style + '"></span>';
                  innerHtml += "<tr><td>" + span + body + "</td></tr>";
                });
                innerHtml += "</tbody>";

                var tableRoot = tooltipEl.querySelector("table");
                tableRoot.innerHTML = innerHtml;
              }

              var position = context.chart.canvas.getBoundingClientRect();
              // var bodyFont = Chart.helpers.toFont(
              //   tooltipModel.options.bodyFont
              // );

              // Display, position, and set styles for font
              tooltipEl.style.opacity = 1;
              tooltipEl.style.position = "absolute";
              tooltipEl.style.left =
                position.left + window.pageXOffset + tooltipModel.caretX + "px";
              tooltipEl.style.top =
                position.top + window.pageYOffset + tooltipModel.caretY + "px";
              // tooltipEl.style.font = bodyFont.string;
              tooltipEl.style.padding =
                tooltipModel.padding + "px " + tooltipModel.padding + "px";
              tooltipEl.style.pointerEvents = "none";
            },
          },
        },
      };

      new Chart(myChartRef, {
        type: "doughnut",
        data: dataChart,
        options: options,
      });
    }
  }, [data]);
  // console.log(datas);
  return (
    <TableContainer>
      <Box maxHeight="230px">
        <AppTableToolbar title="IMEI Reflected" />
        <Grid container spacing={2}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <Box>
              {/* {data.length ? data.length : 0} */}
              Imei number used.
            </Box>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
            <div>
              <canvas ref={chartRef} width="100" height="100" />
            </div>
          </Grid>
        </Grid>
      </Box>
    </TableContainer>
  );
};

export default ImeiReflected;
