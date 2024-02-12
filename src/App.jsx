import { Routes, Route } from "react-router-dom";
import Navigation from "./privateroutes/navigation.component";
import Home from "./pages/home/home";
import Forget from "./pages/auth/forgot";
import ShiftMaster from "./pages/Employer/shiftmaster";
import RolesandResponsibilities from "./pages/Employer/roles & responsibilities";
import AddEmployee from "./pages/Employer/addEmployee";
import TimeTrackingActivities from "./pages/Employer/timeTrackingActivities";
import Joblisting from "./pages/Employer/JobListing";
import Master from "./layouts/master";
import OldMaster from "./layouts/oldmaster";
import SignIn from "./pages/auth/login";
import DepartmentDesignation from "./pages/Employer/departDesig";
import AddEmployeeold from "./pages/Employer/addEmployeeold";
import Profile from "./pages/Employer/profile";
import Password from "./pages/Employer/changePassword";
import TimeTracking from "./pages/Employee/timeTracking";
import Designation from './pages/Employer/designation'
import Department from './pages/Employer/department'

function App() {
  return (
    <Routes>
      <Route element={<Navigation />}>
        <Route path="/" element={<Master />}>
          <Route index element={<Home />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/shiftmaster" element={<ShiftMaster />} />
          <Route
            path="/roles&responsibilities"
            element={<RolesandResponsibilities />}
          />
          <Route
            path="/timetrackingactivities"
            element={<TimeTrackingActivities />}
          />
          <Route path="/joblisting" element={<Joblisting />} />
          <Route
            path="/department_designation"
            element={<DepartmentDesignation />}
          />
          <Route path="/wizzard" element={<AddEmployeeold />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/password" element={<Password />} />
          <Route path="/timetracking" element={<TimeTracking />} />
          <Route path="/designation" element={<Designation />} />
          <Route path="/department" element={<Department />} />
        </Route>
      </Route>

      <Route element={<OldMaster />}>
        <Route path='login' element={<SignIn />} />
        <Route path='forgot' element={<Forget />} />
      </Route>


    </Routes>
  );
}

export default App;
