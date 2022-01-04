import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';



const Banner = () => {

    return (
        // banner section
        <section className="w-full h- relative overflow-hidden sm:flex hidden   ">

            <AwesomeSlider  className="customSlider">
                <div data-src="/Images/banner2.webp" />
                <div data-src="/Images/banner4.jpg" />
                <div data-src="/Images/banner3.jpg" />
            </AwesomeSlider>

        </section>
    )
}

export default Banner
