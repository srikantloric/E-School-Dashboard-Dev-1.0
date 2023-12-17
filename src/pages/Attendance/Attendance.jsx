import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import LSPage from "../../components/Utils/LSPage";
import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import PageContainer from "../../components/Utils/PageContainer";
function Attendance() {
  return (
    <>
      <PageContainer>
        <Navbar />
        <LSPage>
          Attendace
        </LSPage>
      </PageContainer>
    </>
  );
}

export default Attendance;
