import { Fragment } from 'react';
// import { Outlet } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

// import { selectIsCartOpen } from '../../store/cart/cart.selector';
// import { selectCurrentUser } from '../../store/user/user.selector';
// import { signOutStart } from '../../store/user/user.action';

import Master from '../../layouts/master'

const Navigation = () => {
  return (
    <Fragment>
          <Master/>
    </Fragment>
  );
};

export default Navigation;
