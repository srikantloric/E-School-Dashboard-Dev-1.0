import React, { useEffect } from "react";
import Styles from "./Cards.module.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/logotransparent.png";
import { Skeleton } from "@mui/joy";

function Card({ facultyData }) {
  const navigate = useNavigate();

  const FacultyDetail = (data) => {
    navigate(`/Faculties/${data}`);
  };

  console.log(facultyData);

  return (
    <>
      <div className={Styles.cardContainer}>
        <div className={Styles.cardHeader}>
          <img
            className={Styles.facultyImage}
            src={facultyData.faculty_image}
            loading="lazy"
          ></img>

          {facultyData.leader ? (
            <img className={Styles.badge} src={LOGO}></img>
          ) : null}
        </div>
        <div className={Styles.cardBody}>
          <h3>{facultyData.faculty_name}</h3>
          <p>{facultyData.faculty_specification}</p>
          <h4>{facultyData.doj}</h4>
        </div>
        <div className={Styles.cardFooter}>
          <Button
            className={Styles.viewButton}
            variant="contained"
            disableElevation
            onClick={() => {
              FacultyDetail(facultyData.id);
            }}
          >
            View Details
          </Button>
        </div>
      </div>
    </>
  );
}
export default Card;
