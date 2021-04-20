import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";

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
      // backgroundColor: "#000000",
    },
  },
  labelIcon: {
    minHeight: 0,
    backgroundColor: "#20A8D8",
    color: "#FFFFFF",
    padding: "5px 7px",
    marginRight: "5px",
    borderRadius: "20px",
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
}));

function TabsView(props) {
  const classes = useStyles();
  const { data } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
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
          {data.map((value) => (
            <Tab
              label={value.label}
              icon={value.icon}
              key={value.index}
              {...a11yProps(0)}
              classes={{
                wrapper: classes.wrapper,
                labelIcon: classes.labelIcon,
                selected: classes.selected,
              }}
            />
          ))}
        </Tabs>
      </AppBar>
      {data.map((values, index) => (
        <TabPanel value={value} index={index} key={value.index}>
          {values.component}
        </TabPanel>
      ))}
    </div>
  );
}

export default TabsView;
