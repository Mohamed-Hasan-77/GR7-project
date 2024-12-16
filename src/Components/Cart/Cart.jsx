import {  useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from "axios";
import { MdOutlineDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { CartContext } from "../../contexts/CartContext";


import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";


import "./CartStyle.scss"


export default function Cart() {


    const navigate = useNavigate();

    const [isNow, setIsNow] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState("");
    const [name, setName] = useState("");
    const [address, setaddress] = useState("");
    const [orderCode, setorderCode] = useState("");
    const [error, setError] = useState("");
    const [selectedTime, setSelectedTime] = useState('');

    const times = [
      '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
      '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM'
    ];

    const { cart, removeFromCart, getTotalCartPrice, shipping, loading  } = useContext(CartContext);    

    function handlePhoneNumber(value) {
        setPhoneNumber(value)
    }


    const invoiceRef = useRef();
    const invoiceRef2 = useRef();
    const nameInputRef = useRef(null);
    const addressRef = useRef(null);

    function downloadInvoice(event) {
        event.preventDefault();

        if( phoneNumber == "" || nameInputRef.current.value.trim() == "" || addressRef.current.value.trim() == "" ) {
            setError(" الرجاء إكمال البيانات ")
            return
        }

        setName(nameInputRef.current.value)
        setaddress(addressRef.current.value)       
        handleData()
  

        
        setTimeout(()=> {
            cart.length = 0
            // Swal.fire({
            //     title: ' تم الطلب بنجاح',
            //     text: '',
            //     icon: 'success',
            //     confirmButtonText: 'Done',
            //     timer: 2500
            // }); 
            navigate(`/successfull/${orderCode}`)
            generateOrderCode()
            
        }, 100)

    }

    function generateOrderCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 5; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setorderCode(code)
    };


    async function sendUserData(userData) {

        // try and catch if you are not sure if there will be an error with api 
        try {
            let { data } = await axios.post("https://sheetdb.io/api/v1/ln5fv55llnhkn", userData,
                
            );

            // catch the error 
        } catch (err) {
            // console.log(err.response);

            alert("something Wrong happened please try again")

        }

    }

    const handleData = () => {
        let userInfo = {};
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${day}-${month}-${year}`;
        
        let order_data = []

        for( let i=0;  i < cart.length; i++) {
            order_data.push(`${cart[i].title} : ${cart[i].weight}KG || `)
        }

        let order_data_string = order_data.toString() 

        // store User Data 
        userInfo.Date = currentDate;
        userInfo.Name = nameInputRef.current.value;
        userInfo.address = addressRef.current.value;
        userInfo.Phone = phoneNumber;
        userInfo.orderNumber = orderCode;
        userInfo.Products = order_data_string;
        userInfo.Price = getTotalCartPrice();

        // let delivery = `${time.hour} - ${time.minute}  ` 

        isNow ? userInfo.delivery_Time = "الان" : userInfo.delivery_Time = selectedTime ;
        
        setTimeout(()=> {
            sendUserData(userInfo)
        }, 10)

        setTimeout(() => {
            nameInputRef.current.value = '';
            setPhoneNumber('');
            addressRef.current.value = '';
        }, 800)

    };



    useEffect(() => {
        generateOrderCode()
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },[])

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },[error])



    return <>

    <Navbar/>
    <div   className="cart  min-h-screen py-14 pb-28 ">
        <div className=" md:container px-5  md:flex md:justify-center ">

            <div className="paymentBox w-full md:w-2/3 lg:w-1/2 p-5  md:p-10 rounded-2xl shadow shadow-gray-600 bg-white flex flex-col md:flex-row gap-5">

                    <form onSubmit={downloadInvoice} className="mt-5 w-full" >

                            <h2 className=" text-xl md:text-2xl font-bold">
                                معلوماتك الشخصية
                            </h2>

                        <div className="form__group field mt-5">
                            <input type="input" className="form__field" autoComplete="given-name" placeholder="Name" ref={nameInputRef} required/>
                            <label for="name" className="form__label"> الاسم  </label>
                        </div>

                        <div className="form__group field mt-7">
                            <PhoneInput country={'eg'} placeholder=" Phone Number " inputProps={{ required: true, }} className=" block w-full p-3 mt-2 text-gray-700 bg-gray-100 appearance-none focus:outline-none focus:bg-gray-200 focus:shadow-inner " required="required" onChange={handlePhoneNumber} value={phoneNumber} />
                            <label for="phoneNumber" className="form__label"> رقم الهاتف </label>
                        </div>

                        <div className="form__group field  mt-7">
                            <input type="input" className="form__field" autoComplete="address" placeholder="Name" ref={addressRef} required/>
                            <label for="name" className="form__label"> العنوان  </label>
                        </div>


                        <div className="  relative mt-10">
                            <label for="name" className=" text-black text-xl font-bold"> اختر موعد التوصيل  </label>
                            

                                <div className="mt-4 pr-2">
                                    <label className="text-black flex items-center gap-3 font-bold ">
                                        <input onClick={()=> setIsNow(!isNow)} className="border-white-400/20 cursor-pointer transition-all duration-500 ease-in-out w-5 h-5" type="checkbox"/>
                                        <span> الان </span>
                                    </label>
                                </div>

                        {!isNow && (

                            <div className="flex items-center gap-3 mt-3 pr-2">
                                <div className="">
                                    <label className="text-black flex items-center gap-3 font-bold ">
                                        <input  className="border-white-400/20 cursor-pointer transition-all duration-500 ease-in-out w-5 h-5" type="checkbox"/>
                                    </label>
                                </div>


                                    <div className="chooseDate font-bold  ">


                                    <div className="flex  items-center ">
                                        <select
                                            id="time-select"
                                            value={selectedTime}
                                            onChange={(e) => setSelectedTime(e.target.value)}
                                            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="" disabled> اختر موعد </option>
                                            {times.map((time, index) => (
                                            <option key={index} value={time}>
                                                {time}
                                            </option>
                                            ))}
                                        </select>
                                        </div>
                                </div>
                            </div>
                        ) }
                        
                        </div>

                        
                        {error && (
                                <div className="error text-sm text-red-600 font-bold p-4 rounded-md bg-red-200 mt-4">
                                {error}
                            </div>
                        )}
            


                        <div className="CartItems mt-10">

                            <h2 className=" text-xl md:text-2xl font-bold">
                                محتويات  السلة
                            </h2>
                            
                            <div className="items mt-5">

                            <div  className="item  border-b-2 border-gray-700 p-2 flex items-center justify-between text-xl font-bold">
                                    <div className="data flex items-center gap-3">
                                        <div className="name w-28 ">
                                            <h4> المنتج </h4>
                                        </div>
                                    </div>

                                    <div className="weight flex flex-col items-center ">
                                        <h4> الوزن </h4>
                                    </div>

                                    <div className="delete flex flex-col items-center opacity-0 ">
                                        <span  className="bg-red-600 rounded-md px-2 md:px-5 py-2 flex items-center justify-center gap-3 text-white"> <span className="hidden md:block"> مسح </span> <MdOutlineDeleteForever size={20} color="white" /> </span>
                                    </div>

                                </div>

                                {!loading ? <>
                              
                                {cart?.map((ele, idx) => {
                                    return <div key={idx} className="item bg-gray-100 border-b border-gray-400  rounded-md p-2 flex items-center justify-between text-sm font-bold">
                                    <div className="data flex items-center gap-3">
                                        <div className="img ">
                                            <img src={ele.img} className="w-16" alt={ele.id} />
                                        </div>

                                        <div className="name  ">
                                            <h4> {ele.title} </h4>
                                            <p> {ele.totalPrice} EGP </p>
                                        </div>
                                    </div>

                                    <div className="weight flex flex-col items-center ">
                                        {/* <h4> الوزن </h4> */}
                                        <p className="dir-ltr mt-2">   {ele.weight} KG </p>
                                    </div>

                                    <div className="delete flex flex-col items-center ">
                                        <span onClick={() => removeFromCart(ele.id)} className="bg-red-600 cursor-pointer rounded-md px-2 md:px-5 py-2 flex items-center justify-center gap-3 text-white"> <span className="hidden md:block"> مسح </span> <MdOutlineDeleteForever size={20} color="white" /> </span>
                                    </div>

                                </div>
                                })}
                                    </> : <>
                                
                                    </>}
                                
                            </div>
                        </div>

                        {/* <h3 className="text-xl md:text-2xl  mt-5"> الشحن  :  <span className="font-bold dir-ltr">   {shipping != "" ? shipping + " EGP" : "مجاني "}  </span> </h3> */}
                        <h3 className="text-xl md:text-2xl  mt-5"> الشحن  :  <span className="font-bold dir-ltr">  {getTotalCartPrice() < 250 ?  shipping  : "مجاني " }    </span> </h3>
                        <h3 className="text-xl md:text-2xl  mt-5"> الإجمالي :  <span className="font-bold dir-ltr"> EGP {getTotalCartPrice()}  </span> </h3>    
                        
                        {cart.length == 0 ? (
                                <div className="btn flex justify-center mt-7">
                                    <span type="submit"   className="px-16 py-2 rounded-md font-bold text-xl bg-gray-600 cursor-not-allowed text-white shadow shadow-gray-400 ">
                                        ارسال 
                                    </span>

                                </div>
                            ) : (
                            <div className="btn flex justify-center mt-7">
                                <button  type="submit"  className="px-16 py-2 rounded-md font-bold text-xl bg-black text-white shadow shadow-gray-400 ">
                                    ارسال 
                                </button>
                            </div>
                        ) }

                    </form>

            </div>
           
        </div>    

 


    </div>

    </>
}
