import Dashboard from "../../pages/Dashboard/Dashboard";
import Students from "../../pages/Users/Students";
import Faculties from "../../pages/FacutyManagment/Faculties";
import Attendance from "../../pages/Attendance/Attendance";
import {
  IconCoinRupee,
  IconDashboard,
  IconFingerprint,
  IconFriends,
  IconMail,
  IconNotes,
  IconPoint,
  IconReceipt2,
  IconUsers,
} from "@tabler/icons-react";
import AddStudent from "../../pages/Users/AddStudent";
import UnderConstruction from "../../pages/Extras/UnderConstruction";
import FeeManager from "../../pages/FeeManager/FeeManager";
import FeaturesConfig from "../../FeaturesConfig";
export const routesConfig = [
  {
    title: "Masters",
    isHeader: true,
  },
  {
    title: "Dashboard",
    to: "/",
    icon: IconDashboard,
    isCollapsable: false,
    isHeader: false,
    Component: Dashboard,
  },
  {
    title: "Students",
    to: "/Students",
    icon: IconFriends,
    isCollapsable: false,
    isHeader: false,
    Component: AddStudent,
    childrens: [
      {
        title: "Add Student",
        to: "/add-students",

        isCollapsable: false,
        isHeader: false,
        Component: <AddStudent />,
      },
      {
        title: "View Student",
        to: "/view-students",
        isCollapsable: false,
        isHeader: false,
        Component: <AddStudent />,
      },
    ],
  },
  {
    title: "Faculties",
    to: "/Faculties",
    icon: IconUsers,
    isCollapsable: false,
    isHeader: false,
    Component: FeaturesConfig.FACULTY_FEATURE ? Faculties : UnderConstruction,
  },
  {
    title: "Management",
    isHeader: true,
  },
  {
    title: "Fee Management",
    to: "/FeeManagement",
    icon: IconCoinRupee,
    isCollapsable: false,
    isHeader: false,
    Component: FeaturesConfig.PAYMENT_FEATURE ? FeeManager : UnderConstruction,
  },
  {
    title: "Attendance ",
    to: "/Attendance",
    icon: IconFingerprint,
    isCollapsable: false,
    isHeader: false,
    Component: FeaturesConfig.ATTENDANCE_FEATURE
      ? Attendance
      : UnderConstruction,
  },

  {
    title: "Fee Receipt",
    to: "/FeeReceipt",
    icon: IconNotes,
    isCollapsable: false,
    isHeader: false,
    Component: UnderConstruction,
  },
  {
    title: "Notification",
    isHeader: true,
  },
  {
    title: "Transaction",
    to: "/Transaction",
    icon: IconReceipt2,
    isCollapsable: false,
    isHeader: false,
    Component: UnderConstruction,
  },
  {
    title: "Message",
    to: "/Message",
    icon: IconMail,
    isCollapsable: false,
    isHeader: false,
    Component: UnderConstruction,
  },
];
