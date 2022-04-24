// import React from 'react'
import Image from "next/image"
import styles from '../layouts/Layout.module.css'

export default function Header() {
  return (
    <div className={styles.wrap_logo}>
        <Image src="/logo.png" className={styles.logo} width={350} height={100}/>
    </div>
  )
}
