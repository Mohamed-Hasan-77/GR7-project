import React from 'react'
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';

import Navbar from '../Navbar/Navbar'

import success from "../../assets/success.json"
import  whatsApp  from "../../assets/whatsApp.json";

export default function Thanks() {

    const { id } = useParams();


  return <>
    <Navbar/>
    <div className='h-screen   bg-gray-50'>
        
       <div className="container flex items-center pt-24 flex-col">

        <div className=" p-3 md:p-7 py-10 shadow-md shadow-gray-500 bg-white text-center">
            <h1 className=' text-xl md:text-4xl font-bold flex items-center justify-center flex-wrap '> 
                تم استلام طلبك بنجاح 
                <Lottie
                loop={false}
                animationData={success}
                className=" w-16 md:w-28"
                />  
            </h1>

            <p className=' text-lg md:text-xl mt-5'> فريقنا الان يقوم علي قدم وساق لإعداد طلبكم وسيتم إرساله في الوقت المحدد </p>

            <p className='text-xl mt-5'> رقم الطلب : <span className='font-bold'> {id ? id : ""} </span> </p> 


            <p className='text-xl mt-5 flex items-center justify-center gap-3'>  وللتواصل  اضغط هنا
                <a href="https://wa.me/201212250652">
                    <Lottie
                    loop={true}
                    animationData={whatsApp}
                    className=" w-16 md:w-28"
                    />    
                </a>    
            </p> 
        </div>

       </div>

    </div>
    </>
}
