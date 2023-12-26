import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import PageContainer from "../../components/Utils/PageContainer";
import LSPage from "../../components/Utils/LSPage";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GrainIcon from "@mui/icons-material/Grain";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Code, Delete, Edit, MoreVert } from "@mui/icons-material";
import PaymentIcon from "@mui/icons-material/Payment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { enqueueSnackbar } from "notistack";
import { Input, Modal, ModalClose, Sheet, Typography } from "@mui/joy";

//main element
function StudentFeeDetails() {
  const [selectedRow, setSelectedRow] = useState(null);
  const [feeDetails, setFeeDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const historyRef = useNavigate();
  const location = useLocation();

  ///Sof Menu State
  const [anchorEll, setAnchorEll] = useState(null);
  const menuOpen = Boolean(anchorEll);
  const [modelOpen, setModelOpen] = useState(false);
  const handleMenuClick = (event, rowData) => {
    setAnchorEll(event.currentTarget);
    setSelectedRow(rowData);
  };
  const handleMenuClose = () => {
    setAnchorEll(null);
  };
  //Eof Menu State

  const DEMO_COLS = [
    {
      field: "id",
      title: "Payment ID",
    },
    // { field: "name", title: "Student" },
    // { field: "name", title: "Parent" },
    { field: "fee_title", title: "Fee Title" },
    { field: "fee_total", title: "Total" },
    { field: "discount_amount", title: "Disc." },
    { field: "late_fee", title: "Late Fee" },
    { field: "paid_amount", title: "Paid" },
    { field: "due_amount", title: "Due" },
    {
      field: "payment_status",
      title: "Status",
      render: (rowData) => {
        const styles = {
          width: 40,
          height: 40,
          borderRadius: "50%",
          cursor: "pointer",
          objectFit: "cover",
        };
        return (
          <p
            style={{
              color: "var(--bs-white)",
              backgroundColor: `${
                rowData.payment_status === "paid"
                  ? "var(--bs-success)"
                  : "var(--bs-danger2)"
              }`,
              textAlign: "center",
              textTransform: "capitalize",
            }}
          >
            {rowData.payment_status}
          </p>
        );
      },
    },
  ];

  useEffect(() => {
    setLoading(true);
    const userDocId = location.state[0].id;
    console.log(location.state[0]);
    if (userDocId) {
      db.collection("STUDENTS")
        .doc(userDocId)
        .collection("PAYMENTS")
        .get()
        .then((documetSnap) => {
          if (documetSnap.size) {
            var feeArr = [];
            documetSnap.forEach((doc) => {
              const dataMod = {
                id: doc.data().payement_id,
              };
              feeArr.push(doc.data());
            });
          }
          // enqueueSnackbar("fetched successfully..", { variant: "success" });
          setFeeDetails(feeArr);
          setLoading(false);
        })
        .catch((e) => {
          enqueueSnackbar(e.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      enqueueSnackbar("User document not found !", { variant: "error" });
    }
  }, []);

  return (
    <PageContainer>
      <LSPage>
        <div
          style={{
            backgroundColor: "var(--bs-gray-201)",
            padding: "10px",
            borderRadius: "5px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            <Typography>OPS214554444</Typography>
          </Breadcrumbs>
          <Button
            startIcon={<ControlPointIcon />}
            variant="contained"
            disableElevation
            onClick={(e) => {
              historyRef("/FeeManagement");
            }}
          >
            Search Another
          </Button>
        </div>
        <br />
        <Paper
          sx={{
            padding: "8px",
            background: "var(--bs-primary)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowCircleRightIcon sx={{ mr: "5px" }} />
          <Typography sx={{ fontSize: "18px", color: "#fff" }}>
            Student Fee Management
          </Typography>
        </Paper>
        <br />
        <Paper sx={{ backgroundColor: "#FBFCFE", display: "flex" }}>
          <div style={{ margin: "10px" }}>
            <img
              src={location.state[0].profil_url}
              width={90}
              height="100%"
              style={{ objectFit: "cover" }}
            ></img>
          </div>
          <div
            style={{
              margin: "10px 10px 10px 0px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div>
              <h4 style={{ margin: 0, padding: 0, textTransform: "uppercase" }}>
                {location.state[0].student_name}
              </h4>
              <p
                style={{
                  margin: "10px 0px 0px 0px",
                  padding: 0,
                  fontSize: "14px",
                }}
              >
                Father's Name : {location.state[0].father_name}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#F0F4F8",
                display: "flex",
                gap: "20px",
                marginTop: "10px",
                padding: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p style={{ margin: 0, padding: 0 }}>Class</p>
                <p style={{ margin: 0, padding: 0 }}>
                  {location.state[0].class}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p style={{ margin: 0, padding: 0 }}>Roll</p>
                <p style={{ margin: 0, padding: 0 }}>
                  {location.state[0].class_roll}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <p style={{ margin: 0, padding: 0 }}>Admission No</p>
                <p style={{ margin: 0, padding: 0 }}>
                  {location.state[0].admission_no}
                </p>
              </div>
            </div>
          </div>
        </Paper>
        <br />
        {loading ? <LinearProgress /> : null}

        <MaterialTable
          style={{ display: "grid" }}
          columns={DEMO_COLS}
          data={feeDetails}
          title="Fee Details"
          options={{
            headerStyle: {
              backgroundColor: "var(--bs-secondary)",
              color: "#FFF",
            },
            exportAllData: true,
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
                // updatestudent(rowData);
                handleMenuClick(event);
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
                // console.log(rowData);
                handleMenuClick(event);
              },
            },
          ]}
        />

        <Menu
          anchorEl={anchorEll}
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
          <MenuItem onClick={() => setModelOpen(true)}>
            <ListItemIcon>
              <PaymentIcon fontSize="small" />
            </ListItemIcon>
            Quick Payment
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClick}>
            <ListItemIcon>
              <PaymentIcon fontSize="small" />
            </ListItemIcon>
            Pay All :Student
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClick}>
            <ListItemIcon>
              <PrintIcon fontSize="small" />
            </ListItemIcon>
            Print Recipt
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClick}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            Edit
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClick}>
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>
        </Menu>

        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={modelOpen}
          onClose={() => setModelOpen(false)}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Sheet
            variant="outlined"
            sx={{
              width: 550,
              minHeight: 600,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <div style={{ display: "flex" }}>
              <ElectricBoltIcon />
              <Typography level="title-lg" mb={1}>
                Quick Payment
              </Typography>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                height: 550,
              }}
            >
              <div>fsfsd</div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography level="h3" sx={{ color: "var(--bs-danger)" }}>
                  Rs.100{" "}
                  <span style={{ fontSize: "16px", fontWeight: 400 }}>Due</span>
                </Typography>

                <div style={{ display: "flex" }}>
                  <Input placeholder="enter amount" sx={{ ml: 3 }} />
                  <Button
                    variant="contained"
                    disableElevation
                    sx={{ ml: 2 }}
                    color="success"
                  >
                    Pay Now
                  </Button>
                </div>
              </div>
            </div>
          </Sheet>
        </Modal>
      </LSPage>
    </PageContainer>
  );
}

export default StudentFeeDetails;
