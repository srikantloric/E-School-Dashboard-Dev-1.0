import Navbar from "../../components/Navbar/Navbar";
import LSPage from "../../components/Utils/LSPage";
import {
  Box,
  Breadcrumbs,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import "../Dashboard/Dashboard.scss";
import CardDashboard from "../../components/Card/CardDashboard";
import faker from "faker";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PageContainer from "../../components/Utils/PageContainer";
import Footer from "../../components/Footer/Footer";
//
import DashboardIcon from "@mui/icons-material/Dashboard";
import GrainIcon from "@mui/icons-material/Grain";
import BarGraphChart from "../../components/Graph/BarGraphChart";
import style from "./Dashboard.module.scss";

Chart.register(CategoryScale);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Male",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(255, 99, 132, 0.8)",
    },
    {
      label: "Female",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(53, 162, 235, 0.8)",
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Attendance Chart",
    },
  },
};

function Dashboard() {
  return (
    <>
      <PageContainer>
        <Navbar />
        <LSPage>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Breadcrumbs aria-label="breadcrumb">
              <a
                style={{
                  textDecoration: "none",
                  color: "#343a40",
                  display: "flex",
                  alignItems: "center",
                }}
                href="/"
              >
                <DashboardIcon sx={{ mr: 0.3 }} fontSize="inherit" />
                Home
              </a>

              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                color="text.secondary"
              >
                <GrainIcon sx={{ mr: 0.3 }} fontSize="inherit" />
                Dashboard
              </Typography>
            </Breadcrumbs>
            <div>
              <FormGroup>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label="Show/Hide Info"
                />
              </FormGroup>
            </div>
          </div>

          <Grid
            container
            justifyContent="space-between"
            className="card-container"
          >
            <CardDashboard
              headerTitle="27"
              subHeaderTitle="Dues-Amount : 64750"
              color="#afc8ad"
              colorBottom="#88ab8e"
            />
            <CardDashboard
              headerTitle="5000"
              subHeaderTitle="Total Income This Year"
              color="#E7BCDE"
              colorBottom="#BB9CC0"
            />

            <CardDashboard
              headerTitle="5000"
              subHeaderTitle="Income This Month"
              color="#9EB8D9"
              colorBottom="#7C93C3"
            />
            <CardDashboard
              headerTitle="0"
              subHeaderTitle="Income Today"
              color="#E48F45"
              colorBottom="#994D1C"
            />

            <CardDashboard
              headerTitle="27"
              subHeaderTitle="Profit This Month"
              color="#afc8ad"
              colorBottom="#88ab8e"
            />
            <CardDashboard
              headerTitle="27"
              subHeaderTitle="Total Expense This Year"
              color="#afc8ad"
              colorBottom="#88ab8e"
            />
            <CardDashboard
              headerTitle="0"
              subHeaderTitle="Expense This Month"
              color="#7C81AD"
              colorBottom="#4B527E"
            />
            <CardDashboard
              headerTitle="0"
              subHeaderTitle="Expense Today"
              color="#EAD7BB"
              colorBottom="#BCA37F"
            />
          </Grid>
        </LSPage>
        <Divider />
        <div className={style.dashboard_graph_container}>
          <div className={style.left_panel}>
            <h5>Month Wise Paid/Unpaid Fee Report For Current Year</h5>
            <BarGraphChart />
          </div>
          <div className={style.right_panel}>{/* <Card2/> */}</div>
        </div>

        <Footer />
      </PageContainer>
    </>
  );
}

export default Dashboard;
