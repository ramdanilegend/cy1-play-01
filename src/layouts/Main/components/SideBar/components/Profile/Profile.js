import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

import Paper from "@material-ui/core/Paper";

import contextBtn from "context/ButtonNavMainContext";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    marginTop: theme.spacing(1),
  },
}));

const Profile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const context = React.useContext(contextBtn);

  const month = new Date().getUTCMonth();
  const year = new Date().getUTCFullYear();
  const date = new Date().getUTCDate();
  const [openLogout, setOpenLogout] = React.useState(false);

  const months = new Array(12);
  months[0] = "Januari";
  months[1] = "Februari";
  months[2] = "Maret";
  months[3] = "April";
  months[4] = "Mei";
  months[5] = "Juni";
  months[6] = "Juli";
  months[7] = "Agustus";
  months[8] = "September";
  months[9] = "Oktober";
  months[10] = "November";
  months[11] = "Desember";

  const handleClickOpen = () => {
    setOpenLogout(true);
  };

  const handleClose = () => {
    setOpenLogout(false);
    context.close();
  };

  // console.log(getCurrentUser().RWId);
  // console.log(user);
  return <Paper style={{ backgroundColor: "#f5f5f5" }}>test</Paper>;
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
