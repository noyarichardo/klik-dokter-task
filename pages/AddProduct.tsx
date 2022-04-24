import React from 'react'
import { useState } from 'react'
import nookies from 'nookies';
import Router from 'next/router';
import styles from '/styles/Home.module.css'
import Layout from '../components/layouts';
import Link from 'next/link';


export default function AddProduct() {

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
    
    async function doAdd(e) {
        e.preventDefault();
        const getToken = nookies.get();
        const req = await fetch (`${process.env.NEXT_PUBLIC_URL}/api/item/add`, {
            
            method: "POST",
            headers: { 
                 'Authorization': `${getToken.token}`,
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(field)
            
        });
        const res = await req.json();
        if(res){
            Router.replace('/')
        }
    }

  return (
      <Layout>
        <div className={styles.container}>
            <div className={styles.wrap_login_register_form}>
                <form onSubmit={doAdd}> 
                <h1>Add New Product</h1>
                <div className={styles.form_group}>
                <label>SKU</label>
                <input type="text" className="form-control" placeholder="SKU Number" name="sku" onChange={setvalue} required/>
                </div>
                <div className={styles.form_group}>
                <label>Nama Produk</label>
                <input type="text" className="form-control" placeholder="Product Name" name="product_name" onChange={setvalue} required/>
                </div>
                <div className={styles.form_group}>
                <label>Quantity</label>
                <input type="text" className="form-control" placeholder="Quantity" name="qty" onChange={setvalue} required/>
                </div>
                <div className={styles.form_group}>
                <label>Harga</label>
                <input type="text" className="form-control" placeholder="The Price" name="price" onChange={setvalue} required/>
                </div>
                <div className={styles.form_group}>
                    <label>Unit</label>
                    <select className="form-control" name="unit" onChange={setvalue} required>
                        <option value="carton">Carton</option>
                        <option value="carbon">Carbon</option>
                        <option value="valid">Valid</option>
                    </select>
                </div>
                <div className={styles.form_group}>
                    <label>Status</label>
                    <input type="text" className="form-control" placeholder="Status" name="status" onChange={setvalue} required/>
                </div>
                <div className={styles.form_group}>
                    <Link href="/"><a className={styles.btn_cancel}>Batalkan</a></Link>
                    <button type="submit" className="btn btn-primary">Add Product</button>
                </div>
                </form>
            </div>
        </div>
    </Layout>
  )
}
