import React from "react";
import { TableContainer, AppTableToolbar } from "components";
import ReactWordcloud from "react-wordcloud";
import DashboardContext from "context/DashboardContext";
import { select } from "d3-selection";
import { Box } from "@material-ui/core";

// function getCallback(callback) {
//   return function (word, event) {
//     const isActive = callback !== "onWordMouseOut";
//     const element = event.target;
//     const text = select(element);
//     text
//       .on("click", () => {
//         if (isActive) {
//           window.open(`https://duckduckgo.com/?q=${word.text}`, "_blank");
//         }
//       })
//       .transition()
//       .attr("background", "white")
//       .attr("font-size", isActive ? "300%" : "100%")
//       .attr("text-decoration", isActive ? "underline" : "none");
//   };
// }

const TopCalls = (props) => {
  const { data } = props;
  let word = [
    {
      text: "told",
      value: 64,
    },
  ];

  const size = [600, 400];
  // const callbacks = {
  //   // getWordColor: (word) => (word.value > 50 ? "orange" : "purple"),
  //   getWordTooltip: (word) =>
  //     `The Phone number : "${word.text}" have ${word.value} total calls.`,
  //   onWordClick: getCallback("onWordClick"),
  //   onWordMouseOut: getCallback("onWordMouseOut"),
  //   onWordMouseOver: getCallback("onWordMouseOver"),
  // };
  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    rotations: 0,
    enableTooltip: true,
    rotationAngles: [0, 0],
    fontSizes: [24, 24],
    spiral: "archimedean",
    // deterministic: false,
  };

  // React.useEffect(() => {
  //   if (data) {
  //     data.map((value) => {
  //       word.push({ text: value.BNumber, value: value.totalCall });
  //     });
  //   }
  // }, [data]);

  return (
    <TableContainer>
      <AppTableToolbar title="Top Calls" />
      <Box position="relative">
        <Box position="absolute" top={0} left={0} right={0} border={0}>
          <ReactWordcloud
            words={word}
            // options={options}
            // callbacks={callbacks}
          />
        </Box>
      </Box>
    </TableContainer>
  );
};

export default TopCalls;
