import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import { Divider, useMediaQuery, Box } from "@material-ui/core";
import {
  AppSelect,
  AppTableToolbar,
  AppSelectRowTable,
  AppSearchField,
} from "components";
import {
  TableView,
  columnDailyCall,
  columnDetailCall,
  columnWeeklyCall,
  columnMonthlyCaller,
  columnHourlyCall,
  columnDailyCalled,
  columnDetailCalled,
  columnWeeklyCalled,
  columnMonthlyCalled,
  columnHourlyCalled,
} from "./components";
import DashboardContext from "context/DashboardContext";
import AnalyticService from "services/AnalyticService";
import { TransformOutlined } from "@material-ui/icons";

const selectCaller = [
  { value: 0, label: "Detail" },
  { value: 1, label: "Daily" },
  { value: 2, label: "Weekly" },
  { value: 3, label: "Mounthly" },
  { value: 4, label: "Hourly" },
  { value: 5, label: "Cell Site" },
];

const selectIMEI = [
  { value: 0, label: "Caller IMEI Detail" },
  { value: 1, label: "Caller IMEI Hourly" },
  { value: 2, label: "Called IMEI Detail" },
  { value: 3, label: "Called IMEI Hourly" },
];

const selectPhone = [
  { value: 0, label: "Phone with MultiSIM" },
  { value: 1, label: "SIM with MultiPhone" },
];

