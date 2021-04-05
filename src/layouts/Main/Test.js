import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SettingsIcon from "@material-ui/icons/Settings";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import FindReplaceIcon from "@material-ui/icons/FindReplace";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DescriptionIcon from "@material-ui/icons/Description";
import TuneIcon from "@material-ui/icons/Tune";
import HistoryIcon from "@material-ui/icons/History";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Topbar } from "./components";
import { Sidebar, SidebarMobile } from "./components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import contextButton from "context/ButtonNavMainContext";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: "#2E343A",
    marginTop: "65px",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#2E343A",
    marginTop: "65px",
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#3A4248",
    // padding: theme.spacing(0, 1),
    // // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
  },
  toolbarOpen: {
    justifyContent: "flex-end",
    // padding: theme.spacing(0, 1),
    // // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
  },
  toolbarClose: {
    justifyContent: "center",
    // padding: theme.spacing(0, 1),
    // // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
  },
  content: {
    // flexGrow: 1,
    paddingTop: "70px",
    padding: theme.spacing(3),
    height: "100%",
  },
  show: {
    display: "flex",
  },
  divider: {
    backgroundColor: "#3A4248",
  },
  text: {
    color: "#ffffff",
  },
  main: {
    overflow: "hidden",
    position: "sticky",
    float: "right",
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch",
  },
}));

const pages = [
  {
    title: "Analysis Result",
    href: "/analysis-result",
    icon: <AssessmentIcon color="secondary" />,
  },
  {
    title: "Case Management",
    href: "/case-management",
    icon: <AccountTreeIcon color="secondary" />,
  },
  {
    title: "Search & Analytic",
    href: "/search-analytic",
    icon: <FindReplaceIcon color="secondary" />,
  },
  {
    title: "Link Analytic",
    href: "/link-analytic",
    icon: <TrendingUpIcon color="secondary" />,
  },

  {
    title: "Report Manager",
    href: "/report-manager",
    icon: <DescriptionIcon color="secondary" />,
  },
  {
    title: "User Management",
    href: "/user-management",
    icon: <SupervisedUserCircleIcon color="secondary" />,
  },
];

export default function MiniDrawer(props) {
  const { children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <contextButton.Provider
        value={{
          open: handleDrawerOpen,
          close: handleDrawerClose,
        }}
      >
        {matches ? (
          <Sidebar />
        ) : (
          <SidebarMobile open={open} onClose={handleDrawerClose} />
        )}
      </contextButton.Provider>
      <div className={classes.main}>
        <Topbar onSidebarOpen={handleDrawerOpen} />
        <main className={classes.content}>{children}</main>
      </div>
    </div>
  );
}
