import MaterialTable from "@material-table/core";
import React from "react";
import PageContainer from "../../components/Utils/PageContainer";
import LSPage from "../../components/Utils/LSPage";

function StudentFeeList() {

  const DEMO_DATA = [
    { id: 2, name: "Joe" },
    { id: 1, name: "Mary" },
  ];
  const DEMO_COLS = [
    { field: "id", title: "Id" },
    { field: "name", title: "Name" },
  ];
  return (
    <PageContainer>
      <LSPage>
        <MaterialTable columns={DEMO_COLS} data={DEMO_DATA} options={{}} />
      </LSPage>
    </PageContainer>
  );
}

export default StudentFeeList;