const AnalyticView = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const dashboardContext = React.useContext(DashboardContext);
  const [titleToolbar, setTitleToolbar] = React.useState("Caller Detail");
  const [dataSelect, setDataSelect] = React.useState({
    caller: 0,
    called: 0,
    imei: 0,
    phone: 0,
  });
  const [select, setSelect] = React.useState({
    selectedCaller: true,
    selectedCalled: false,
    selectedImei: false,
    selectedPhone: false,
  });
  const [tableSelect, setTableSelect] = React.useState({
    detailCall: true,
    dailyCall: false,
    weeklyCall: false,
    monthlyCall: false,
    hourlyCall: false,
    detailCalled: false,
    dailyCalled: false,
    weeklyCalled: false,
    monthlyCalled: false,
    hourlyCalled: false,
  });
  const [columnSelect, setColumnSelect] = React.useState(columnDetailCall);

  const [query, setQuery] = React.useState("");
  const [pageRows, setPageRows] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [datas, setDatas] = React.useState([]);

  const handleChangeCaller = async (e) => {
    setSelect({
      ...select,
      selectedCaller: true,
      selectedCalled: false,
      selectedImei: false,
      selectedPhone: false,
    });
    setDataSelect({
      ...dataSelect,
      caller: e.target.value,
      called: 0,
      imei: 0,
      phone: 0,
    });
    // setCaller(e.target.value);
  };

  const handleChangeCalled = (e) => {
    setSelect({
      ...select,
      selectedCaller: false,
      selectedCalled: true,
      selectedImei: false,
      selectedPhone: false,
    });
    setDataSelect({
      ...dataSelect,
      caller: 0,
      called: e.target.value,
      imei: 0,
      phone: 0,
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeSearch = (event) => {
    setQuery(event.target.value);
  };

  const handleChangePageRows = (event) => {
    setPageRows(event.target.value);
    setPage(1);
  };
  //caller
  React.useEffect(async () => {
    if (select.selectedCaller) {
      switch (dataSelect.caller) {
        case 0:
          try {
            const respone = await AnalyticService.postDetailCaller(
              dashboardContext.state
            );
            setColumnSelect(columnDetailCall);
            setTitleToolbar("Caller Detail");
            setTableSelect({
              ...tableSelect,
              detailCall: true,
              dailyCall: false,
              weeklyCall: false,
              monthlyCall: false,
              hourlyCall: false,
              detailCalled: false,
              dailyCalled: false,
              weeklyCalled: false,
              monthlyCalled: false,
              hourlyCalled: false,
            });
            setDatas(respone.data.analyticFrequencyDetail);
          } catch (error) {
            if (error.response) {
              return true;
            }
          }
          break;
        case 1:
          try {
            const respone = await AnalyticService.postDailyCaller(
              dashboardContext.state
            );
            setColumnSelect(columnDailyCall);
            setTitleToolbar("Caller Daily");
            setTableSelect({
              ...tableSelect,
              detailCall: false,
              dailyCall: true,
              weeklyCall: false,
              monthlyCall: false,
              hourlyCall: false,
              detailCalled: false,
              dailyCalled: false,
              weeklyCalled: false,
              monthlyCalled: false,
              hourlyCalled: false,
            });
            setDatas(respone.data.analyticFrequencyDaily);
          } catch (error) {
            if (error.response) {
              return true;
            }
          }
          break;
        case 2:
          try {
            const respone = await AnalyticService.postWeeklyCaller(
              dashboardContext.state
            );
            setColumnSelect(columnWeeklyCall);
            setTitleToolbar("Caller Weekly");
            setTableSelect({
              ...tableSelect,
              detailCall: false,
              dailyCall: false,
              weeklyCall: true,
              monthlyCall: false,
              hourlyCall: false,
              detailCalled: false,
              dailyCalled: false,
              weeklyCalled: false,
              monthlyCalled: false,
              hourlyCalled: false,
            });
            setDatas(respone.data.analyticFrequencyWeekly);
          } catch (error) {
            if (error.response) {
              return true;
            }
          }
          break;
        case 3:
          try {
            const respone = await AnalyticService.postMonthlyCaller(
              dashboardContext.state
            );
            setColumnSelect(columnMonthlyCaller);
            setTitleToolbar("Caller Monthly");
            setTableSelect({
              ...tableSelect,
              detailCall: false,
              dailyCall: false,
              weeklyCall: false,
              monthlyCall: true,
              hourlyCall: false,
              detailCalled: false,
              dailyCalled: false,
              weeklyCalled: false,
              monthlyCalled: false,
              hourlyCalled: false,
            });
            setDatas(respone.data.analyticFrequencyWeekly);
          } catch (error) {
            if (error.response) {
              return true;
            }
          }
          break;
        case 4:
          try {
            const respone = await AnalyticService.postHourlyCaller(
              dashboardContext.state
            );
            setColumnSelect(columnHourlyCall);
            setTitleToolbar("Caller Hourly");
            setTableSelect({
              ...tableSelect,
              detailCall: false,
              dailyCall: false,
              weeklyCall: false,
              monthlyCall: false,
              hourlyCall: true,
              detailCalled: false,
              dailyCalled: false,
              weeklyCalled: false,
              monthlyCalled: false,
              hourlyCalled: false,
            });
            setDatas(respone.data.analyticFrequencyWeekly);
          } catch (error) {
            if (error.response) {
              return true;
            }
          }
          break;
      }
    }
  }, [select.selectedCaller, dataSelect.caller]);

  React.useEffect(async () => {
    if (select.selectedCalled) {
      switch (dataSelect.called) {
        case 0:
          try {
            const respone = await AnalyticService.postDetailCalled(
              dashboardContext.state
            );
            setColumnSelect(columnDetailCalled);
            setTitleToolbar("Called Detail");
            setTableSelect({
              ...tableSelect,
              detailCall: false,
              dailyCall: false,
              weeklyCall: false,
              monthlyCall: false,
              hourlyCall: false,
              detailCalled: true,
              dailyCalled: false,
              weeklyCalled: false,
              monthlyCalled: false,
              hourlyCalled: false,
            });
            setDatas(respone.data.analyticFrequencyDetail);
          } catch (error) {
            if (error.response) {
              return true;
            }
          }
          break;
        case 1:
          try {
            const respone = await AnalyticService.postDailyCalled(
              dashboardContext.state
            );
            setColumnSelect(columnDailyCalled);
            setTitleToolbar("Called Daily");
            setTableSelect({
              ...tableSelect,
              dailyCall: false,
              weeklyCall: false,
              monthlyCall: false,
              hourlyCall: false,
              detailCalled: false,
              dailyCalled: true,
              weeklyCalled: false,
              monthlyCalled: false,
              hourlyCalled: false,
            });
            setDatas(respone.data.analyticFrequencyDaily);
          } catch (error) {
            if (error.response) {
              return true;
            }
          }
          break;
        case 2:
          try {
            const respone = await AnalyticService.postWeeklyCalled(
              dashboardContext.state
            );
            setColumnSelect(columnWeeklyCalled);
            setTitleToolbar("Called Weekly");
            setTableSelect({
              ...tableSelect,
              dailyCall: false,
              weeklyCall: false,
              monthlyCall: false,
              hourlyCall: false,
              detailCalled: false,
              dailyCalled: false,
              weeklyCalled: true,
              monthlyCalled: false,
              hourlyCalled: false,
            });
            setDatas(respone.data.analyticFrequencyWeekly);
          } catch (error) {
            if (error.response) {
              return true;
            }
          }
          break;
        case 3:
          try {
            const respone = await AnalyticService.postMonthlyCalled(
              dashboardContext.state
            );
            setColumnSelect(columnMonthlyCalled);
            setTitleToolbar("Called Monthly");
            setTableSelect({
              ...tableSelect,
              dailyCall: false,
              weeklyCall: false,
              monthlyCall: false,
              hourlyCall: false,
              detailCalled: false,
              dailyCalled: false,
              weeklyCalled: false,
              monthlyCalled: true,
              hourlyCalled: false,
            });
            setDatas(respone.data.analyticFrequencyWeekly);
          } catch (error) {
            if (error.response) {
              return true;
            }
          }
          break;
        case 4:
          try {
            const respone = await AnalyticService.postHourlyCalled(
              dashboardContext.state
            );
            setColumnSelect(columnHourlyCalled);
            setTitleToolbar("Called Hourly");
            setTableSelect({
              ...tableSelect,
              dailyCall: false,
              weeklyCall: false,
              monthlyCall: false,
              hourlyCall: false,
              detailCalled: false,
              dailyCalled: false,
              weeklyCalled: false,
              monthlyCalled: false,
              hourlyCalled: true,
            });
            setDatas(respone.data.analyticFrequencyWeekly);
          } catch (error) {
            if (error.response) {
              return true;
            }
          }
          break;
      }
    }
  }, [select.selectedCalled, dataSelect.called]);

  React.useEffect(async () => {
    try {
      const respone = await AnalyticService.postDetailCaller(
        dashboardContext.state
      );
      console.log(dashboardContext.state);
      setDatas(respone.data.analyticFrequencyDetail);
    } catch (error) {
      if (error.response) {
        return true;
      }
    }
  }, []);
  return (
    <React.Fragment>
      <AppSelect
        data={selectCaller}
        value={dataSelect.caller}
        selected={dataSelect.selectedCaller}
        name="caller"
        label="Caller"
        handleChange={(e) => {
          handleChangeCaller(e);
        }}
      />
      <AppSelect
        data={selectCaller}
        value={dataSelect.called}
        selected={dataSelect.selectedCalled}
        name="called"
        label="Called"
        handleChange={(e) => {
          handleChangeCalled(e);
        }}
      />
      <AppSelect
        data={selectIMEI}
        value={dataSelect.imei}
        label="IMEI"
        handleChange={() => {}}
      />
      <AppSelect
        data={selectPhone}
        value={dataSelect.phone}
        label="Phone SIM"
        handleChange={() => {}}
      />
      <Divider />
      <Box border="1px solid #C8CED3" marginTop="5px" borderRadius="5px">
        <AppTableToolbar
          title={titleToolbar}
          icon={<CheckIcon fontSize="small" />}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          padding="5px 15px"
          flexDirection={matches ? "column-reverse" : "row"}
        >
          <Box display="flex" alignItems="center">
            Show
            <AppSelectRowTable
              data={pageRows}
              handleChange={handleChangePageRows}
            />
            entries
          </Box>
          <Box display="flex" alignItems="center">
            <AppSearchField data={query} handleChange={handleChangeSearch} />
          </Box>
        </Box>
        <TableView
          pageRows={pageRows}
          column={columnSelect}
          page={page}
          query={query}
          handleChangePage={handleChangePage}
          data={datas}
          tableSelect={tableSelect}
          detail={tableSelect.detailCall}
        />
      </Box>
    </React.Fragment>
  );
};

export default AnalyticView;
