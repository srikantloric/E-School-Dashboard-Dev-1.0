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
import { Button, LinearProgress } from "@mui/joy";
import { Download } from "@mui/icons-material";
import { fetchTeacher } from "../../store/facultiesSlice";
import teachersArray from "../../Teachers";
import { auth, db } from "../../firebase";

function Faculties() {
  const facultiesList = useSelector((state) => state.teachers.teacherArray);
  const dipatch = useDispatch();
  useEffect(() => {
    if (Array.from(facultiesList).length === 0) {
      dipatch(fetchTeacher());
    }
  }, []);

  // const createDataBaseEntry = async () => {
  //   if (teachersArray) {
  //     for (let i = 0; i <= teachersArray.length; i++) {
  //       console.log(teachersArray[i]);
  //       const random = Math.floor(Math.random() * 90000000 + 10000000);
  //       const userEmail = "ops" + random + "@ops.com";
  //       const userPass = "" + teachersArray[i].faculty_phone;
  //       const res = await auth.createUserWithEmailAndPassword(
  //         userEmail,
  //         userPass
  //       );
  //       const userID = res.user.uid;
  //       console.log(userID);
  //       const userData = {
  //         id: userID,
  //         faculty_name: teachersArray[i].faculty_name,
  //         faculty_specification: teachersArray[i].faculty_specification,
  //         faculty_phone: teachersArray[i].faculty_phone,
  //         faculty_aadhar: teachersArray[i].faculty_aadhar,
  //         faculty_gender: teachersArray[i].faculty_gender,
  //         faculty_qualification: teachersArray[i].faculty_qualification,
  //         faculty_address: teachersArray[i].faculty_address,
  //         faculty_image_thumb: "",
  //         faculty_image: teachersArray[i].faculty_image,
  //         faculty_email: userEmail,
  //         faculty_pass: userPass,
  //       };
  //       await db.collection("FACULTIES").doc(userID).set(userData);
  //     }
  //   }
  // };

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
            <Button
              variant="soft"
              startDecorator={<Download />}
              // onClick={createDataBaseEntry}
            >
              Export
            </Button>
          </Paper>

          <br />
          {facultiesList ? null : (
            <LinearProgress thickness={2} sx={{ ml: 2, mr: 2 }} />
          )}
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
