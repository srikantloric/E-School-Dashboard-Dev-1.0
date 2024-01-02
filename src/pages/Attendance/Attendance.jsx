import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import LSPage from "../../components/Utils/LSPage";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PageContainer from "../../components/Utils/PageContainer";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import GrainIcon from "@mui/icons-material/Grain";

function Attendance() {
  return (
    <>
      <PageContainer>
        <Navbar />
        <LSPage>
          <div
            style={{
              backgroundColor: "var(--bs-gray-201)",
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
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
                <FingerprintIcon sx={{ color: "var(--bs-gray-500)" }} />
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
        </LSPage>
      </PageContainer>
    </>
  );
}

export default Attendance;
