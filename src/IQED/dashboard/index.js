// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "../../Redux/API/User.Api";
import { useSelector } from "react-redux";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [IsOnline, setIsOnline] = useState(false);
  const [Status, setStatus] = useState(404);
  const UserData = useSelector((state) => state.UserState);
  const { data } = useGetUserQuery();
  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => {
        if (response.ok) {
          setIsOnline(true);
          setStatus("Site is online");
        } else {
          setIsOnline(false);
          setStatus(`Site responded with status: ${response.status}`);
        }
      })
      .catch((error) => {
        setIsOnline(false);
        setStatus(`Fetch error: ${error}`);
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12} lg={12}>
            -----
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="webasset"
                title="PLATFORM"
                count={"iqed.in"}
                percentage={{
                  color: IsOnline ? "success" : "error",
                  amount: IsOnline ? "Online" : "Offline",
                  label: ` : ${Status}`,
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                icon="group"
                title="Today's Users"
                count={data?.UserCount}
                percentage={{
                  color: data?.WeekRegisterCount == 0 ? "error" : "success",
                  amount: data?.WeekRegisterCount + "%",
                  label: "this week Registration",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="extension"
                title="Total Question"
                count="40"
                percentage={{
                  color: "success",
                  amount: "2.5%",
                  label: "is Verified",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="warning"
                icon="person_add"
                title="Question Reports"
                count="10"
                percentage={{
                  color: "warning",
                  amount: "1%",
                  label: "is resolved",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="dark"
                  title="daily Login"
                  description={
                    <>
                      (<strong>{data?.WeekLogin}%</strong>) today logins
                    </>
                  }
                  date="updated 1 min ago"
                  chart={{
                    labels: ["M", "T", "W", "T", "F", "S", "S"],
                    datasets: { label: "Login", data: [2, 1, 1, 1, 1, 0, 0] },
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="daily Registration"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
