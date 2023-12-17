import React from "react";
import Styles from "./Cards.module.scss";
import { Button } from "@mui/material";

function Card() {
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
              <Button className={Styles.viewButton} variant="contained" disableElevation>View Details </Button>
      </div>
    </div>
  );
}

export default Card;
