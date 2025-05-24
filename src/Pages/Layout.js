import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { generateToken, messaging } from '../firebase';

function Layout() {
  const [user, setUser] = useState(0);

  if(localStorage.getItem('user') === '' || localStorage.getItem('user') === 'NaN')
    localStorage.setItem('user', 0);

  useEffect(() => {
    setUser(parseInt(localStorage.getItem('user')));
  }, []);

  const changeUser = () => {
    generateToken();
    localStorage.setItem('user', (parseInt(localStorage.getItem('user')) + 1) % 2);
    setUser(parseInt(localStorage.getItem('user')))
  }

  return (
      <>
        <header>
          <p>{user ? 'Naiden':'Elly'}</p>
          <img src='./settings.png' alt="Settings" onClick={changeUser}/>
        </header>

        <Outlet />
      </>
  );
}

export default Layout;
