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
  Typography,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import PaymentIcon from "@mui/icons-material/Payment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { enqueueSnackbar } from "notistack";

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
          enqueueSnackbar("fetched successfully..", { variant:"success"});
          setFeeDetails(feeArr);
          setLoading(false);
        })
        .catch((e) => {
          enqueueSnackbar(e.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      enqueueSnackbar("User document not found !", { variant:"error"});
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
          <Typography sx={{ fontSize: "18px" }}>
            Student Fee Management
          </Typography>
        </Paper>
        <br />
        {loading ? <LinearProgress /> : null}
        <br />
        {feeDetails ? (
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
        ) : null}

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
          <MenuItem>
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
            Print Voucher
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
      </LSPage>
    </PageContainer>
  );
}

export default StudentFeeDetails;
