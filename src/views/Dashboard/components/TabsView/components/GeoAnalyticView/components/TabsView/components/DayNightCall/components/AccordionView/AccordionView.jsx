import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@material-ui/core";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { Detail, TopCall } from "./components";

const useStyles = makeStyles((theme) => ({
  expanded: {
    margin: 0,
  },
  expandedSummary: {
    borderBottom: "1px solid #C8CED3",
  },
}));

const AccordionView = ({ data }) => {
  const classes = useStyles();
  const [expandedTop, setExpandedTop] = React.useState("panel1");
  const [expandedDetail, setExpandedDetail] = React.useState("panel2");

  const handleChangeTop = (panel) => (event, newExpanded) => {
    setExpandedTop(newExpanded ? panel : false);
  };
  const handleChangeDetail = (panel) => (event, newExpanded) => {
    setExpandedDetail(newExpanded ? panel : false);
  };
  return (
    <React.Fragment>
      <Accordion
        square
        expanded={expandedTop === "panel1"}
        onChange={handleChangeTop("panel1")}
        className={classes.expanded}
        classes={{ expanded: classes.expanded, root: classes.expanded }}
      >
        <AccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
          classes={{ root: classes.expandedSummary }}
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography>Top 10 Cell Site</Typography>
            {expandedTop ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <TopCall data={data} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        className={classes.expanded}
        expanded={expandedDetail === "panel2"}
        onChange={handleChangeDetail("panel2")}
        classes={{ expanded: classes.expanded }}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography>Details</Typography>
            {expandedTop ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Detail />
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  );
};

export default AccordionView;
