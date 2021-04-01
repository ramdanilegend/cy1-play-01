import React from "react";
import { Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createBrowserHistory } from "history";
import theme from "./theme";
import Routes from "./routes";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayUtils from "@date-io/dayjs";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <MuiPickersUtilsProvider utils={DayUtils}>
            <Routes />
          </MuiPickersUtilsProvider>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
