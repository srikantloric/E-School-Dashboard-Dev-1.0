import React from "react";
import PageContainer from "../../components/Utils/PageContainer";
import Navbar from "../../components/Navbar/Navbar";
import LSPage from "../../components/Utils/LSPage";
import {
  Box,
  Breadcrumbs,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  Modal,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Styles from "./ViewStudents.module.scss";
import { useNavigate } from "react-router-dom";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import PreviewIcon from "@mui/icons-material/Preview";
import BadgeIcon from "@mui/icons-material/Badge";
import GrainIcon from "@mui/icons-material/Grain";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
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
import { MoreVert } from "@mui/icons-material";

function ViewStudents() {
  const data = useSelector((state) => state.student.studentarray);
  const loading = useSelector((state) => state.student);

  const dipatch = useDispatch();

  const [filteredData, setFilteredData] = useState(Array.from(data));

  //topbar selection state
  const [session, setSession] = useState("2023/24");
  const [selectedClass, setSelectedClass] = useState(-1);
  const [selectedSection, setSelectedSection] = useState(-1);

  //model state
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  ///menu state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    dipatch(fetchstudent());
    console.log("data fetched..");
  }, []);

  const handleFilterButton = () => {
    if (selectedClass != -1 && selectedSection != -1) {
      let dataNew = data.filter((data) => {
        return data.class === selectedClass && data.section === selectedSection;
      });
      setFilteredData(dataNew);
    } else if (selectedSection == -1) {
      let dataNew = data.filter((data) => {
        return data.class === selectedClass;
      });
      setFilteredData(dataNew);
    }

    console.log(selectedClass, selectedSection);
  };

  const deletestudent = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dipatch(deleltedata(data.id));
      }
    });
  };

  const navigate = useNavigate();
  const updatestudent = (student) => {
    navigate(`/update-student/${student.id}`);
  };

  //column for material table
  const columnMat = [
    { field: "student_id", title: "ID" },
    {
      title: "Profile",
      field: "profil_url",
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

  if (loading === true) return <h1>loading</h1>;
  return (
    <PageContainer className={Styles.page}>
      <Navbar />
      <LSPage>
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
                handleMenuClick(event);
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
        <Modal
          keepMounted
          open={modalOpen}
          onClose={handleModalClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Text in a modal
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
        ;
      </LSPage>
    </PageContainer>
  );
}

export default ViewStudents;
