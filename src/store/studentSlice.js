import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db, auth, storageRef } from "../firebase";
import firebase from "../firebase";

import { Alert, Alert2 } from "../components/Utils/Alert";
import Swal from "sweetalert2";


//ADD STUDENT
export const addstudent = createAsyncThunk(
  "add-students/addstudent",
  async ({ studentData, studentProfile },{rejectWithValue}) => {

    let userPass = String(studentData.dob).split("-").reverse().join(""); //extracting password from dob
    const userEmail = "ops" + studentData.admission_no + "@ops.com"; // creating userID using admission no
    studentData["student_id"] = userEmail;

    // return auth.createUserWithEmailAndPassword(userEmail, userPass)
    //   .then((user) => {
    //     const userId = user.user.uid;
    //        db.collection("STUDENTS")
    //       .doc(userId)
    //       .set(studentData)
    //           .then(() => {
    //             console.log("student regitred")
            
    //           }).catch((er) => {
    //         return rejectWithValue(er.message)
    //       })

    //   }).catch((e) => {
    //     console.log(e.message)
    //     return rejectWithValue(e.message)
    //   });



    // / Creating user in db
    return auth
      .createUserWithEmailAndPassword(userEmail, userPass)
      .then((user) => {
        const userId = user.user.uid;
        //adding user to db
        return db.collection("STUDENTS")
          .doc(userId)
          .set(studentData)
          .then((snapshot) => {
            ///uploading user profile in storage
            if (studentProfile) {
              const fileRef = storageRef.child(
                `profileImages/${userId}/${studentData.email}`
              );
              const uploadTask = fileRef.put(studentProfile);
              uploadTask.on(
                "state_changed",
                function (snapshot) {},
                function (error) {
                  return rejectWithValue(error)
                },
                function () {
                  fileRef.getDownloadURL().then((url) => {
                    let fData = {
                      profil_url: url,
                      time_stamp: firebase.firestore.FieldValue.serverTimestamp(),
                    };
                    ///saving image url in doc
                    return db.collection("STUDENTS")
                      .doc(userId)
                      .update(fData)
                      .then(() => {
                        return "user image inserted successfully";
                      }).catch((er) => {
                        return rejectWithValue(er)
                      });
                  });
                }
              );
            } else {
              console.log("no image attached")
            }

          })
          .catch((error) => {
            console.log(error);
            return rejectWithValue(error)
          });
      })
      .catch((error) => {
        console.log(error);
        return rejectWithValue(error)
      });
  }
);

//FETCH STUDENT
export const fetchstudent = createAsyncThunk(
  "student/fetchstudent",
  () => {
    console.log("fetch data query triggered")
    return db
    .collection("STUDENTS")
    .get()
    .then((snap) => {
      const students = [];
        snap.forEach((doc) => {
          students.push({ ...doc.data(), id: doc.id });
        });
        return students;
      })

    // console.log(students);
    // return students;
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
    loading: true,
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
    [addstudent.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
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
      state.error = action.error.message;
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
export default studentslice.reducer;
