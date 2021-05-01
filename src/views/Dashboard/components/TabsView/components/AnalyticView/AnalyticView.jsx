import React from "react";
import CheckIcon from "@material-ui/icons/Check";
import { Divider, useMediaQuery, Box } from "@material-ui/core";
import {
  AppSelect,
  AppDialogFull,
  AppSelectRowTable,
  AppSearchField,
} from "components";
import {
  TableView,
  TableToolbarView,
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
  columnDetailImeiCall,
  columnHourlyImeiCall,
  columnDetailImeiCalled,
  columnHourlyImeiCalled,
  columnSimPhone,
  columnPhoneSim,
} from "./components";
import DashboardContext from "context/DashboardContext";
import AnalyticService from "services/AnalyticService";

const selectCaller = [
  { value: 0, label: " - " },
  { value: 1, label: "Detail" },
  { value: 2, label: "Daily" },
  { value: 3, label: "Weekly" },
  { value: 4, label: "Monthly" },
  { value: 5, label: "Hourly" },
];
const selectCalled = [
  { value: 0, label: " - " },
  { value: 1, label: "Detail" },
  { value: 2, label: "Daily" },
  { value: 3, label: "Weekly" },
  { value: 4, label: "Monthly" },
  { value: 5, label: "Hourly" },
];

const selectIMEI = [
  { value: 0, label: " - " },
  { value: 1, label: "Caller IMEI Detail" },
  { value: 2, label: "Caller IMEI Hourly" },
  { value: 3, label: "Called IMEI Detail" },
  { value: 4, label: "Called IMEI Hourly" },
];

const selectPhone = [
  { value: 0, label: " - " },
  { value: 1, label: "Phone with MultiSIM" },
  { value: 2, label: "SIM with MultiPhone" },
];

