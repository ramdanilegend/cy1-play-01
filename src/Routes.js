import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import UserManagement from "views/UserManagement/UserManagement";

import { RouteWithLayout } from "./components";
import {
  Main as MainLayout,
  Minimal as MinimalLayout,
  Test as TestLayout,
} from "./layouts";

import {
  NotFoundView,
  TestView,
  AnalysisResultView,
  CaseManagementView,
  GlobalSettingsView,
  LinkAnalyticView,
  LogView,
  ReportManagerView,
  SearchAnalyticView,
  UserManagementView,
  UserRoleView,
  SigninView,
  DashboardView,
} from "./views";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/cy1-play" />
        </Route>

        <RouteWithLayout
          component={AnalysisResultView}
          exact
          layout={MainLayout}
          path="/analysis-result"
        />

        <RouteWithLayout
          component={CaseManagementView}
          exact
          layout={MainLayout}
          path="/case-management"
        />

        <RouteWithLayout
          component={GlobalSettingsView}
          exact
          layout={MainLayout}
          path="/global-settings"
        />

        <RouteWithLayout
          component={LinkAnalyticView}
          exact
          layout={MainLayout}
          path="/link-analytic"
        />

        <RouteWithLayout
          component={LogView}
          exact
          layout={MainLayout}
          path="/log"
        />

        <RouteWithLayout
          component={ReportManagerView}
          exact
          layout={MainLayout}
          path="/report-manager"
        />

        <RouteWithLayout
          component={SearchAnalyticView}
          exact
          layout={MainLayout}
          path="/search-analytic"
        />

        <RouteWithLayout
          component={UserManagement}
          exact
          layout={MainLayout}
          path="/user-management"
        />

        <RouteWithLayout
          component={UserRoleView}
          exact
          layout={MainLayout}
          path="/user-role"
        />

        <RouteWithLayout
          component={SigninView}
          exact
          layout={MinimalLayout}
          path="/cy1-play"
        />

        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path="/dashboard"
        />

        <RouteWithLayout
          component={DashboardView}
          exact
          layout={TestLayout}
          path="/dashboard-test"
        />

        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
