import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Footer from '../Components/Common/Footer'
import NavBar from '../Components/Common/NavBar'
import Contact from "../Pages/Contact";
import AboutUS from "../Pages/AboutUS";
import Product from "../Pages/Shop";
import ScrollToTop from '../Components/Common/ScrollToTop'

const GFARouter = () => {
    return (
        <>
            <ScrollToTop/>
            <NavBar />
            <div>
                <Routes>
                    <Route path='/' element={<Home />} />
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