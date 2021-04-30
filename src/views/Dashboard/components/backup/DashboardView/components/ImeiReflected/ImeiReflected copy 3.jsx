import React from "react";
import { PieChart } from "@dvsl/zoomcharts";
import { AppTableToolbar, TableContainer } from "components";
import { Box, Grid } from "@material-ui/core";
import DashboardContext from "context/DashboardContext";

// Zoomcharts license and license key
window.ZoomChartsLicense =
  "ZCS-5u128s7lt: ZoomCharts SDK 30 day Free Trial License for moo..@..l.com (valid for testing only); upgrades until: 2021-05-19";
window.ZoomChartsLicenseKey =
  "7571071699b2e65e35e287a3625268b604959189c9e4085bb0f348e32bebfff626e15f16aa90ac0c6cbe972a238e70d0ab49b053ef52b857d7e0eecd816b627351799b2e7bcbbfa293a7f53a5f1f0309654d09148f9a982980c6c5d1a6d979f3a823e1435c3dfb46a96a842010a51b8fdf3611a1db455c0aebf39d8122321c77edc57ee13bd4277b61d6b91dddf487c7e5477e558a5b2c821b9b6d5d81f25595b79fa00a52f8087a9170443831d7ec9427e076b3ddb2661814025a4738570bb1b1f0742482efdfb91d8a501cfa9263a6ea913d1b5bc6c3a747a821768806ec509824a0690db5b73276175713d5f310e4ce888c088b9d4fb8c3948b828df26653";

function ImeiRefelcted(props) {
  const chartRef = React.createRef();
  const { data } = props;

  React.useEffect(() => {
    if (data) {
      let dataPie = [];
      let imei = [];
      let number = [];
      data.map((value) => {
        dataPie.push({ name: value.AImei, value: value.count });
      });
      console.log(dataPie);
      const c = new PieChart({
        container: chartRef.current,
        pie: {
          innerRadius: 0.69999999999999996,
        },
        labels: {
          enabled: false,
        },
        area: {
          height: 180,
          width: 180,
        },
        data: {
          preloaded: {
            subvalues: dataPie,
          },
        },

        toolbar: {
          fullscreen: true,
          // enabled: true,
        },
        interaction: {
          resizing: {
            enabled: false,
          },
        },
      });
      console.log(data);
      // console.log(c);
    }
    //
  }, [data]);

  return (
    <TableContainer>
      <AppTableToolbar title="Imei Reflected" />
      <Grid container>
        <Grid item sm={12} md={6}>
          <Box padding="15px 15px">
            <Box fontSize="30px">IMEI Reflected : </Box>
            <Box fontSize="25px" paddingTop="10px">
              16
            </Box>
          </Box>
        </Grid>
        <Grid item sm={12} md={6}>
          <div ref={chartRef}></div>
        </Grid>
      </Grid>
    </TableContainer>
  );
}

export default ImeiRefelcted;
