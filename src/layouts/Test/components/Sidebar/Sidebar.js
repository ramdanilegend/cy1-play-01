import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Drawer } from "@material-ui/core";

import PerfectScrollbar from "react-perfect-scrollbar";
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

import { ItemExpand, SidebarExpand, SidebarItem } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  root: {
    backgroundColor: "#2E343A",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflow: "hidden",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(0),
  },
  Item: {
    marginBottom: theme.spacing(0),
  },
}));

const Sidebar = (props) => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

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
    {
      title: "User Role",
      href: "/user-role",
      icon: <GroupAddIcon color="secondary" />,
    },
    {
      title: "Global Settings",
      href: "/global-settings",
      icon: <TuneIcon color="secondary" />,
    },
    {
      title: "Log",
      href: "/log",
      icon: <HistoryIcon color="secondary" />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <PerfectScrollbar>
          <SidebarItem
            title={pages[0].title}
            icon={pages[0].icon}
            href={pages[0].href}
          />
          <SidebarItem
            title={pages[1].title}
            icon={pages[1].icon}
            href={pages[1].href}
          />
          <SidebarItem
            title={pages[2].title}
            icon={pages[2].icon}
            href={pages[2].href}
          />
          <SidebarItem
            title={pages[3].title}
            icon={pages[3].icon}
            href={pages[3].href}
          />
          <SidebarItem
            title={pages[4].title}
            icon={pages[4].icon}
            href={pages[4].href}
          />
          <SidebarExpand
            title="Settings"
            icon={<SettingsIcon color="secondary" />}
          >
            <ItemExpand
              title={pages[5].title}
              icon={pages[5].icon}
              href={pages[5].href}
            />
            <ItemExpand
              title={pages[6].title}
              icon={pages[6].icon}
              href={pages[6].href}
            />
            <ItemExpand
              title={pages[7].title}
              icon={pages[7].icon}
              href={pages[7].href}
            />
            <ItemExpand
              title={pages[8].title}
              icon={pages[8].icon}
              href={pages[8].href}
            />
          </SidebarExpand>
        </PerfectScrollbar>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  // variant: PropTypes.string.isRequired,
};

export default Sidebar;
