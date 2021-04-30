import React from "react";
import { Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createBrowserHistory } from "history";
import Alert from "components/Alert";
import context from "context/AlertContext";
import theme from "./theme";
import Routes from "./routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-dates/lib/css/_datepicker.css";
// import "tippy.js/dist/tippy.css";

const browserHistory = createBrowserHistory();

function App() {
  const [open, setOpen] = React.useState({
    backdrop: false,
    snackbar: false,
    message: "",
    variant: "",
  });

  const updateValue = (b, s, v, m) => {
    setOpen({ backdrop: b, snackbar: s, variant: v, message: m });
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <context.Provider value={{ state: open, updateState: updateValue }}>
            <Routes />
            <Alert
              backdrop={open.backdrop}
              snackbar={open.snackbar}
              message={open.message}
              variant={open.variant}
              updateState={() => {
                updateValue(false, false, "info", "");
              }}
            />
          </context.Provider>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
