import React, { useRef, useState } from "react";
import PageContainer from "../../components/Utils/PageContainer";
import Navbar from "../../components/Navbar/Navbar";
import LSPage from "../../components/Utils/LSPage";
import {
  Breadcrumbs,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
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
import { useDispatch, useSelector } from "react-redux";
import { addstudent } from "../../store/studentSlice";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GrainIcon from "@mui/icons-material/Grain";
import { useSnackbar } from "notistack";

function AddStudent() {
  const printRef = useRef();
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef();

  const { enqueueSnackbar } = useSnackbar();

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const [formData, setFormData] = useState({
    student_name: "",
    class_roll: "",
    admission_no: "",
    dob: "",
    date_of_addmission: "",
    gender: "",
    blood_group: "",
    id: "",
    class: "",
    section: "",
    email: "",
    cast: "",
    religion: "",
    father_name: "",
    profil_url: "",
    father_occupation: "",
    father_qualification: "",
    mother_name: "",
    motherqualifiation: "",
    mother_occupation: "",
    city: "",
    state: "",
    PostalCode: "",
    Address: "",
    Contactnumber: "",
    AlternateNumber: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(selectedImage);
    setLoading(true);
    dispatch(
      addstudent({ studentData: formData, studentProfile: selectedImage })
    )
      .unwrap()
      .then((d) => {
        enqueueSnackbar("Successfully Registered", { variant: "success" });
        setLoading(false);
        setSelectedImage(null);
        formRef.current.reset();
      })
      .catch((e) => {
        console.log({ "dispatch error": e });
        enqueueSnackbar(e, { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <PageContainer>
      <Navbar />
      <LSPage>
        <div
          style={{
            backgroundColor: "var(--bs-gray-201)",
            padding: "10px",
            borderRadius: "5px",
            margin: "0px 8px",
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
              <PersonAddIcon sx={{ mr: 0.3 }} fontSize="inherit" />
              Faculty
            </a>

            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="text.secondary"
            >
              <GrainIcon sx={{ mr: 0.3 }} fontSize="inherit" />
              All Faculties
            </Typography>
          </Breadcrumbs>
        </div>
        <br />
        <Paper
          sx={{ padding: "10px 30px", margin: "0px 10px " }}
          className={Styles.paper}
        >
          <div className={Styles.pageHeader}>
            <h3>Add Student Form</h3>
            <ReactToPrint
              content={() => printRef.current}
              copyStyles={true}
              trigger={() => <IconPrinter size={45} />}
            />
          </div>

          <form onSubmit={handleSubmit} ref={formRef}>
            <span className={Styles.inputSeperator}>Personal Details</span>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Name"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      student_name: e.target.value,
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        class: e.target.value,
                      }))
                    }
                    required
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
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Section</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="SECTION"
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        section: e.target.value,
                      }))
                    }
                    required
                  >
                    <MenuItem value={"A"}>SEC-A</MenuItem>
                    <MenuItem value={"B"}>SEC-B</MenuItem>
                    <MenuItem value={"C"}>SEC-C</MenuItem>
                    <MenuItem value={"D"}>SEC-D</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Class Roll No"
                  type="number"
                  variant="outlined"
                  value={formData.classRoll}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      class_roll: e.target.value,
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dob: e.target.value,
                    }))
                  }
                  type="date"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Admission Number"
                  variant="outlined"
                  inputProps={{ minLength: 6 }}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      admission_no: e.target.value,
                    }))
                  }
                  type="number"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Admission Date"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      date_of_addmission: e.target.value,
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    required
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      blood_group: e.target.value,
                    }))
                  }
                  type="text"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Religion"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      religion: e.target.value,
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      cast: e.target.value,
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      father_name: e.target.value,
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      father_occupation: e.target.value,
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      father_qualification: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Mother's Name"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      mother_name: e.target.value,
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      mother_occupation: e.target.value,
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      motherqualifiation: e.target.value,
                    }))
                  }
                  variant="outlined"
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
                  type="number"
                  onChange={(e) =>
                    setFormData((prev) => ({
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
                  type="number"
                  onChange={(e) =>
                    setFormData((prev) => ({
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
                  type="email"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
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
                  onChange={(e) =>
                    setFormData((prev) => ({
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
                  label="city"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      city: e.target.value,
                    }))
                  }
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="state"
                  variant="outlined"
                  required
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      state: e.target.value,
                    }))
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  sx={{ width: "100%" }}
                  label="Postal Code"
                  type="number"
                  variant="outlined"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      PostalCode: e.target.value,
                    }))
                  }
                  required
                />
              </Grid>

              <Typography
                variant="h6"
                marginLeft="1rem"
                width="100%"
                gutterBottom
                sx={{ mt: 5 }}
              >
                Select Student Photo
              </Typography>
              <br></br>

              <input
                type="file"
                accept="image/png ,image/jpeg"
                style={{ display: "none" }}
                id="imageInput"
                onChange={handleImageChange}
              />
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
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
              {/* <p>select image with less size!</p> */}
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
            <Grid sx={{ display: "flex", justifyContent: "end" }}>
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
                {loading ? <CircularProgress /> : null}
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
            <br></br>
          </form>
        </Paper>
      </LSPage>
    </PageContainer>
  );
}

export default AddStudent;
