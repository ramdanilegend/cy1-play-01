import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "3px",
    minWidth: "40px",
  },
}));

const IconButton = (props) => {
  const { children, styleName, onClick = () => {} } = props;
  const classes = useStyles();
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        classes={{ root: classes.root }}
        className={styleName}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
};

export default IconButton;
