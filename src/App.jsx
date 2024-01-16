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
import Npi from './pages/npi/npiform';

function App() {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(checkUserSession());
  // }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Npi />} />

        {/* <Route index element={<Home />} /> */}
      </Route>
    </Routes>

  );
}



export default App;
