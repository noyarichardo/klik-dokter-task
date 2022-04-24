import React, { useState } from 'react'
import nookies from 'nookies';
import Router from 'next/router';
import styles from '/styles/Home.module.css'
import Link from 'next/link';
import Layout from '../../components/layouts';


// export async function getServerSideProps(ctx){
//     const cookies = nookies.get(ctx);
//     console.log(cookies);
//     if(cookies.token){
//         return {
//             redirect: {
//                 destination : '/'
//             }
//         }
//     }

//     return {
//         props:{}
//     }
// }

export default function loginP() {
    const [field, setField] = useState({});

    function setvalue(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setField({
            ... field,
            [name]:value
        });
    }

    async function doLogin(e) {
        e.preventDefault();
        const req = await fetch (`${process.env.NEXT_PUBLIC_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(field)

        });
        const res = await req.json();

        if(res){
            nookies.set(null, 'token', res.token);
            Router.replace('/')
        }
    }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.wrap_login_register_form}>
          <form onSubmit={doLogin}> 
              <h1>Please Login here</h1>
              <div className={styles.form_group}>
                <label>Email</label>
                  <input type="email" className="form-control" placeholder="Your Email" name="email" required 
                onChange={setvalue}
                />
              </div>
              <div className={styles.form_group}>
                <label>Password</label>
                  <input type="password" className="form-control" name="password" placeholder="Your Password" required 
                onChange={setvalue}
                />
              </div>
                <div className={styles.form_group}>
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
                <div>Tidak punya akun ? <Link href="/auth/register"><a className={styles.btn_register}>Daftar Disini !</a></Link></div>
            </form>
          </div>
      </div>
    </Layout>
  )
}
