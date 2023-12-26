import React, { useEffect } from "react";
import Styles from "./Cards.module.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchteacher } from "../../store/facultiesSlice";


function Card() {
const data=useSelector((state)=>state.teacher.teacherArray);
 const navigate =useNavigate();
 const dipatch = useDispatch();
 const FacultyDetail =(teacher) =>{
  navigate(`/Faculties/${teacher.id}`)
 }
 useEffect(() => {
  if (Array.from(data).length === 0) {
    dipatch(fetchteacher());
  }
}, []);
  return (
    <div className={Styles.cardContainer}>
      <div className={Styles.cardHeader}>
        <img src="https://i.pravatar.cc/300"></img>
      </div>
      <div className={Styles.cardBody}>
              <h3>Rohit Kumar</h3>
              <h4>Subject:Hindi</h4>
              <h4>DOJ:01/02/2023</h4>
      </div>
          <div className={Styles.cardFooter}>
              <Button className={Styles.viewButton} variant="contained" disableElevation onClick={FacultyDetail}>View Details </Button>
      </div>
    </div>
  );
}

export default Card;
