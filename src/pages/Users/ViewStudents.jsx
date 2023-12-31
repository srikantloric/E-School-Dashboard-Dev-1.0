import React from "react";
import PageContainer from "../../components/Utils/PageContainer";
import Navbar from "../../components/Navbar/Navbar";
import LSPage from "../../components/Utils/LSPage";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  ListItemIcon,
  Menu,
  Modal,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Styles from "./ViewStudents.module.scss";
import { useNavigate } from "react-router-dom";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import PreviewIcon from "@mui/icons-material/Preview";
import BadgeIcon from "@mui/icons-material/Badge";
import GrainIcon from "@mui/icons-material/Grain";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleltedata, fetchstudent } from "../../store/studentSlice";
import { useState } from "react";
import Swal from "sweetalert2";
import MaterialTable from "@material-table/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Filter, MoreVert } from "@mui/icons-material";
import { IconEdit } from "@tabler/icons-react";
import { useSnackbar } from "notistack";
import ConfirmationModal from "../../components/Modals/ConfirmationModal";
import { fetchstudentPayement } from "../../store/studentPaymentSlice";
import { db } from "../../firebase";
import { Card, Table } from "@mui/joy";

//tabs
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
        <Box sx={{ pt: 3 }}>
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

function ViewStudents() {
  const data = useSelector((state) => state.students.studentarray);
  const isDataLoading = useSelector((state) => state.students.loading);
  const error = useSelector((state) => state.students.error);

  const { enqueueSnackbar } = useSnackbar();

  const dipatch = useDispatch();

  const [filteredData, setFilteredData] = useState(Array.from(data));
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [filterChip, setFilterChip] = useState(false);
  const [filterChipLabel, setFilterChipLabel] = useState();

  //topbar selection state
  const [session, setSession] = useState("2023/24");
  const [selectedClass, setSelectedClass] = useState(-1);
  const [selectedSection, setSelectedSection] = useState(-1);

  //model state
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  //confirmation Modal
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [selectedStudentUID, setSelectedStudentUID] = useState();
  const [deleteLoading, setDeleteLoading] = useState(false);
  //payment
  const [feeDetail, setFeeDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  ///menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowData);
    setSelectedId(rowData.id);
    console.log(rowData.id);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    minHeight: "550px",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 1,
    p: 3,
  };

  useEffect(() => {
    if (Array.from(data).length === 0) {
      dipatch(fetchstudent());
    }
  }, []);

  useEffect(() => {
    if (error) {
      enqueueSnackbar("ERROR:" + error, { variant: "error" });
    }
  }, [error]);
  useEffect(() => {
    if (!isDataLoading) {
      setFilteredData(data);
    }
  }, [isDataLoading]);
  useEffect(() => {
    setLoading(true);
    const userDocId = selectedId;

    if (userDocId) {
      const dbPayemnt = db
        .collection("STUDENTS")
        .doc(userDocId)
        .collection("PAYMENTS")
        .onSnapshot((snapshot) => {
          if (snapshot.size) {
            var feeArr = [];
            snapshot.forEach((doc) => {
              const dataMod = {
                id: doc.data().payement_id,
              };
              feeArr.push(doc.data());
            });

            setFeeDetails(feeArr);
            console.log(feeDetail);
            setLoading(false);
          } else {
            enqueueSnackbar("Something went wrong !", { variant: "error" });
          }
        });
      return () => dbPayemnt();
    } else {
      setLoading(false);
      enqueueSnackbar("User document not found !", { variant: "error" });
    }
  }, [selectedId, selectedRow]);
  const handleFilterButton = () => {
    if (selectedClass !== -1 && selectedSection !== -1) {
      let dataNew = data.filter((data) => {
        return data.class === selectedClass && data.section === selectedSection;
      });
      setFilteredData(dataNew);
      setFilterChipLabel(
        "Filter set for class " +
          selectedClass +
          " and section " +
          selectedSection
      );
      setFilterChip(true);
    } else if (selectedSection === -1 && selectedClass !== -1) {
      let dataNew = data.filter((data) => {
        return data.class === selectedClass;
      });
      setFilteredData(dataNew);
      setFilterChipLabel("Filter set for class " + selectedClass);
      setFilterChip(true);
    }

    console.log(selectedClass, selectedSection);
  };

  const deletestudent = (data) => {
    setDeleteLoading(false);
    setConfirmationModal(true);
    setSelectedStudentUID(data.id);
  };

  const handleStudentDelete = () => {
    setDeleteLoading(true);
    dipatch(deleltedata(selectedStudentUID))
      .unwrap()
      .then((data) => {
        console.log("delete student", data);
        setConfirmationModal(false);
        enqueueSnackbar("Student deleted successfully !", {
          variant: "success",
        });
        setDeleteLoading(false);
      });
  };

  const navigate = useNavigate();
  const updatestudent = (student) => {
    navigate(`/update-student/${student.id}`);
  };
  //payment detail
  const paymentdetailStudent = (paymentcards, index) => {
    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "100px",

          backgroundColor: "var( --bs-success-border-subtle)",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Chip
              avatar={
                <CheckIcon style={{ color: "white", fontSize: "12px" }} />
              }
              label="Paid"
              sx={{
                backgroundColor: "var(--bs-success)",
                fontSize: "15px",
                color: "#fff",
              }}
            ></Chip>
            <h5 style={{ fontSize: "19px" }}>
              &#8377;{paymentcards.paid_amount}
            </h5>
          </div>

          <div className={Styles.paymentDate}>
            <p>11/12/2023</p>
            <p>TXN ID {paymentcards.id}</p>
          </div>
        </div>
        <div
          className={Styles.paymentRightPart}
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <h4>Late Fine: {paymentcards.late_fee}</h4>
          <p>Credited By {paymentcards.credit_by.toUpperCase()}</p>
        </div>
      </Card>
    );
  };

  //column for material table
  const columnMat = [
    {
      field: "student_id",
      title: "ID",
      render: (rowData) => {
        const id = "" + rowData.student_id;

        return <h5>{id.split("@")[0].toLocaleUpperCase()}</h5>;
      },
    },
    {
      title: "Profile",
      field: "profil_url",
      export: false,
      render: (rowData) => {
        const styles = {
          width: 40,
          height: 40,
          borderRadius: "50%",
          cursor: "pointer",
          objectFit: "cover",
        };
        return <img src={rowData.profil_url} style={styles} />;
      },
    },

    { field: "student_name", title: "Name" },
    { field: "class", title: "Class" },
    { field: "section", title: "Section" },
    { field: "class_roll", title: "Roll" },
    // { field: "dob", title: "DOB" },
    // { field: "gender", title: "Gender" },
    // { field: "email", title: "Email" },
    { field: "Contactnumber", title: " Contact number" },
    // { field: "religion", title: " Religion" },
    // { field: "date_of_addmission", title: "DOA" },
    // { field: "city", title: "City" },
    // { field: "state", title: "State" },
    // { field: "Address", title: "Address" },
    // { field: "PostalCode", title: "Postalcode" },
  ];
  const handleDelete = () => {
    setFilterChip(!filterChip);
    if (filterChip) {
      setSelectedClass(-1);
      setSelectedSection(-1);
      setFilteredData(data);
    }
  };

  // if (loading === true) return <h1>loading</h1>;/
  return (
    <PageContainer className={Styles.page}>
      <Navbar />
      <LSPage>
        <ConfirmationModal
          open={confirmationModal}
          setModalOpen={setConfirmationModal}
          handleStudentDelete={handleStudentDelete}
          deleteLoading={deleteLoading}
        />
        <Paper
          sx={{ padding: "5px 10px", width: "100%" }}
          className={Styles.viewStudentHeader}
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
              <PersonIcon sx={{ mr: 0.3 }} fontSize="inherit" />
              Students
            </a>

            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.secondary"
            >
              <GrainIcon sx={{ mr: 0.3 }} fontSize="inherit" />
              View Students
            </Typography>
          </Breadcrumbs>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FormControl
              variant="standard"
              sx={{ mr: 2, padding: 0, minWidth: 150, background: "#fff" }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Select session
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="session"
                value={session}
              >
                <MenuItem value={1}>
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="2023/24">2023/24</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              variant="standard"
              sx={{ mr: 2, padding: 0, minWidth: 150, background: "#fff" }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Select class
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="select class"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <MenuItem value={-1}>
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={1}>One</MenuItem>
                <MenuItem value={2}>Second</MenuItem>
                <MenuItem value={3}>Third</MenuItem>
                <MenuItem value={4}>Fourth</MenuItem>
                <MenuItem value={5}>Fifth</MenuItem>
                <MenuItem value={6}>Sixth</MenuItem>
                <MenuItem value={7}>Seventh</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 0, minWidth: 150 }}>
              <InputLabel id="demo-simple-select-standard-label">
                Select section
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Class"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <MenuItem value={-1}>
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={"A"}>SEC-A</MenuItem>
                <MenuItem value={"B"}>SEC-B</MenuItem>
                <MenuItem value={"C"}>SEC-C</MenuItem>
                <MenuItem value={"D"}>SEC-D</MenuItem>
              </Select>
            </FormControl>
            <IconButton
              sx={{ ml: 2, mr: 2, background: "var(--bs-gray-300)" }}
              onClick={handleFilterButton}
            >
              <SearchIcon />
            </IconButton>
          </div>
        </Paper>
        <br />
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "end",
            alignContent: "end",
          }}
        >
          {filterChip ? (
            <Chip
              label={filterChipLabel}
              variant="filled"
              // onClick={handleClick}
              onDelete={handleDelete}
            />
          ) : null}
        </div>
        <Box sx={{ width: "100%" }}>
          {/* <LinearProgress /> */}
          {isDataLoading ? <LinearProgress /> : null}
        </Box>
        <br></br>
        <MaterialTable
          style={{ display: "grid" }}
          columns={columnMat}
          data={filteredData}
          title="Students Data"
          options={{
            grouping: true,
            headerStyle: {
              backgroundColor: "#5d87ff",
              color: "#FFF",
            },
            exportMenu: [
              {
                label: "Export PDF",
                exportFunc: (cols, datas) =>
                  ExportPdf(cols, datas, "myPdfFileName"),
              },
              {
                label: "Export CSV",
                exportFunc: (cols, datas) =>
                  ExportCsv(cols, datas, "myCsvFileName"),
              },
            ],
            actionsColumnIndex: -1,
          }}
          actions={[
            {
              icon: () => <EditIcon sx={{ color: "var(--bs-primary)" }} />,
              tooltip: "Edit Row",
              onClick: (event, rowData) => {
                updatestudent(rowData);
              },
            },

            {
              icon: () => (
                <DeleteForeverIcon sx={{ color: "var(--bs-danger2)" }} />
              ),
              tooltip: "Delete Student",
              onClick: (event, rowData) => {
                deletestudent(rowData);
              },
            },
            {
              icon: () => (
                <MoreVert
                  aria-controls={menuOpen ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? "true" : undefined}
                />
              ),
              tooltip: "More options",
              onClick: (event, rowData) => {
                console.log(rowData);
                handleMenuClick(event, rowData);
              },
            },
          ]}
        />
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={menuOpen}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleModalOpen}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            View Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClick}>
            <ListItemIcon>
              <BadgeIcon fontSize="small" />
            </ListItemIcon>
            Generate ID Card
          </MenuItem>
          <MenuItem onClick={handleMenuClick}>
            <ListItemIcon>
              <BlockIcon fontSize="small" />
            </ListItemIcon>
            Suspend User
          </MenuItem>
        </Menu>
        {selectedRow ? (
          <Modal
            keepMounted
            open={modalOpen}
            onClose={handleModalClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            sx={{ minHeight: "400px" }}
          >
            <Box sx={style}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={selectedRow.profil_url}
                  width={90}
                  height="100%"
                  style={{ objectFit: "cover" }}
                />

                <div
                  style={{
                    padding: "0px 10px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontSize={20}
                    fontWeight={700}
                    sx={{ margin: 0, p: 0 }}
                  >
                    {selectedRow.student_name.toUpperCase()}
                  </Typography>

                  <div
                    style={{
                      backgroundColor: "var(--bs-secondary)",
                      color: "#fff",
                      display: "flex",
                      width: "100%",
                      padding: "6px",
                      fontSize: "15px",
                    }}
                  >
                    <div>
                      <p style={{ padding: 3, margin: 0 }}>Date Of Birth</p>
                      <p style={{ padding: 3, margin: 0 }}>Date Of Admission</p>
                      <p style={{ padding: 3, margin: 0 }}>Contact</p>
                    </div>
                    <div>
                      <p style={{ padding: 3, margin: 0 }}>
                        : {selectedRow.dob}
                      </p>
                      <p style={{ padding: 3, margin: 0 }}>
                        : {selectedRow.date_of_addmission}
                      </p>
                      <p style={{ padding: 3, margin: 0 }}>
                        : {selectedRow.Contactnumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Basic Info" {...a11yProps(0)} />
                    <Tab label="Parent Info" {...a11yProps(1)} />
                    <Tab label="Exam Marks" {...a11yProps(2)} />
                    <Tab label="Payment Details" {...a11yProps(3)} />
                  </Tabs>
                </Box>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Table>
                  <tr>
                    <td>Name</td>
                    <td>{selectedRow.student_name}</td>
                  </tr>
                  <tr>
                    <td>Class</td>
                    <td>{selectedRow.class}</td>
                  </tr>
                  <tr>
                    <td>Roll No</td>
                    <td>{selectedRow.class_roll}</td>
                  </tr>
                  <tr>
                    <td>Student Id</td>
                    <td>{selectedRow.student_id}</td>
                  </tr>
                  <tr>
                    <td>Birth Date</td>
                    <td>{selectedRow.dob}</td>
                  </tr>
                  <tr>
                    <td>Cast</td>
                    <td>{selectedRow.cast}</td>
                  </tr>
                </Table>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Table>
                  <tr>
                    <td>Father Name</td>
                    <td>{selectedRow.father_name}</td>
                  </tr>
                  <tr>
                    <td>Father Occupation</td>
                    <td>{selectedRow.father_occupation}</td>
                  </tr>
                  <tr>
                    <td>Father Qulifiation</td>
                    <td>{selectedRow.father_qualification}</td>
                  </tr>
                  <tr>
                    <td>Mother Name</td>
                    <td>{selectedRow.mother_name}</td>
                  </tr>
                  <tr>
                    <td>Mother Occupation</td>
                    <td>{selectedRow.mother_occupation}</td>
                  </tr>
                  <tr>
                    <td>Mother Qulification</td>
                    <td>{selectedRow.motherqualifiation}</td>
                  </tr>
                  <tr>
                    <td>Contact Number</td>
                    <td>{selectedRow.Contactnumber}</td>
                  </tr>
                </Table>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={2}>
                Exam Mark
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton variant="solid">
                    <FilterAltIcon />
                  </IconButton>
                </div> */}
                <div>{feeDetail.map(paymentdetailStudent)}</div>
              </CustomTabPanel>
            </Box>
          </Modal>
        ) : null}
        ;
      </LSPage>
    </PageContainer>
  );
}

export default ViewStudents;
