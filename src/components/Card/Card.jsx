import React, { useEffect } from "react";
import Styles from "./Cards.module.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchteacher } from "../../store/facultiesSlice";


function Card() {
const data=useSelector((state)=>state.teacher.teacherArray);
console.log(data)
 const navigate =useNavigate();
 const dipatch = useDispatch();
 const FacultyDetail =(data) =>{
  navigate(`/Faculties/${data}`)
 }
 useEffect(() => {
  if (Array.from(data).length === 0) {
    dipatch(fetchteacher());
  }
}, []);
 const displayTeacher =(card,index)=>{
  return (
  <div className={Styles.cardContainer} key={card.id}>
  <div className={Styles.cardHeader}>
    <img src="https://i.pravatar.cc/300"></img>
  </div>
  <div className={Styles.cardBody}>
          <h3>{card.faculty_name}</h3>
          <h4>Subject:Hindi</h4>
          <h4>{card.doj}</h4>
  </div>
      <div className={Styles.cardFooter}>
          <Button className={Styles.viewButton} variant="contained" disableElevation onClick={()=>{
          FacultyDetail(card.id)
          }}>View Details </Button>
  </div>
</div>
  )

 }


  return (
    <>{data.map(displayTeacher)}
    </>
   
  );
}

export default Card;
