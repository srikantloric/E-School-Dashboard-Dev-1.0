import {Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import { routesConfig } from "./components/Utils/RoutesConfig";
import { useState } from "react";
import SideBarContext from "./context/SidebarContext";

//Layouts
import AuthenticationLayout from "./layouts/AuthenticationLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthProvider from "./context/AuthContext";
import PrivateRoute from "./utilities/PrivateRoute";
import AddStudent from "./pages/Users/AddStudent";
import ViewStudents from "./pages/Users/ViewStudents";
import UnderConstruction from "./pages/Extras/UnderConstruction";
import UpdateStudent from "./pages/Users/Update";
import FacultyDetail from "./pages/FacutyManagment/FacultyDetail"
import StudentFeeList from "./pages/FeeManager/StudentFeeDetails";
import StudentFeeDetails from "./pages/FeeManager/StudentFeeDetails";
import { useFlags } from "./components/Utils/FlagsProvider";




function App() {
  const routeItems = routesConfig.map(({ to, Component, isHeader,childrens }) => {
    if (!isHeader) {
      return <Route key={to} path={to} element={<Component />} />;
    }
    return "";
  });

  const [isActive, setIsActive] = useState(true);
  const toggle = () => {
    setIsActive(!isActive);
  };

  const setSidebarOpen = (status) => {
    setIsActive(status);
  }

console.log(useFlags())  


  return (
    <SideBarContext.Provider value={{ isActive, toggle,setSidebarOpen }}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<DashboardLayout/>}>
              {routeItems}
              <Route path="/add-students" element={<AddStudent/>}/>
              <Route path="/update-student/:id" element={<UpdateStudent/>}/>
            <Route path="/view-students" element={<ViewStudents />} />
            <Route path="/view-faculties" element={<UnderConstruction />} />
            <Route path="/Faculties/:id" element={<FacultyDetail />} />
            <Route path="/add-faculty" element={<UnderConstruction />} />
            <Route path="/FeeManagement/FeeDetails/:id" element={<StudentFeeDetails />} />
          </Route>          
           <Route path="/login" element={<AuthenticationLayout/>}>
              <Route index element={<Login />} />
           </Route>
        </Routes>
      </AuthProvider>
       
    </SideBarContext.Provider>
  );
}

export default App;
