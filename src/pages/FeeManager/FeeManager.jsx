import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import LSPage from "../../components/Utils/LSPage";
import PropTypes from "prop-types";
import GrainIcon from "@mui/icons-material/Grain";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import {
  Breadcrumbs,
  Paper,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import PageContainer from "../../components/Utils/PageContainer";
import Input from "@mui/joy/Input";
import MaterialTable from "@material-table/core";
import { TabList, TabPanel } from "@mui/joy";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function FeeManager() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <PageContainer>
      <Navbar />
      <LSPage>
        <div
          style={{
            backgroundColor: "var(--bs-gray-201)",
            padding: "10px",
            borderRadius: "5px",
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
              <AccountBalanceWalletIcon sx={{ color: "var(--bs-gray-500)" }} />
              <Typography sx={{ ml: "4px" }}>Fee Management</Typography>
            </a>

            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.secondary"
            >
              <GrainIcon sx={{ mr: 0.3 }} fontSize="inherit" />
              Fee Details
            </Typography>
          </Breadcrumbs>
        </div>

        {/* <Paper sx={{ p: "5px", mt: "12px" ,display:"flex",alignItems:"center",mb:"10px"}}> */}
        <Box sx={{ width: "100%",mt:"16px" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Search Student"
                {...a11yProps(0)}
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                label="Cross-Campus Payment or Payment By CNIC"
                {...a11yProps(1)}
                sx={{ textTransform: "capitalize" }}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div
              style={{
         
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Input
                color="primary"
                sx={{ width: "400px", m: "10px" }}
                variant="outlined"
                placeholder="Search with Student ID/Admission No"
              />
              <Button
                variant="contained"
                sx={{ height: "36px" }}
                disableElevation
              >
                Search
              </Button>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            In-Progress
          </CustomTabPanel>
        </Box>

        {/* </Paper> */}
      </LSPage>
    </PageContainer>
  );
}

export default FeeManager;
