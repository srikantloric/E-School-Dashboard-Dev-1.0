import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, auth, storageRef } from "../firebase";
import firebase from "../firebase";

import { Alert, Alert2 } from "../components/Utils/Alert";
import Swal from "sweetalert2";


//ADD STUDENT
export const addstudent = createAsyncThunk(
  "add-students/addstudent",
  async ({ studentData, studentProfile }, thunkAPI) => {
    let userPass = String(studentData.dob).split("-").reverse().join(""); //extracting password from dob
    const userEmail = "ops" + studentData.admission_no + "@ops.com"; // creating userID using admission no
    studentData["student_id"] = userEmail;

    /// Creating user in db
    auth
      .createUserWithEmailAndPassword(userEmail, userPass)
      .then((user) => {
        const userId = user.user.uid;


        //adding user to db
        db.collection("STUDENTS")
          .doc(userId)
          .set(studentData)
          .then((snapshot) => {
            ///uploading user profile in storage
            const fileRef = storageRef.child(
              `profileImages/${userId}/${studentData.email}`
            );
            const uploadTask = fileRef.put(studentProfile);
            uploadTask.on(
              "state_changed",
              function (snapshot) {},
              function (error) {},
              function () {
                fileRef.getDownloadURL().then((url) => {
                  let fData = {
                    profil_url: url,
                    time_stamp: firebase.firestore.FieldValue.serverTimestamp(),
                  };
                  ///saving image url in doc
                  db.collection("STUDENTS")
                    .doc(userId)
                    .update(fData)
                    .then(() => {
                      console.log("Image url Update successfully");
                      Alert("Student register Successfully");
                    });
                });
              }
            );
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        Alert2(error.message);
        console.log(thunkAPI.rejectWithValue(error.message));
        return thunkAPI.rejectWithValue(error.message);
      });

    return studentData;
  }
);

//FETCH STUDENT
export const fetchstudent = createAsyncThunk(
  "student/fetchstudent",
  async (classes) => {
    const students = [];

    await db
      .collection("STUDENTS")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          students.push({ ...doc.data(), id: doc.id });
        });
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(students);
    return students;
  }
);

//DELETE STUDENT
export const deleltedata = createAsyncThunk(
  "student/deletestudent",
  async (id) => {
    // for (var i = 0; i <= id.length; i++) {
    //   console.log(id[i]);
    // }
    console.log("delete Student:",id);
    db.collection("STUDENTS")
      .doc(id)
      .delete()
      .then(() => {
        Alert("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    return id;
  }
);

//UPDATE STUDENT
export const updatedatastudent = createAsyncThunk(
  "student/updatestudent",
  async ({ studentdata, imageupdate }) => {
    db.collection("STUDENTS")
      .doc(studentdata.id)
      .set(studentdata)
      .then(() => {
        //uploading profile if changes
        if (imageupdate) {
          storageRef
          .child(`images/${studentdata.email}`)
          .put(imageupdate)
          .then((snapshot) => {
            Alert("Updated Successfully !");
          }).catch(e => {
            console.log("error while uploading image",e)
          });
        } else {
          Alert("Updated Successfully !");
        }

      }).catch((e) => {
        console.log(e)
      });
    return studentdata;
  }
);

const studentslice = createSlice({
  name: "student",
  initialState: {
    studentarray: [],
    loading: false,
    error: null,
  },
  // reducers:{

  // },
  extraReducers: {
    [addstudent.pending]: (state) => {
      state.loading = true;
    },

    [addstudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentarray.push(action.payload);
    },

    [fetchstudent.pending]: (state) => {
      state.loading = true;
    },
    [fetchstudent.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentarray = action.payload;
    },
    [fetchstudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleltedata.pending]: (state) => {
      state.loading = true;
    },
    [deleltedata.fulfilled]: (state, action) => {
      state.loading = false;
      state.studentarray = state.studentarray.filter(
        (student) => student.id !== action.payload
      );
    },
    [deleltedata.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updatedatastudent.pending]: (state) => {
      state.loading = true;
    },
    [updatedatastudent.fulfilled]: (state, action) => {
      state.loading = false;
      const { id, student } = action.payload;
      const studentindex = state.studentarray.findIndex(
        (student) => student.id === id
      );
      if (studentindex !== -1) {
        state.studentarray[studentindex] = { id: id, student };
      }
    },
    [updatedatastudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(addstudent.pending, (state) => {
  //       state.loading = true;
  //     })
  //     builder
  //       .addCase(addstudent.fulfilled, (state, action) => {
  //         state.loading = false;
  //         state.studentarray.push(action.payload);
  //       })
  //       builder.addCase(addstudent.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = action.payload;
  //       })
  //       .addCase(fetchstudent.fulfilled, (state, action) => {
  //         state.studentarray = action.payload;
  //       });

  //   },
});
console.log(studentslice.actions);
export default studentslice.reducer;
