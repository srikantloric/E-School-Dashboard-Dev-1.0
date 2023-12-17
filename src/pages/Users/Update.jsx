import React, { useEffect, useRef, useState } from "react";
import PageContainer from "../../components/Utils/PageContainer";
import Navbar from "../../components/Navbar/Navbar";
import LSPage from "../../components/Utils/LSPage";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Styles from "./AddStudent.module.scss";
import { IconPrinter } from "@tabler/icons-react";
import ReactToPrint from "react-to-print";
import { Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addstudent, updatedatastudent } from "../../store/studentSlice";
import { useParams } from "react-router-dom";

function UpdateStudent() {
  const printRef = useRef();
  const dispatch = useDispatch();
  const [updatedata, setupdata] = useState();
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const[profileImage,setProfileimage]=useState("")      
  const users = useSelector((state) => state.student.studentarray);
 

  useEffect(() => {
    if (id) {
      const sigledata = users.filter((ele) => ele.id === id);
      setupdata(sigledata[0]);
      setProfileimage(sigledata[0].profil_url);
      console.log(sigledata[0].profil_url)
    }
  }, []);

  


  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  const updatastudentdata=(e)=>{
   e.preventDefault();
   dispatch(updatedatastudent({studentdata:updatedata,imageupdate:selectedImage}))

  }
  console.log(updatedata);
  

 

  //   const [formData, setFormData] = useState({
  //     Name: "",
  //     classRoll:"",
  //     admissionno: "",
  //     dateOfBirth: "",
  //     addmissiondate: "",
  //     gender: "",
  //     Bloodgroup:"",
  //     Religion:"",
  //     class: "",
  //     Email:"",
  //     Cast:"",
  //     Religion:"",
  //    Fathername: "",
  //    fatheroccupation:"",
  //    fatherQualification:"",
  //    Mothername:"",
  //    motherqualifiation:"",
  //    motheroccupation:"",
  //    City:"",
  //    State:"",
  //    PostalCode:"",
  //    Address:"",
  //    Contactnumber:"",
  //    AlternateNumber:"",

  //   });

  // function nextButton(e) {
  //   e.preventDefault()
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedImage);
  };
 const canclebutton =()=>{
      window.history.back()            
 }
  return (
    <PageContainer>
      <Navbar />
      <LSPage>
        <Paper
          sx={{ padding: "10px 30px", margin: "0px 10px " }}
          className={Styles.paper}
        >
          <div className={Styles.pageHeader}>
            <h3>Update Student Data</h3>
            <ReactToPrint
              content={() => printRef.current}
              copyStyles={true}
              trigger={() => <IconPrinter size={45} />}
            />
          </div>

          <form onSubmit={updatastudentdata}>
            <span className={Styles.inputSeperator}>Personal Details</span>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Name"
                  value={updatedata && updatedata.Name}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      Name: e.target.value,
                    }))
                  }
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Class</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Class"
                    value="kunda"
                    onChange={(e) =>
                      setupdata((prev) => ({
                        ...prev,
                        class: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value={1}>STD - I</MenuItem>
                    <MenuItem value={2}>STD - II</MenuItem>
                    <MenuItem value={3}>STD - III</MenuItem>
                    <MenuItem value={4}>STD - IV</MenuItem>
                    <MenuItem value={5}>STD - V</MenuItem>
                    <MenuItem value={6}>STD - VI</MenuItem>
                    <MenuItem value={7}>STD - VII</MenuItem>
                    <MenuItem value={8}>STD - VIII</MenuItem>
                    <MenuItem value={9}>STD - IX</MenuItem>
                    <MenuItem value={10}>STD - X</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Class Roll No"
                  type="number"
                  variant="outlined"
                  value={updatedata && updatedata.classRoll}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      classRoll: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="DOB"
                  variant="outlined"
                  value={updatedata && updatedata.dateOfBirth}
                  focused="true"
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      dateOfBirth: e.target.value,
                    }))
                  }
                  type="date"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Admission Date"
                  variant="outlined"
                  focused="true"
                  value={updatedata && updatedata.addmissiondate}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      addmissiondate: e.target.value,
                    }))
                  }
                  type="date"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    defaultValue={updatedata && updatedata.gender}
                    onChange={(e) =>
                      setupdata((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Blood Group"
                  variant="outlined"
                  value={updatedata && updatedata.Bloodgroup}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      Bloodgroup: e.target.value,
                    }))
                  }
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Religion"
                  variant="outlined"
                  value={updatedata && updatedata.Religion}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      Religion: e.target.value,
                    }))
                  }
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Cast"
                  value={updatedata && updatedata.Cast}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      Cast: e.target.value,
                    }))
                  }
                  variant="outlined"
                  type="text"
                />
              </Grid>
            </Grid>
            {/* Family Details */}
            <br />
            <br />
            <span className={Styles.inputSeperator}>Family Details</span>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Father's Name"
                  variant="outlined"
                  value={updatedata && updatedata.Fathername}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      Fathername: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Occupation"
                  variant="outlined"
                  value={updatedata && updatedata.fatheroccupation}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      fatheroccupation: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Qualification"
                  variant="outlined"
                  value={updatedata && updatedata.fatherQualification}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      fatherQualification: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Mother's Name"
                  value={updatedata && updatedata.Mothername}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      Mothername: e.target.value,
                    }))
                  }
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Occupation"
                  value={updatedata && updatedata.motheroccupation}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      motheroccupation: e.target.value,
                    }))
                  }
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Qualification"
                  value={updatedata && updatedata.motherqualifiation}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      motherqualifiation: e.target.value,
                    }))
                  }
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>

            {/* Correspondance */}
            <br />
            <br />
            <span className={Styles.inputSeperator}>Contact Details</span>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Contact Number"
                  variant="outlined"
                  value={updatedata && updatedata.Contactnumber}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      Contactnumber: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Contact Alternate"
                  value={updatedata && updatedata.AlternateNumber}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      AlternateNumber: e.target.value,
                    }))
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Email"
                  variant="outlined"
                  value={updatedata && updatedata.Email}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      Email: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Address Full"
                  variant="outlined"
                  value={updatedata && updatedata.Address}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      Address: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="City"
                  value={updatedata && updatedata.City}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      City: e.target.value,
                    }))
                  }
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="State"
                  variant="outlined"
                  required
                  value={updatedata && updatedata.State}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      State: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Postal Code"
                  variant="outlined"
                  value={updatedata && updatedata.PostalCode}
                  onChange={(e) =>
                    setupdata((prev) => ({
                      ...prev,
                      PostalCode: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              {/* <IconButton color="primary" aria-label="upload picture" component="span">
      <PhotoCamera />
    </IconButton> */}
            
              <Typography
                variant="h6"
                marginLeft="1rem"
                width="100%"
                gutterBottom
              >
                Profile Image Upload
              </Typography>
              <br></br>

              <input
                type="file"
                accept="image/png ,image/jpeg"
                style={{ display: "none" }}
                id="imageInput"
                onChange={handleImageChange}
              />
              {selectedImage ? <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Profile"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />:  (
                <img
                  src={profileImage}
                  alt="Selected Profile"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              )}
              <br></br>
              <label htmlFor="imageInput">
                <Button
                  component="span"
                  variant="outlined"
                  style={{ marginTop: "10px", marginLeft: "1rem" }}
                >
                  Choose Image
                </Button>
              </label>
              {/* <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={handleImageUpload}
        >
          Upload Image
        </Button> */}
            </Grid>
            <br />
            <FormGroup>
              <FormControlLabel
                required
                control={<Checkbox />}
                label="I here by confirm that above details provided are correct and only used for official purpose."
              />
            </FormGroup>
            <br />
            <Grid md={12} sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                sx={{
                  height: "3em",

                  background: "var(--bs-secondary)",
                }}
                variant="contained"
                disableElevation
              >
                Reset
              </Button>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  marginLeft: "1rem",
                }}
              >
                <Button variant="contained" color="primary" type="submit">
                  Update Profil
                </Button>
              </Grid>
              {/* <ReactToPrint
                content={() => printRef.current}
                copyStyles={true}
                trigger={() => (
                  <Button variant="outlined" sx={{ margin: "0px 10px" }}>
                    Print Form
                  </Button>
                )}
              /> */}
              <Button
                sx={{ height: "3em", marginLeft: "1rem",background:"Red" }}
                variant="contained"
                disableElevation={true}
                 onClick={canclebutton}
              >
                Cancle
              </Button>
            </Grid>
            <br></br>
          </form>
        </Paper>
      </LSPage>
    </PageContainer>
  );
}

export default UpdateStudent;
