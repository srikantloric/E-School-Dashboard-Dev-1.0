import React from "react";
import UnderConstructionImage from "../../assets/under_construction.png";
import PageContainer from "../../components/Utils/PageContainer";
import Navbar from "../../components/Navbar/Navbar";
import LSPage from "../../components/Utils/LSPage";

function UnderConstruction() {
  return (
    <PageContainer>
      <Navbar />
      <LSPage>
        <center>
          <img
            src={UnderConstructionImage}
            style={{ marginTop: "50px", width: "40%" }}
          ></img>
        </center>
      </LSPage>
    </PageContainer>
  );
}

export default UnderConstruction;
