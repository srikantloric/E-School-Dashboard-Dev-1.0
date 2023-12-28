import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import PropTypes from "prop-types";
import LSPage from "../../components/Utils/LSPage";
import PageContainer from "../../components/Utils/PageContainer";
import HomeIcon from "@mui/icons-material/Home";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import Styles from "./FacultiesDetails.module.scss";
import { enqueueSnackbar } from "notistack";
import {
  Box,
  Breadcrumbs,
  Button,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { EditLocation } from "@mui/icons-material";
import { IconEdit } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { db } from "../../firebase";



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
      {value === index && <Box sx={{ pt: 2, pl: 1, pr: 1 }}>{children}</Box>}
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function FacultyDetail() {
  const { id } = useParams();
  const[teacherData,setteacherData]=useState();
  const [value, setValue] = React.useState(0);
  const [feeDetails, setFeeDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const data=useSelector((state)=>state.teacher.teacherArray);
  useEffect(()=>{
    if(id){
      const sigledata =data.filter((ele) => ele.id === id);
      console.log(sigledata);
      setteacherData(sigledata[0]);
      
    }
  },[])
  console.log(teacherData)
  console.log(data);
  console.log(id)
  
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  useEffect(() => {
    setLoading(true);
    console.log(id);
    const userDocId =id;
    // console.log(location.state[0]);
    if (userDocId) {
      const dbSubscriptions = db
        .collection("Faculty")
        .doc(userDocId)
        .collection("Payment")
        .onSnapshot((snapshot) => {
          if (snapshot.size) {
            var paymentArr = [];
            snapshot.forEach((doc) => {
              const dataMod = {
                id: doc.data().payment_id,
              };
              paymentArr.push(doc.data());
            });
            setFeeDetails(paymentArr);
            
            setLoading(false);
          } else {
            enqueueSnackbar("Something went wreong !", { variant: "error" });
          }
        });

        console.log(feeDetails);
      return () => dbSubscriptions();
    } else {
      setLoading(false);
      enqueueSnackbar("User document not found !", { variant: "error" });
    }
  }, []);

  return (
    <>
      <PageContainer>
        <Navbar />
        <LSPage>
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
              <HomeIcon sx={{ mr: 0.3 }} fontSize="inherit" />
              Faculties
            </a>

            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.secondary"
            >
              <GrainIcon sx={{ mr: 0.3 }} fontSize="inherit" />
              Faculty Detail
            </Typography>
          </Breadcrumbs>

          <br></br>
          <br></br>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <div>
                <img
                  src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                  height={150}
                  width={140}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: "5px 15px" }}>
                <h3>{teacherData && teacherData.faculty_name}</h3>

                <div style={{ marginTop: "1rem" }}>
                  <p style={{ padding: 3, margin: 0 }}>
                  Date Of Birth :  {teacherData && teacherData.dob}
                  </p>
                  <p style={{ padding: 3, margin: 0 }}>
                    Date Of Joining : {teacherData && teacherData.doj}
                  </p>
                  <p style={{ padding: 3, margin: 0 }}>
                    Contact : +91-{teacherData && teacherData.faculty_phone_number}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Button variant="outlined" startIcon={<IconEdit />}>
                Edit
              </Button>
            </div>
          </div>

          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Personal Details" {...a11yProps(0)} />
              <Tab label="Qualifications" {...a11yProps(1)} />
              <Tab label="Address" {...a11yProps(2)} />
              <Tab label="Accounts & Ledger" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
          <Paper sx={{ padding: "1rem" }}>
                  <table className={Styles.table}>
                    <tr>
                      <td>Name:</td>
                      <td>{teacherData && teacherData.faculty_name}</td>
                    </tr>
                    <tr>
                      <td>Father Name:</td>
                      <td>{teacherData && teacherData.faculty_father_name}</td>
                    </tr>
                    <tr>
                      <td>School Number:</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>Employ Id:</td>
                      <td>{teacherData && teacherData.faculty_id}</td>
                    </tr>
                    <tr>
                      <td>Birth Date:</td>
                      <td>{teacherData && teacherData.dob}</td>
                    </tr>
                    <tr>
                      <td>Cast:</td>
                      <td>{teacherData && teacherData.cast}</td>
                    </tr>
                  </table>
                </Paper>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          <Paper sx={{ padding: "1rem" }}>
                  <table className={Styles.table}>
                    <tr>
                      <td>Degree:</td>
                      <td>{teacherData && teacherData.faculty_degree}</td>
                    </tr>
                    <tr>
                      <td>Specification Subject:</td>
                      <td>{teacherData && teacherData.faculty_specification}</td>
                    </tr>
                    <tr>
                      <td>Collage:</td>
                      <td>{teacherData && teacherData.faculty_pastoutcollege}</td>
                    </tr>
                    <tr>
                      <td>Previous Job:</td>
                      <td>{teacherData && teacherData.faculty_id}</td>
                    </tr>
                    <tr>
                      <td>:</td>
                      <td>{teacherData && teacherData.dob}</td>
                    </tr>
                    <tr>
                      <td>Cast:</td>
                      <td>{teacherData && teacherData.cast}</td>
                    </tr>
                  </table>
                </Paper>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className={Styles.address_container}>
              <div className={Styles.address_container_leftbar}></div>
              <div className={Styles.address_container_mainsection}></div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <TableContainer component={Paper} sx={{ borderRadius: 0 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CustomTabPanel>
        </LSPage>
      </PageContainer>
    </>
  );
}

export default FacultyDetail;
