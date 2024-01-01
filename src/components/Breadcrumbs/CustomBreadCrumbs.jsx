import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";

function CustomBreadCrumbs() {
  return (
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
  );
}

export default CustomBreadCrumbs;
