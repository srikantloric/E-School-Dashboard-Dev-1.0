import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import LSPage from "../../components/Utils/LSPage";
import PropTypes from "prop-types";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GrainIcon from "@mui/icons-material/Grain";
import {
  Breadcrumbs,
  Typography,
  Button,
  Tabs,
  Tab,
  Box,
  createFilterOptions,
} from "@mui/material";
import PageContainer from "../../components/Utils/PageContainer";
import Input from "@mui/joy/Input";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  AutocompleteOption,
  ListItemContent,
  ListItemDecorator,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { fetchstudent } from "../../store/studentSlice";
import { enqueueSnackbar } from "notistack";

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

//main code
function FeeManager() {
  const [value, setValue] = React.useState(0);
  const historyRef = useNavigate();

  const dispatch = useDispatch();
  const data = Array.from(useSelector((state) => state.student.studentarray));

  const [searchList, setSearchList] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.length != 0) {
      const filteredDatadata = [];
      data.forEach((item) => {
        const obj = {
          id: item.id,
          name: item.student_name,
          admission: item.admission_no,
          profile: item.profil_url,
          sId: item.student_id,
          dob: item.dob,
        };
        filteredDatadata.push(obj);
      });
      setSearchList(filteredDatadata);
    }
  }, [loading]);

  useEffect(() => {
    if (Array.from(data).length === 0) {
      setLoading(true);
      dispatch(fetchstudent()).then(() => {
        setLoading(false);
      });
    }
  }, []);

  const filterOptions = createFilterOptions({
    stringify: (option) => option.name + option.sId + option.admission,
  });

  const handleNextPageBtn = () => {
    if (selectedDoc) {
      historyRef(`${"FeeDetails/" + selectedDoc}`, {
        state: data.filter((data) => data.id == selectedDoc),
      });
    } else {
      // alert("select student")
      enqueueSnackbar("Error : Please enter student id or admission number !", {
        variant: "error",
      });
    }
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
              Search Student
            </Typography>
          </Breadcrumbs>
        </div>

        {/* <Paper sx={{ p: "5px", mt: "12px" ,display:"flex",alignItems:"center",mb:"10px"}}> */}
        <Box sx={{ width: "100%", mt: "16px" }}>
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
                height: "30vh",
              }}
            >
              <Autocomplete
                id="country-select-demo"
                color="primary"
                onChange={(e, val) => {
                  setSelectedDoc(val && val.id);
                }}
                placeholder="Search with Student ID/Admission No"
                // slotProps={{
                //   input: {
                //     autoComplete: "new-password", // disable autocomplete and autofill
                //   },
                // }}
                sx={{ width: "450px", m: "10px" }}
                options={searchList}
                autoHighlight
                getOptionLabel={(option) =>
                  `${option.name + " - " + option.id}`
                }
                filterOptions={filterOptions}
                renderOption={(props, option) => (
                  <AutocompleteOption {...props}>
                    <ListItemDecorator>
                      <img
                        loading="lazy"
                        width="20"
                        src={`${option.profile}`}
                        alt=""
                      />
                    </ListItemDecorator>
                    <ListItemContent sx={{ fontSize: "sm" }}>
                      <b>{option.name}</b>
                      <Typography level="body-xs">
                        OPS{option.admission} | {option.dob}
                      </Typography>
                    </ListItemContent>
                  </AutocompleteOption>
                )}
              />

              <Button
                variant="contained"
                sx={{ height: "36px" }}
                disableElevation
                onClick={handleNextPageBtn}
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
      <Footer />
    </PageContainer>
  );
}

export default FeeManager;
