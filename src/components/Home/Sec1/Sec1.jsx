import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/caru1.png'
import img2 from '../../../assets/caru2.png'
import img3 from '../../../assets/caru3.png'
import img4 from '../../../assets/caru4.png'

const Sec1 = () => {
    return (
        <div>
            <Carousel autoPlay={true} infiniteLoop={true} className='text-center'>
                <div>
                    <img src={img1} className='w-full' />
                </div>
                <div>
                    <img src={img2} className='w-full' />
                </div>
                <div>
                    <img src={img3} className='w-full' />
                </div>
                <div>
                    <img src={img4} className='w-full' />
                </div>
            </Carousel>
        </div>
    );
};

export default Sec1;