import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import nookies from 'nookies';
import Router from 'next/router';
import AuthButton from '../components/BtnAuth';
import Layout from '../components/layouts';



export async function getServerSideProps({req}) {
 req = await fetch (`${process.env.NEXT_PUBLIC_URL}/api/items`, {
      method: 'GET',
  });
 const itemD = await req.json()
  return {
    props: {
      itemD,
    },
  }
}


const Home: NextPage = ({itemD}) => {

    async function deleteProduct(sku) {
        const getToken = nookies.get();
        const req = await fetch (`${process.env.NEXT_PUBLIC_URL}/api/item/delete`, {
            method: "POST",
            headers: { 
            'Authorization': `${getToken.token}`,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(
            {sku:sku}
            )
            
        });
        const res = await req.json();
        if(res){
            Router.replace('/')
        }
    }
  
  return (
   <>
    <Head>
        <title>Klik Dokter - Task</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
    </Head>

    <Layout>
        <div className='container'>
            <div className={styles.wrap_btn_login_register}>
                <AuthButton/>
            </div>
            <div className={styles.wrap_table}>
                <div className={styles.wrap_btn_add}>
                <Link href="/AddProduct">
                    <a className={styles.btn_primary}>Add Product</a>
                </Link>
                </div>
                <table className="table table-responsive">
                
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">SKU</th>
                        <th scope="col">Product Name</th>
                        <th scope="col" className={styles.width15}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {itemD.map((obtDt, i) => (<tr key = {i}>
                            <td>{obtDt.sku}</td>
                            <td>{obtDt.product_name}</td>
                            <td className={styles.wrap_btn_table}>
                                <a key={obtDt.id} className="btn btn-primary btn-sm pr-1" onClick={() => Router.push(`/${obtDt.sku}`)}>Edit</a>

                                <button id="delete_btn" className="btn btn-danger btn-sm" onClick={()=> deleteProduct(obtDt.sku)}>Delete</button>
                            </td>   
                        </tr>))}
                    </tbody>
                </table>
            </div>

        </div>
      </Layout>

   </>
  )
}

export default Home
