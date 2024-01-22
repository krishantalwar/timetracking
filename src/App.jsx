// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

import { Routes, Route } from 'react-router-dom';

// import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
// import Authentication from './routes/authentication/authentication.component';
// import Shop from './routes/shop/shop.component';
// import Checkout from './routes/checkout/checkout.component';
// import { checkUserSession } from './store/user/user.action';
// import SignIn from './pages/login/login';
// import Master from './layouts/master'

import Home from './pages/home/home';

import Forget from './pages/auth/forgot';
import ShiftMaster from './pages/shiftmaster/shiftmaster';

function App() {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkUserSession());
  // }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/shiftmaster' element={<ShiftMaster />} />
      </Route>
      <Route path='forgot' element={<Forget />} />

    </Routes>

  );
}



export default App;
