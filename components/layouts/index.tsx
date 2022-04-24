// import React from 'react'
import Header from "./header"
import Footer from "./footer"
import styles from '../layouts/Layout.module.css'
import { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode;
}

export default function Layout(props:LayoutProps) {
    const {children} = props;
  return (
    <div>
        <Header/>
            <div>{children}</div>
        <Footer/>
    </div>
  )
}
