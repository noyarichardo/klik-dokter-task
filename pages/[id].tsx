import React from 'react'
import Router, { useRouter } from 'next/router'
import nookies from 'nookies';
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import Layout from '../components/layouts';
import Link from 'next/link';


export async function getServerSideProps(context) {
    const { id } = context.params;
    const getToken = nookies.get();
    const res = await fetch(`https://hoodwink.medkomtek.net/api/item/search`, {
        method: "POST",
        headers: { 
                'Authorization': `${getToken.token}`,
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(
            {sku:id}
        )
    });
    
    const product = await res.json();
    return{
        props: {
            product,
        },
    };
}

export default function detailProduct(props) {
    const router = useRouter();
    const {id} = router.query;
    const {product} = props;

    const [field, setField] = useState({});

    function setvalue(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setField({
            ... field,
            [name]:value,

        });
    }

    async function doUpdate(e) {
        e.preventDefault();
        const getToken = nookies.get();
        const req = await fetch (`${process.env.NEXT_PUBLIC_URL}/api/item/update`, {
            
            method: "POST",
            headers: { 
                    'Authorization': `${getToken.token}`,
                // 'Accept'       : 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(props.field)
        
        });
        const res = await req.json();
        if(res){
            Router.replace('/')
        }
    }

return (
    
        <>
        <Layout>
            <div className={styles.container}>
                <div className={styles.wrap_login_register_form}>
                    <form onSubmit={doUpdate}>
                        <h1>Edit Product SKU : <br/> {product.sku} </h1>
                        <div className={styles.form_group}>
                                <label>SKU</label>
                                <input type="text" placeholder={product.sku} name="sku" onChange={setvalue}/>
                        </div>
                        <div className={styles.form_group}>
                                <label>Product Name</label>
                                <input type="text" placeholder={product.product_name} name="product_name" onChange={setvalue}/>
                        </div>
                        <div className={styles.form_group}>
                                <label>Quantity</label>
                                <input type="text" placeholder={product.qty} name="qty" onChange={setvalue}/>
                        </div>
                        <div className={styles.form_group}>
                                <label>Price</label>
                                <input type="text" placeholder={product.price} name="price" onChange={setvalue}/>
                        </div>
                        <div className={styles.form_group}>
                                <label>Unit</label>
                                <input type="text" placeholder={product.unit} name="unit" onChange={setvalue}/>
                        </div>
                        <div className={styles.form_group}>
                                <label>Status</label>
                                <input type="text" placeholder={product.status} name="status" onChange={setvalue}/>
                        </div>
                        <div className={styles.form_group}>
                            <Link href="/"><a className={styles.btn_cancel}>Batalkan</a></Link>
                            <button type="submit" className={styles.btn_simpan}>Simpan Data</button>
                        </div>
                    </form>
                </div>
            </div>
          </Layout>
        </>
    );
}
