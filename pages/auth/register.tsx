import React, { useState } from 'react'
import Router from 'next/router';
import styles from '/styles/Home.module.css'
import Link from 'next/link';
import Layout from '../../components/layouts';


export default function () {

    const [field, setField] = useState({});

    function setvalue(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setField({
            ... field,
            [name]:value
        });
        console.log(field)
    }

    async function doRegister(e) {
        e.preventDefault();
        const req = await fetch (`${process.env.NEXT_PUBLIC_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(field)

        });
        const res = await req.json();

        if(res){
            Router.replace('/auth/login3')
        }
        e.target.reset();
    }

  return (
    <Layout>
        <div className={styles.container}>
            <div className={styles.wrap_login_register_form}>
                <form onSubmit={doRegister}> 
                <h1>Please Register here</h1>
                <div className={styles.form_group}>
                <label>Email</label>
                    <input type="email" className="form-control" placeholder="Your Email" name="email" required 
                    onChange={setvalue}
                    />
                </div>
                <div className={styles.form_group}>
                <label>Password</label>
                    <input type="password" className="form-control" placeholder="Your Password"  name="password" required 
                    onChange={setvalue}
                    />
                </div>
                    <div className={styles.form_group}>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                    <div>Sudah punya akun ? <Link href="/auth/login"><a className={styles.btn_register}>Login Disini !</a></Link></div>
                </form>
            </div>
        </div>
    </Layout>
  )
}

