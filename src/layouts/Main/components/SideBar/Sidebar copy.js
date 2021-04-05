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
import AssessmentIcon from "@material-ui/icons/Assessment";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import FindReplaceIcon from "@material-ui/icons/FindReplace";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DescriptionIcon from "@material-ui/icons/Description";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import TuneIcon from "@material-ui/icons/Tune";
import HistoryIcon from "@material-ui/icons/History";
import { SidebarItem } from "layouts/Test/components/Sidebar/components";
import SettingsIcon from "@material-ui/icons/Settings";
import { SidebarExpand } from "layouts/Test/components/Sidebar/components";
import ReactPerfectScrollbar from "react-perfect-scrollbar";
import { SidebarExpandItem } from "./components";
import { Box } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
  hide: {
    display: "none",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    // backgroundColor: "#3A4248",
  },
  toolbarOpen: {
    justifyContent: "flex-end",
  },
  toolbarClose: {
    justifyContent: "center",
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
}));

function Sidebar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        height="90vh"
        overflow="hidden"
      >
        <ReactPerfectScrollbar
          options={{
            suppressScrollX: true,
          }}
          component="div"
        >
          {/* <Box
            minHeight="100vh"
            flexDirection="column"
            height="90vh"
            overflow="hidden"
          > */}
          <div
            className={clsx(classes.toolbar, {
              [classes.toolbarOpen]: open,
              [classes.toolbarClose]: !open,
            })}
          >
            <IconButton
              onClick={handleDrawerOpen}
              className={clsx({
                [classes.hide]: open,
                [classes.show]: !open,
              })}
            >
              <ChevronRightIcon color="secondary" />
            </IconButton>

            <IconButton
              onClick={handleDrawerClose}
              className={clsx({
                [classes.hide]: !open,
                [classes.show]: open,
              })}
            >
              <ChevronLeftIcon color="secondary" />
            </IconButton>
          </div>
          <Divider variant="middle" />
          {/* <Divider /> */}
          <List>
            <SidebarItem
              href="dashboard-test"
              title="Analysis Result"
              icon={<AssessmentIcon color="secondary" />}
            />
            <SidebarItem
              href="case-management"
              title="Case Management"
              icon={<AccountTreeIcon color="secondary" />}
            />
            <SidebarItem
              href="/search-analytic"
              title="Search & Analytic"
              icon={<FindReplaceIcon color="secondary" />}
            />
            <SidebarItem
              href="/link-analytic"
              title="Link Analytic"
              icon={<TrendingUpIcon color="secondary" />}
            />
            <SidebarItem
              href="/report-manager"
              title="Report Manager"
              icon={<DescriptionIcon color="secondary" />}
            />
            <SidebarExpand
              title="Settings"
              icon={<SettingsIcon color="secondary" />}
              openSidebar={open}
            >
              <SidebarExpandItem
                href="/user-management"
                title="User Management"
                icon={<SupervisedUserCircleIcon color="secondary" />}
              />
              <SidebarExpandItem
                href="/user-role"
                title="User Role"
                icon={<GroupAddIcon color="secondary" />}
              />
              <SidebarExpandItem
                href="/global-settings"
                title="Global Settings"
                icon={<TuneIcon color="secondary" />}
              />
              <SidebarExpandItem
                href="/log"
                title="Log"
                icon={<HistoryIcon color="secondary" />}
              />
            </SidebarExpand>
          </List>
          {/* </Box> */}
        </ReactPerfectScrollbar>
      </Box>
    </Drawer>
  );
}

// Sidebar.propTypes = {
//   className: PropTypes.string,
//   onClose: PropTypes.func,
//   open: PropTypes.bool.isRequired,
//   variant: PropTypes.string.isRequired,
// };

export default Sidebar;
