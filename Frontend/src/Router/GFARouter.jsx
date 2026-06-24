import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import TopHead from '../Components/Common/TopHead'
import Footer from '../Components/Common/Footer'
import NavBar from '../Components/Common/NavBar'
import Contact from "../Pages/Contact";
import AboutUS from "../Pages/AboutUS";
import Product from "../Pages/Shop";

const GFARouter = () => {
    return (
        <>
            <TopHead />
            <NavBar />
            <div>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/shop' element={<Product />} />
                    <Route path='/about' element={<AboutUS />} />
                    <Route path='/contact' element={<Contact />} />
                </Routes>
            </div>
            <Footer />

        </>
    )
}

export default GFARouter