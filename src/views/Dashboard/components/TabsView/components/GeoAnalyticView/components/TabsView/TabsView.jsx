import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import DonutLargeOutlinedIcon from "@material-ui/icons/DonutLargeOutlined";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import WhereToVoteIcon from "@material-ui/icons/WhereToVote";
import Brightness6Icon from "@material-ui/icons/Brightness6";
import { DayNightCall, Movement, FrequentVisit } from "./components";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // padding: "10px",
    [`& svg`]: {
      width: "20px",
      height: "20px",
    },
  },
  labelIcon: {
    minHeight: 0,
    backgroundColor: "#20A8D8",
    color: "#FFFFFF",
    fontSize: "11px",
    padding: "5px 7px",
    marginRight: "5px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    display: "none",
  },
  scrollable: {
    display: "flex",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#2076D8",
  },
  appBar: {
    boxShadow: "none",
    borderBottom: "1px solid #e0e0e0",
  },
}));

function TabsView(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="secondary"
          aria-label="scrollable force tabs example"
          classes={{
            indicator: classes.indicator,
            scrollable: classes.scrollable,
          }}
        >
          <Tab
            label="Frequent Visit"
            icon={<WhereToVoteIcon />}
            {...a11yProps(0)}
            classes={{
              wrapper: classes.wrapper,
              labelIcon: classes.labelIcon,
              selected: classes.selected,
            }}
          />
          <Tab
            label="Movement"
            icon={<TransferWithinAStationIcon />}
            {...a11yProps(0)}
            classes={{
              wrapper: classes.wrapper,
              labelIcon: classes.labelIcon,
              selected: classes.selected,
            }}
          />
          <Tab
            label="Day Night Calls"
            icon={<Brightness6Icon />}
            {...a11yProps(0)}
            classes={{
              wrapper: classes.wrapper,
              labelIcon: classes.labelIcon,
              selected: classes.selected,
            }}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <FrequentVisit />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Movement />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DayNightCall />
      </TabPanel>
    </div>
  );
}

export default TabsView;
