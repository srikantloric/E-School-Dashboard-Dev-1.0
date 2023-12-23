import MaterialTable from "@material-table/core";
import React, { useState } from "react";
import PageContainer from "../../components/Utils/PageContainer";
import LSPage from "../../components/Utils/LSPage";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GrainIcon from "@mui/icons-material/Grain";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  IconButton,
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
import { Link, useNavigate } from "react-router-dom";



//main element
function StudentFeeDetails() {
  const [selectedRow, setSelectedRow] = useState(null);
  const historyRef = useNavigate()

  ///Sof Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowData);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  //Eof Menu State

  const DEMO_DATA = [
    { id: 2, name: "Joe" },
    { id: 1, name: "Mary" },
  ];
  const DEMO_COLS = [
    { field: "id", title: "Id" },
    { field: "name", title: "Student" },
    { field: "name", title: "Parent" },
    { field: "name", title: "Fee Title" },
    { field: "name", title: "Total" },
    { field: "name", title: "Dis." },
    { field: "name", title: "Late Fee" },
    { field: "name", title: "Paid" },
    { field: "name", title: "Due" },
    { field: "name", title: "Status" },
  ];
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
            <Typography>
              OPS214554444
            </Typography>
          </Breadcrumbs>
          <Button
            startIcon={<ControlPointIcon />}
            variant="contained"
            disableElevation
            onClick={()=>{historyRef("/FeeManagement")}}
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
          <Typography sx={{fontSize:"18px"}}>Student Fee Management</Typography>
        </Paper>
        <br />
        <Paper>
          <MaterialTable
            style={{ boxShadow: "none", display: "grid" }}
            columns={DEMO_COLS}
            data={DEMO_DATA}
            title="Fee Details"
            options={{
              headerStyle: {
                backgroundColor: "var(--bs-secondary)",
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
          />{" "}
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
        </Paper>
      </LSPage>
    </PageContainer>
  );
}

export default StudentFeeDetails;
