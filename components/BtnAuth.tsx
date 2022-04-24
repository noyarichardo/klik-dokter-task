import React from "react";
import nookies from 'nookies';
import Router from 'next/router';
import Link from "next/link";


const AuthButton = props => {
    const isCookies = nookies.get();
    const isCookiesX = isCookies.token;
    let { isLoggedIn } = props;

    function logOut() {
        nookies.destroy(null,'token');
        Router.replace('/auth/login');
    }


  if (isLoggedIn && isCookies.token ) {
    return  <div>
                <Link href="/auth/register">Register</Link>
                <Link href="/auth/login">Login</Link>
             </div>;
  } else {
    return <div>
                <button className="btn btn-primary btn-sm" onClick={logOut}>Log Out</button>
            </div>;
  }
};

export default AuthButton;