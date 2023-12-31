import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import LSPage from "../../components/Utils/LSPage";
import PageContainer from "../../components/Utils/PageContainer";
import Card from "../../components/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import GrainIcon from "@mui/icons-material/Grain";
import { Breadcrumbs, Paper, Typography } from "@mui/material";
import { Button } from "@mui/joy";
import { Download } from "@mui/icons-material";
import { fetchTeacher } from "../../store/facultiesSlice";

function Faculties() {
  const facultiesList = useSelector((state) => state.teachers.teacherArray);
  console.log("faculties:", facultiesList);
  const dipatch = useDispatch();
  useEffect(() => {
    if (Array.from(facultiesList).length === 0) {
      dipatch(fetchTeacher());
    }
  }, []);

  return (
    <>
      <PageContainer>
        <Navbar />
        <LSPage>
          <Paper
            style={{
              padding: "10px",
              borderRadius: "5px",
              margin: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
                <PersonIcon sx={{ color: "var(--bs-gray-500)" }} />
                <Typography sx={{ ml: "4px" }}>Faculty Management</Typography>
              </a>

              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                color="text.secondary"
              >
                <GrainIcon sx={{ mr: 0.3 }} fontSize="inherit" />
                Faculties
              </Typography>
            </Breadcrumbs>
            <Button variant="soft" startDecorator={<Download />}>
              Export
            </Button>
          </Paper>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {facultiesList &&
              facultiesList.map((dta) => {
                return <Card facultyData={dta} />;
              })}
          </div>
        </LSPage>
      </PageContainer>
    </>
  );
}

export default Faculties;