const AnalyticView = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const dashboardContext = React.useContext(DashboardContext);
  const [open, setOpen] = React.useState(false);
  const [titleToolbar, setTitleToolbar] = React.useState("Caller Detail");
  const [dataSelect, setDataSelect] = React.useState({
    caller: 1,
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
    detailImeiCaller: false,
    hourlyImeiCaller: false,
    detailImeiCalled: false,
    hourlyImeiCalled: false,
    phoneSim: false,
    simPhone: false,
  });
  const [columnSelect, setColumnSelect] = React.useState(columnDetailCall);
  const [query, setQuery] = React.useState("");
  const [pageRows, setPageRows] = React.useState(5);
  const [page, setPage] = React.useState(1);
  const [datas, setDatas] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
    setPage(1);
    setQuery("");
  };

  const handleChangeCaller = async (e) => {
    setQuery("");
    setPage(1);
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
    setTableSelect({
      ...tableSelect,
      detailCall: e.target.value === 1 ? true : false,
      dailyCall: e.target.value === 2 ? true : false,
      weeklyCall: e.target.value === 3 ? true : false,
      monthlyCall: e.target.value === 4 ? true : false,
      hourlyCall: e.target.value === 5 ? true : false,
      detailCalled: false,
      dailyCalled: false,
      weeklyCalled: false,
      monthlyCalled: false,
      hourlyCalled: false,
      detailImeiCaller: false,
      hourlyImeiCaller: false,
      detailImeiCalled: false,
      hourlyImeiCalled: false,
      phoneSim: false,
      simPhone: false,
    });

    // setCaller(e.target.value);
  };

  const handleChangeCalled = (e) => {
    setQuery("");
    setPage(1);
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
    setTableSelect({
      ...tableSelect,
      detailCall: false,
      dailyCall: false,
      weeklyCall: false,
      monthlyCall: false,
      hourlyCall: false,
      detailCalled: e.target.value === 1 ? true : false,
      dailyCalled: e.target.value === 2 ? true : false,
      weeklyCalled: e.target.value === 3 ? true : false,
      monthlyCalled: e.target.value === 4 ? true : false,
      hourlyCalled: e.target.value === 5 ? true : false,
      detailImeiCaller: false,
      hourlyImeiCaller: false,
      detailImeiCalled: false,
      hourlyImeiCalled: false,
      phoneSim: false,
      simPhone: false,
    });
  };

  const handleChangeImei = (e) => {
    setQuery("");
    setPage(1);
    setSelect({
      ...select,
      selectedCaller: false,
      selectedCalled: false,
      selectedImei: true,
      selectedPhone: false,
    });
    setDataSelect({
      ...dataSelect,
      caller: 0,
      called: 0,
      imei: e.target.value,
      phone: 0,
    });
    setTableSelect({
      ...tableSelect,
      detailCall: false,
      dailyCall: false,
      weeklyCall: false,
      monthlyCall: false,
      hourlyCall: false,
      detailCalled: false,
      dailyCalled: false,
      weeklyCalled: false,
      monthlyCalled: false,
      hourlyCalled: false,
      detailImeiCaller: e.target.value === 1 ? true : false,
      hourlyImeiCaller: e.target.value === 2 ? true : false,
      detailImeiCalled: e.target.value === 3 ? true : false,
      hourlyImeiCalled: e.target.value === 4 ? true : false,
      phoneSim: false,
      simPhone: false,
    });
  };

  const handleChangePhone = (e) => {
    setQuery("");
    setPage(1);
    setSelect({
      ...select,
      selectedCaller: false,
      selectedCalled: false,
      selectedImei: false,
      selectedPhone: true,
    });
    setDataSelect({
      ...dataSelect,
      caller: 0,
      called: 0,
      imei: 0,
      phone: e.target.value,
    });
    setTableSelect({
      ...tableSelect,
      detailCall: false,
      dailyCall: false,
      weeklyCall: false,
      monthlyCall: false,
      hourlyCall: false,
      detailCalled: false,
      dailyCalled: false,
      weeklyCalled: false,
      monthlyCalled: false,
      hourlyCalled: false,
      detailImeiCaller: false,
      hourlyImeiCaller: false,
      detailImeiCalled: false,
      hourlyImeiCalled: false,
      phoneSim: e.target.value === 1 ? true : false,
      simPhone: e.target.value === 2 ? true : false,
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
    if (tableSelect.detailCall) {
      try {
        const respone = await AnalyticService.postDetailCaller(
          dashboardContext.state
        );
        setColumnSelect(columnDetailCall);
        setTitleToolbar("Caller Detail");
        setDatas(respone.data.analyticFrequencyDetail);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.dailyCall) {
      try {
        const respone = await AnalyticService.postDailyCaller(
          dashboardContext.state
        );
        setColumnSelect(columnDailyCall);
        setTitleToolbar("Caller Daily");
        setDatas(respone.data.analyticFrequencyDaily);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.weeklyCall) {
      try {
        const respone = await AnalyticService.postWeeklyCaller(
          dashboardContext.state
        );
        setColumnSelect(columnWeeklyCall);
        setTitleToolbar("Caller Weekly");
        setDatas(respone.data.analyticFrequencyWeekly);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.monthlyCall) {
      try {
        const respone = await AnalyticService.postMonthlyCaller(
          dashboardContext.state
        );
        setColumnSelect(columnMonthlyCaller);
        setTitleToolbar("Caller Monthly");
        setDatas(respone.data.analyticFrequencyWeekly);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.hourlyCall) {
      try {
        const respone = await AnalyticService.postHourlyCaller(
          dashboardContext.state
        );
        setColumnSelect(columnHourlyCall);
        setTitleToolbar("Caller Hourly");
        setDatas(respone.data.analyticFrequencyWeekly);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.detailCalled) {
      try {
        const respone = await AnalyticService.postDetailCalled(
          dashboardContext.state
        );
        setColumnSelect(columnDetailCalled);
        setTitleToolbar("Called Detail");
        setDatas(respone.data.analyticFrequencyDetail);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.dailyCalled) {
      try {
        const respone = await AnalyticService.postDailyCalled(
          dashboardContext.state
        );
        setColumnSelect(columnDailyCalled);
        setTitleToolbar("Called Daily");
        setDatas(respone.data.analyticFrequencyDaily);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.weeklyCalled) {
      try {
        const respone = await AnalyticService.postWeeklyCalled(
          dashboardContext.state
        );
        setColumnSelect(columnWeeklyCalled);
        setTitleToolbar("Called Weekly");
        setDatas(respone.data.analyticFrequencyWeekly);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.monthlyCalled) {
      try {
        const respone = await AnalyticService.postMonthlyCalled(
          dashboardContext.state
        );
        setColumnSelect(columnMonthlyCalled);
        setTitleToolbar("Called Monthly");
        setDatas(respone.data.analyticFrequencyWeekly);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.hourlyCalled) {
      try {
        const respone = await AnalyticService.postHourlyCalled(
          dashboardContext.state
        );
        setColumnSelect(columnHourlyCalled);
        setTitleToolbar("Called Hourly");
        setDatas(respone.data.analyticFrequencyWeekly);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.detailImeiCaller) {
      try {
        const respone = await AnalyticService.postDetailImeiCaller(
          dashboardContext.state
        );
        setColumnSelect(columnDetailImeiCall);
        setTitleToolbar("Imei Caller Detail");
        setDatas(respone.data.analyticFrequencyDetail);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.hourlyImeiCaller) {
      try {
        const respone = await AnalyticService.postHourlyImeiCaller(
          dashboardContext.state
        );
        setColumnSelect(columnHourlyImeiCall);
        setTitleToolbar("Imei Caller Hourly");
        setDatas(respone.data.analyticimeiHourly);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.detailImeiCalled) {
      try {
        const respone = await AnalyticService.postDetailImeiCalled(
          dashboardContext.state
        );
        setColumnSelect(columnDetailImeiCalled);
        setTitleToolbar("Imei Called Detail");
        setDatas(respone.data.analyticFrequencyDetail);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.hourlyImeiCalled) {
      try {
        const respone = await AnalyticService.postHourlyImeiCalled(
          dashboardContext.state
        );
        setColumnSelect(columnHourlyImeiCalled);
        setTitleToolbar("Imei Called Hourly");
        setDatas(respone.data.analyticimeiHourly);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.phoneSim) {
      try {
        const respone = await AnalyticService.postPhoneSim(
          dashboardContext.state
        );
        setColumnSelect(columnPhoneSim);
        setTitleToolbar("Phone with Multi-SIM");
        setDatas(respone.data.analyticFrequencyDetail);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
    if (tableSelect.simPhone) {
      try {
        const respone = await AnalyticService.postSimPhone(
          dashboardContext.state
        );
        setColumnSelect(columnSimPhone);
        setTitleToolbar("SIM with Multi-Phone");
        setDatas(respone.data.analyticFrequencyDetail);
      } catch (error) {
        if (error.response) {
          return true;
        }
      }
    }
  }, [
    tableSelect.detailCall,
    tableSelect.dailyCall,
    tableSelect.weeklyCall,
    tableSelect.monthlyCall,
    tableSelect.hourlyCall,
    tableSelect.detailCalled,
    tableSelect.dailyCalled,
    tableSelect.weeklyCalled,
    tableSelect.monthlyCalled,
    tableSelect.hourlyCalled,
    tableSelect.detailImeiCaller,
    tableSelect.hourlyImeiCaller,
    tableSelect.detailImeiCalled,
    tableSelect.hourlyImeiCalled,
  ]);

  React.useEffect(async () => {
    try {
      const respone = await AnalyticService.postDetailCaller(
        dashboardContext.state
      );
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
        selected={select.selectedCaller}
        name="caller"
        label="Caller"
        handleChange={(e) => {
          handleChangeCaller(e);
        }}
      />
      <AppSelect
        data={selectCalled}
        value={dataSelect.called}
        selected={select.selectedCalled}
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
        name="imei"
        selected={select.selectedImei}
        handleChange={(e) => {
          handleChangeImei(e);
        }}
      />
      <AppSelect
        data={selectPhone}
        value={dataSelect.phone}
        label="Phone SIM"
        name="imei"
        selected={select.selectedPhone}
        handleChange={(e) => {
          handleChangePhone(e);
        }}
      />
      <Divider />
      <Box border="1px solid #C8CED3" marginTop="5px" borderRadius="5px">
        <TableToolbarView
          title={titleToolbar}
          icon={<CheckIcon fontSize="small" />}
          handleClick={() => {
            setOpen(true);
            setPageRows(25);
          }}
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
      <AppDialogFull title={titleToolbar} open={open} handleClose={handleClose}>
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
          fullscreen={open}
          pageRows={pageRows}
          column={columnSelect}
          page={page}
          query={query}
          handleChangePage={handleChangePage}
          data={datas}
          tableSelect={tableSelect}
          detail={tableSelect.detailCall}
        />
      </AppDialogFull>
    </React.Fragment>
  );
};

export default AnalyticView;
