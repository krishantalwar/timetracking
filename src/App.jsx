import { Routes, Route } from 'react-router-dom';
import Navigation from './privateroutes/navigation.component';
import Home from './pages/home/home';
import Forget from './pages/auth/forgot';
import ShiftMaster from './pages/shiftmaster/shiftmaster';
import RolesandResponsibilities from './pages/roles & responsibilities/roles & responsibilities'
import HorizontalLinearStepper from './pages/addEmployee/employeeDetails'
import TimeTrackingActivities from './pages/addEmployee/timeTrackingActivities'
import JobPost from './pages/addEmployee/JobPost'
import JobListing from './pages/addEmployee/JobListing'
import Master from './layouts/master'
import OldMaster from './layouts/oldmaster'
import SignIn from './pages/auth/login';

function App() {
  return (
    <Routes>
      <Route element={<Navigation />}>
        <Route   path='/'  element={<Master />} >
        <Route index element={<Home />} />
        <Route path='/shiftmaster' element={<ShiftMaster />} />
        <Route path='/addEmployee' element={<HorizontalLinearStepper />} />
        <Route path='/roles&responsibilities' element={<RolesandResponsibilities />} />
        <Route path='/timetrackingactivities' element={<TimeTrackingActivities />} />
         </Route>
      </Route>
      
      <Route   element={<OldMaster/>}>
        <Route path='login' element={<SignIn />} />
        <Route path='forgot' element={<Forget />} />
      </Route>
  

    </Routes>

  );
}



export default App;
