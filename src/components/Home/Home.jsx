import React, { useState } from 'react';
import Sec1 from './Sec1/Sec1';
import Sec2 from './Sec2/Sec2';
import Sec3 from './Sec3/Sec3';
import { HashLoader } from 'react-spinners';
import Sec4 from './Sec4/Sec4';

const Home = () => {
    const [tf, setTf] = useState(false)
    setTimeout(() => {
        setTf(true)
    }, 2000);
    return (
        <div>
            {tf?<div>
                <Sec1></Sec1>
                <Sec2></Sec2>
                <Sec3></Sec3>
                <Sec4></Sec4>
            </div>: 
            <div className='flex justify-center items-center mt-8'>
            <HashLoader color="#6A6662" />
          </div>}
        </div>
    );
};

export default Home;