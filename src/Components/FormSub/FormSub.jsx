import Footer from "../Footer/Footer"
import SubNav from './../subNav/subNav';
import QuestionsFooter from "../QuestionsFooter/QuestionsFooter";


import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../contexts/LanguageContext";
import axios from "axios";
import Lottie from "lottie-react"


import MoneyBackImg from "../../assets/moneyBack.webp"
import silverPlan from "../../assets/silver1.json"
import goldenPlan from "../../assets/golden11.json"
import vipPlan from "../../assets/golden1.json"
import credit from "../../assets/credit.svg"
import instaPay from "../../assets/instaPay1.png"
import vodafone from "../../assets/vodafone.jpg"
import BankTrnsFare from "../../assets/bank-transfer.png"
import close from "../../assets/close1.svg"
import whatsApp from "../../assets/social/whatsApp.png"



import "./formStyle.scss"

export default function FormSub() {

    let { planId } = useParams()
    const [priceValue, setPriceValue] = useState("");
    const [VcashPayment, setVcashPayment] = useState(false);

    const { t } = useTranslation();
    const { language } = useLanguage();
    const [phoneNumber, setPhoneNumber] = useState("");
    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);



    function handlePayment(event){
        event.preventDefault();
        const stripePayInput = document.getElementById('stripePay');
        const  currentPriceID = planId.split("-")[1] ;
        const  currentPlanID = planId.split("-")[0] ;
        let  currentPrice 
        
        if (stripePayInput.checked) {
            handleData("Stripe")
            let links = {
                // silver
                "1,177EGP": "https://buy.stripe.com/fZe02U8dh0dO7G85kl",
                "1,999EGP": "https://buy.stripe.com/9AQbLC5152lW7G84gi",
                "3,333EGP": "https://buy.stripe.com/3csbLC9hlf8IbWo28b",
                // gold
                "2,777EGP": "https://buy.stripe.com/eVa9Du6595y8d0s28c",
                "4,999EGP": "https://buy.stripe.com/4gweXO2SX2lWe4wdQV",
                "7,999EGP": "https://buy.stripe.com/5kAg1S6590dOd0s9AG",
                // vip
                "7,777EGP": "https://buy.stripe.com/4gw8zq3X17Gg9Og6ov",
                "13,000EGP": "https://buy.stripe.com/dR6g1SdxBf8I1hK7sA",
                "23,000EGP": "https://buy.stripe.com/dR65ne9hl2lW9Og5kt"
            };

            switch (currentPriceID) {
                case "three":
                    currentPrice = (currentPlanID === "silver") ? "1,177EGP" : 
                                   (currentPlanID === "golden") ? "2,777EGP" : 
                                   (currentPlanID === "VIP") ? "7,777EGP" : 
                                   currentPrice;
                    break;
                case "six":
                    currentPrice = (currentPlanID === "silver") ? "1,999EGP" : 
                                   (currentPlanID === "golden") ? "4,999EGP" : 
                                   (currentPlanID === "VIP") ? "13,000EGP" : 
                                   currentPrice;
                    break;
                case "twelve":
                    currentPrice = (currentPlanID === "silver") ? "3,333EGP" : 
                                   (currentPlanID === "golden") ? "7,999EGP" : 
                                   (currentPlanID === "VIP") ? "23,000EGP" : 
                                   currentPrice;
                    break;
                default:
                    currentPrice = "Unknown Plan";
            }

            let currentPriceStr = currentPrice.toString();
            let link = links[currentPriceStr];
            window.location.href = link;
        } else {
            handleData("vodafoneCash-Instapay-BankTransfare")
            setVcashPayment(true)
        }

        
    }

    function setCurrentPriceValue() {

        const  currentPriceID = planId.split("-")[1] ;
        const  currentPlanID = planId.split("-")[0] ;
        let  currentPrice 

            switch (currentPriceID) {
                case "three":
                    currentPrice = (currentPlanID === "silver") ? "1,177EGP" : 
                                   (currentPlanID === "golden") ? "2,777EGP" : 
                                   (currentPlanID === "VIP") ? "7,777EGP" : 
                                   currentPrice;
                    break;
                case "six":
                    currentPrice = (currentPlanID === "silver") ? "1,999EGP" : 
                                   (currentPlanID === "golden") ? "4,999EGP" : 
                                   (currentPlanID === "VIP") ? "13,000EGP" : 
                                   currentPrice;
                    break;
                case "twelve":
                    currentPrice = (currentPlanID === "silver") ? "3,333EGP" : 
                                   (currentPlanID === "golden") ? "7,999EGP" : 
                                   (currentPlanID === "VIP") ? "23,000EGP" : 
                                   currentPrice;
                    break;
                default:
                    currentPrice = "Unknown Plan";
            }

            let currentPriceStr = currentPrice.toString();
            setPriceValue(currentPriceStr)
    }

    let planData = []



    function handlePhoneNumber(value) {
        setPhoneNumber(value)
    }


    async function senUserData(userData) {

        // try and catch if you are not sure if there will be an error with api 
        try {
            let { data } = await axios.post("https://sheetdb.io/api/v1/g0gfwnubqi9wi", userData);

            // catch the error 
        } catch (err) {
            // console.log(err.response);

            alert("something Wrong happened please try again")

        }

    }


    const handleData = (payment_Method) => {

        let userInfo = {};

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${day}-${month}-${year}`;
        console.log('currentDate:', currentDate);
        

        // store User Data 
        userInfo.Date = currentDate;
        userInfo.Name = nameInputRef.current.value;
        userInfo.Phone = phoneNumber;
        userInfo.From = "Main website";
        userInfo.PaymentMethod = payment_Method;
        userInfo.Email = emailInputRef.current.value;

        senUserData(userInfo)

        setTimeout(() => {
            nameInputRef.current.value = '';
            setPhoneNumber('');
            emailInputRef.current.value = '';
        }, 800)

    };


    function copyData(direction) {
        // Get the text field
        var copyText = document.querySelector("." + direction);
      
        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
      
         // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
      }

    
    if (language === "ar") {

        if (planId.split("-")[0] == "silver") {
            planData = [
                {
                    title: "الخطة الفضية",
                    disCount: "  ",
                    img: silverPlan,
                    planData: [
                        " متابعة مباشرة أسبوعية من خلال مكالمة فديو ",
                        " خطة تغذية مصممة لتحقيق هدفك من أكلك المفضل بخيارات اقتصادية  ",
                        `  خطة تدريب تلائم هدفك ومكان تدريبك (الجيم المنزلي)`,
                        "برنامج فيتامينات ومكملات (اختياري)",
                        " متابعة يومية عن طريق وسيلة التواصل المناسبة لك مع فريق GR7 ",
                        " تحديث البرنامج الغذائي كل 14 يوم  ",
                        " تحديث برنامج تدريبي كل شهر حسب هدفك ",
                        " فايل تسجيل لتتبع تقدمك وانجازاتك  ",
                        " خطة لتنظيم الوقت بين الوجبات والتمرين   ",
                        " التعامل مع الاصابات وتحسين الأداء الحركي والاستشفاء الكامل  ",
                        " مراجعة كافة التقارير والتحاليل والقياسات قبل إداد البرامج ",

                    ],
                    id: "silver",
                    discountPrice: planId.split("-")[1],
                    price: "1,999EGP",
                }
            ]
        } else if (planId.split("-")[0] == "golden") {
            planData = [
                {
                    title: "الخطة الذهبية",
                    disCount: " ",
                    img: goldenPlan,
                    planData: [
                        " متابعة مكالمة فديو كل 3 أيام  ",
                        " خطة تغذية مصممة لتحقيق هدفك من أكلك المفضل بخيارات اقتصادية  ",
                        `  خطة تدريب تلائم هدفك ومكان تدريبك (الجيم المنزلي)`,
                        "برنامج فيتامينات ومكملات (اختياري)",
                        " متابعة يومية عن طريق وسيلة التواصل المناسبة لك مع فريق GR7 ",
                        " تحديث البرنامج الغذائي كل 14 يوم  ",
                        " تحديث برنامج تدريبي كل شهر حسب هدفك ",
                        " فايل تسجيل لتتبع تقدمك وانجازاتك  ",
                        " خطة لتنظيم الوقت بين الوجبات والتمرين   ",
                        " التعامل مع الاصابات وتحسين الأداء الحركي والاستشفاء الكامل  ",
                        " مراجعة كافة التقارير والتحاليل والقياسات قبل إداد البرامج ",

                    ],
                    id: "golden",
                    discountPrice: planId.split("-")[1],
                },
            ]



        } else if (planId.split("-")[0] == "VIP") {
            planData = [
                {
                    title: "خطة VIP",
                    disCount: " ",
                    img: vipPlan,
                    planData: [
                        " متابعة مكالمة فديو يومية  ",
                        " متابعة اثناء التمرين ",
                        " متابعة اعداد الوجبات ",
                        " خطة تغذية مصممة لتحقيق هدفك من أكلك المفضل بخيارات اقتصادية  ",
                        `  خطة تدريب تلائم هدفك ومكان تدريبك (الجيم المنزلي)`,
                        "برنامج فيتامينات ومكملات (اختياري)",
                        " متابعة يومية عن طريق وسيلة التواصل المناسبة لك مع فريق GR7 ",
                        " تحديث البرنامج الغذائي كل 14 يوم  ",
                        " تحديث برنامج تدريبي كل شهر حسب هدفك ",
                        " فايل تسجيل لتتبع تقدمك وانجازاتك  ",
                        " خطة لتنظيم الوقت بين الوجبات والتمرين   ",
                        " التعامل مع الاصابات وتحسين الأداء الحركي والاستشفاء الكامل  ",
                        " مراجعة كافة التقارير والتحاليل والقياسات قبل إداد البرامج ",

                    ],
                    id: "VIP",
                    discountPrice: planId.split("-")[1],
                }
            ]
        } else {
            planData = [
                { title: "لم يتم اختيار خطة " }
            ]
        }

    } else {
        if (planId.split("-")[0] === "silver") {
            planData = [
                {
                    title: "Silver Plan",
                    disCount: " ",
                    img: silverPlan,
                    planData: [
                        "Weekly direct follow-up via video call",
                        "Customized nutrition plan tailored to your favorite meals with economical options",
                        "Training plan tailored to your goals and training location (home gym)",
                        "Vitamins and supplements program (optional)",
                        "Daily follow-up via suitable communication method with GR7 team",
                        "Nutrition program update every 14 days",
                        "Training program update every month according to your goals",
                        "File recording to track your progress and achievements",
                        "Plan to organize time between meals and workouts",
                        "Dealing with injuries and improving movement performance and full recovery",
                        "Review of all reports, tests, and measurements before program preparation",
                    ],
                    id: "silver",
                    discountPrice: planId.split("-")[1],
                    price: "1,999EGP",
                }
            ]
        } else if (planId.split("-")[0] === "golden") {
            planData = [
                {
                    title: "Golden Plan",
                    disCount: " ",
                    img: goldenPlan,
                    planData: [
                        "Video call follow-up every 3 days",
                        "Customized nutrition plan tailored to your favorite meals with economical options",
                        "Training plan tailored to your goals and training location (home gym)",
                        "Vitamins and supplements program (optional)",
                        "Daily follow-up via suitable communication method with GR7 team",
                        "Nutrition program update every 14 days",
                        "Training program update every month according to your goals",
                        "File recording to track your progress and achievements",
                        "Plan to organize time between meals and workouts",
                        "Dealing with injuries and improving movement performance and full recovery",
                        "Review of all reports, tests, and measurements before program preparation",
                    ],
                    id: "golden",
                    discountPrice: planId.split("-")[1],
                },
            ]
        } else if (planId.split("-")[0] === "VIP") {
            planData = [
                {
                    title: "VIP Plan",
                    disCount: " ",
                    img: vipPlan,
                    planData: [
                        "Daily video call follow-up",
                        "Follow-up during exercise",
                        "Follow-up during meal preparation",
                        "Customized nutrition plan tailored to your favorite meals with economical options",
                        "Training plan tailored to your goals and training location (home gym)",
                        "Vitamins and supplements program (optional)",
                        "Daily follow-up via suitable communication method with GR7 team",
                        "Nutrition program update every 14 days",
                        "Training program update every month according to your goals",
                        "File recording to track your progress and achievements",
                        "Plan to organize time between meals and workouts",
                        "Dealing with injuries and improving movement performance and full recovery",
                        "Review of all reports, tests, and measurements before program preparation",
                    ],
                    id: "VIP",
                    discountPrice: planId.split("-")[1],
                }
            ]
        } else {
            planData = [
                { title: "No plan selected" }
            ]
        }
    }

    useEffect(() => {
        setCurrentPriceValue()
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [VcashPayment])

    return <>

        <SubNav />

        <div id="SubscribeForm" className={`SubscribeForm bg-lightGrayBack ${language == "en" && "dir-ltr"} `} >


            <div className="container formSub flex flex-wrap py-12 justify-between">

                <div className=" w-full lg:w-2/3  p-0 md:p-3  px-2">

                    
                    <div className={`w-full ${VcashPayment ? " py-10" : "py-12 px-6"} bg-white rounded-2xl shadow-cardShadow relative`}>

                        <div className="px-4">
                            <AnimatePresence>
                                {!VcashPayment && <motion.div 
                                initial={{
                                    x: 200
                                }}
                                animate={{ x: 0 }}
                                transition={{ ease: "linear", duration: 0.2 }}
                                exit={{
                                    x: 200
                                }}
                                >
                                    <h1 className=" font-bold text-2xl "> {t("personal_info_heading")}  </h1>

                                    <form className="mt-6" onSubmit={handlePayment}>

                                        <label htmlFor="firstname" className="block text-xl font-semibold text-gray-700 uppercase"> {t("form_labels_name")} </label>
                                        <input id="firstname" type="text" name="firstname" placeholder="Name" autoComplete="given-name" className="block w-full p-3 mt-2 text-gray-700 bg-gray-100 appearance-none focus:outline-none focus:bg-gray-200 focus:shadow-inner" ref={nameInputRef} required />


                                        <label htmlFor="email" className="block mt-2 text-xl font-semibold text-gray-700 uppercase"> {t("form_labels_email")} </label>
                                        <input id="email" type="email" name="email" placeholder="example@email.com" autoComplete="email" className="block w-full p-3 mt-2 text-gray-700 bg-gray-100 appearance-none focus:outline-none focus:bg-gray-200 focus:shadow-inner" ref={emailInputRef} required />


                                        <label htmlFor="phoneNumber" className="block mt-2 text-xl font-semibold text-gray-700 uppercase">  {t("form_labels_phoneNumber")}</label>
                                        <PhoneInput country={'eg'} placeholder=" Phone Number " inputProps={{ required: true, }} className=" block w-full p-3 mt-2 text-gray-700 bg-gray-100 appearance-none focus:outline-none focus:bg-gray-200 focus:shadow-inner " required="required" onChange={handlePhoneNumber} value={phoneNumber} />

                                        <h3 className="pb-3 text-xl w-full font-bold">    </h3>

                                        <div className="paymentInfo py-5 mt-5 flex flex-wrap ">
                                            <h3 className="mb-3 font-bold w-full text-2xl  ">
                                                {t("payment_methodes")}
                                            </h3>

                                            <div className="w-full md:w-1/2 p-3 py-5" id="stripe-option">
                                                <div className=" inputFields flex items-center gap-3 rounded-lg cursor-pointer bg-lightGrayBack shadow-cardShadow p-3 border ">
                                                    <input type="radio" id="stripePay" name="payment_method" value="stripePay"  required />
                                                    <label htmlFor="stripePay" className="w-100 h-full mb-0">
                                                        <img className="h-20 " src={credit} alt="" id="stripePay" />
                                                        <h4 className="font-bold py-1" id="stripe-title"> {language == "ar" && "بطاقة إئتمان /"}  Credit Card </h4>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="w-full md:w-1/2 p-3 py-5" id="fawaterak-option-2">
                                                <div className=" inputFields flex items-center gap-3 rounded-lg cursor-pointer bg-lightGrayBack shadow-cardShadow p-3 border ">
                                                    <input type="radio" id="InstaPay" name="payment_method" value="InstaPay" data-payment-id="2"  required />
                                                    <label htmlFor="InstaPay" className="w-100 h-full mb-0">
                                                        <img className="h-20 rounded-md" src={instaPay} alt="InstaPay" />
                                                        <h4 className="font-bold py-1" id="fawaterak-title"> InstaPay {language == "ar" && "/ انستا باي "} </h4>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="w-full md:w-1/2 p-3 py-5" id="fawaterak-option-3">
                                                <div className=" inputFields flex items-center gap-3 rounded-lg cursor-pointer bg-lightGrayBack shadow-cardShadow p-3 border ">
                                                    <input type="radio" id="vodafone" name="payment_method" value="vodafoneCash" data-payment-id="3" required   />
                                                    <label htmlFor="vodafone" className="w-100 h-full mb-0">
                                                        <img className="h-20 rounded-md " src={vodafone} alt="vodafone" />
                                                        <h4 className="font-bold py-1" id="fawaterak-title"> Vodafone Cash   {language == "ar" && "/ فودافون كاش "}  </h4>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="w-full md:w-1/2 p-3 py-5" id="fawaterak-option-3">
                                                <div className=" inputFields flex items-center gap-3 rounded-lg cursor-pointer bg-lightGrayBack shadow-cardShadow p-3 border ">
                                                    <input type="radio" id="bankTransfer" name="payment_method" value="bankTransfer" data-payment-id="3" required   />
                                                    <label htmlFor="bankTransfer" className="w-100 h-full mb-0">
                                                        <img className="h-20 rounded-md " src={BankTrnsFare} alt="vodafone" />
                                                        <h4 className="font-bold py-1" id="fawaterak-title"> Bank Transfer   {language == "ar" && "/ تحويل بنكي "}  </h4>
                                                    </label>
                                                </div>
                                            </div>

                                        </div>

                                        <button type="submit"  className="w-full py-3 mt-6 font-medium tracking-widest text-white uppercase bg-mainBlue rounded-lg shadow-lg focus:outline-none hover:bg-blue-900 hover:shadow-none">
                                            {t("header_Button_subscribeNow")}
                                        </button>

                                    </form>
                                    </motion.div>
                                }

                            </AnimatePresence>
                            <AnimatePresence>
                                {VcashPayment && <motion.div
                                initial={{
                                    x: 200
                                }}
                                animate={{ x: 0 }}
                                transition={{ ease: "linear", duration: 0.2 }}
                                exit={{
                                    x: 200
                                }}
                                className={`wrapper vCashWrapper ${language == "en" && "dir-ltr"} `}>
                                    
                                    <img onClick={() => setVcashPayment(!VcashPayment)} width="40" height="40" src={close} className={`close absolute top-5 left-5 ${language == "en" && "left-auto right-5"} cursor-pointer  p-1 rounded transition-colors invert `} alt="close" />

                                    <div className={`Vcash mt-7 `}>
                                        <h2 className=" font-bold text-2xl md:text-3xl text-mainRed "> {t("Vcash_Payment")} :   </h2>

                                        <div className="text-2xl overflow-hidden py-2 font-bold mt-3 rounded-md bg-gray-300 flex justify-between items-center  "> 

                                            <input type="text" readonly className="vCash w-3/4 px-3 focus:outline-none focus:border-none bg-transparent" value={"01063374834"} />  

                                            <div className="copBtn   flex items-center  bg-gray-300 rounded-md cursor-pointer">
                                                <button className="copy w-full" onClick={()=> copyData("vCash")}>
                                                    <span data-text-end="Copied!" data-text-initial="Copy to clipboard" className="tooltip"></span>
                                                    <span>
                                                        <svg xml:space="preserve"  viewBox="0 0 6.35 6.35" y="0" x="0" height="20" width="20" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" className="clipboard">
                                                        <g>
                                                            <path fill="currentColor" d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"></path>
                                                        </g>
                                                        </svg>
                                                        <svg xml:space="preserve"  viewBox="0 0 24 24" y="0" x="0" height="18" width="18" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" className="checkmark">
                                                        <g>
                                                            <path data-original="#000000" fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path>
                                                        </g>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>

                                        </div>
                                    </div>


                                        <div className={`instaPay mt-14 `}>
                                        <h2 className=" font-bold text-2xl md:text-3xl text-pink-600"> {t("InstaPay_Payment")}  :   </h2>

                                        <div className="text-2xl overflow-hidden py-2 font-bold mt-3 rounded-md bg-gray-300 flex justify-between items-center  "> 

                                            <input type="text" readonly className="instaPayCopy w-3/4 px-3 focus:outline-none focus:border-none bg-transparent" value={"01063374834"} />  

                                            <div className="copBtn   flex items-center  bg-gray-300 rounded-md cursor-pointer">
                                                <button className="copy w-full" onClick={()=> copyData("instaPayCopy")}>
                                                    <span data-text-end="Copied!" data-text-initial="Copy to clipboard" className="tooltip"></span>
                                                    <span>
                                                        <svg xml:space="preserve"  viewBox="0 0 6.35 6.35" y="0" x="0" height="20" width="20" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" className="clipboard">
                                                        <g>
                                                            <path fill="currentColor" d="M2.43.265c-.3 0-.548.236-.573.53h-.328a.74.74 0 0 0-.735.734v3.822a.74.74 0 0 0 .735.734H4.82a.74.74 0 0 0 .735-.734V1.529a.74.74 0 0 0-.735-.735h-.328a.58.58 0 0 0-.573-.53zm0 .529h1.49c.032 0 .049.017.049.049v.431c0 .032-.017.049-.049.049H2.43c-.032 0-.05-.017-.05-.049V.843c0-.032.018-.05.05-.05zm-.901.53h.328c.026.292.274.528.573.528h1.49a.58.58 0 0 0 .573-.529h.328a.2.2 0 0 1 .206.206v3.822a.2.2 0 0 1-.206.205H1.53a.2.2 0 0 1-.206-.205V1.529a.2.2 0 0 1 .206-.206z"></path>
                                                        </g>
                                                        </svg>
                                                        <svg xml:space="preserve"  viewBox="0 0 24 24" y="0" x="0" height="18" width="18" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" className="checkmark">
                                                        <g>
                                                            <path data-original="#000000" fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"></path>
                                                        </g>
                                                        </svg>
                                                    </span>
                                                </button>
                                                {/* <span className="mr-2 text-xl"> copy </span> */}
                                            </div>

                                        </div>
                                    </div>


                                    <div className="BankTransfare mt-14 ">
                                        <h2 className=" font-bold text-2xl md:text-3xl text-green-700"> {t("BankTrnsfare_Payment")} :   </h2>

                                        <h3 className=" font-bold text-xl rounded-md bg-gray-300 p-3 mt-7">  1 :  البنك التجاري الدولي ( CIB)   </h3>
                                        <div className="dir-ltr pl-2 md:pl-5">
                                            <p className="text-xl  mt-2"> <span className="font-bold">  Name </span> : DAF DOF FOR ONLINE MARKETING  </p>
                                            <p className="text-xl  mt-2"> <span className="font-bold">  Account no </span>  : 100042026047 </p>
                                            <p className="text-xl  mt-2"> <span className="font-bold"> IBAN </span> : EG040010014200000100042026047  </p>
                                            <p className="text-xl  mt-2"> <span className="font-bold"> Branch Swift Code </span>  : CIBEEGCX142 </p>
                                            <p className="text-xl  mt-2"> <span className="font-bold"> Branch Address </span>  : 92 Central Area, New Damietta City, Damietta.  </p>
                                        </div>


                                        <h3 className=" font-bold text-xl rounded-md bg-gray-300 p-3 mt-10">  2 : United Arab Emirates (UAE)    </h3>
                                        <div className="dir-ltr pl-2 md:pl-5">
                                            <p className="text-xl mt-2">  <span className="font-bold"> Name  </span> : SMARKETING LLC  </p>
                                            <p className="text-xl mt-3">  <span className="font-bold"> Location </span>  : United Arab Emirates (UAE) </p>
                                            <p className="text-xl mt-2">  <span className="font-bold"> IBAN</span> : AE390860000009705290524  </p>
                                            <p className="text-xl mt-2">  <span className="font-bold"> BIC/SWIFT  </span>: WIOBAEADXXX </p>
                                            <p className="text-xl mt-2">  <span className="font-bold"> Branch Address </span> : Shared Desk , Shams Business Center, Sharjah Media City Free Zone, Al Messaned, Sharjah, United Arab Emirates  </p>
                                        </div>
                                    </div>


                                    <hr className="my-10  bg-black" />

                                    <div className="next  ">
                                        <h1 className=" font-bold text-3xl shadow-cardShadow p-3 rounded-md bg-gray-200 "> 2 - {t("ScreenShot")}   </h1>

                                        <a href="https://wa.me/201212250652"   className="w-full block text-center py-3 mt-10 text-white text-2xl font-bold uppercase bg-mainBlue rounded-lg shadow-lg focus:outline-none hover:bg-blue-900 hover:shadow-none">
                                            3-  {t("continu")}
                                        </a>
                                    </div>



                                </motion.div>
                                }
                            </AnimatePresence>
                        </div>


                    </div>

                </div>


                <div className="plan w-full lg:w-1/3">

                    {planData.map((ele, idx) => {
                        return <div key={idx} className="wrapperBox p-3  w-full   ">
                            <div className="box  p-5 rounded-2xl shadow-cardShadow   bg-white relative  ">


                                <div className="boxTitle ">
                                    <Lottie
                                        loop={true}
                                        animationData={ele.img} />
                                    <h3 className="mb-3"> {ele.title} </h3>

                                </div>

                                <ul className="mt-5">

                                    {ele.planData.map((li, idx) => {
                                        return <li key={idx}> {li} </li>
                                    })}
                                </ul>

                                <div className="price flex justify-between items-center font-bold text-2xl">
                                    <span className="font-bold text-mainBlue">  {priceValue} </span>
                                </div>

                            </div>
                        </div>
                    })}

                </div>

            </div>

            <div className="footWraper pt-20 pb-14">
                <div className="container flex justify-center flex-wrap ">

                    <div className="titleFirst  text-center text-white">
                        <h2> <strong> {t("stillHesitant_heading")} </strong> </h2>
                        <p className="mb-4"> <strong>  {t("stillHesitant_text")}   </strong> </p>
                    </div>

                    <div className=" RefundPolicy  flex justify-center flex-wrap  ">

                        <div className="text w-full lg:w-1/2 flex items-center text-white ">
                            <p className=" text-2xl ">
                                <strong>  {t("refund_policy_text")}
                                    <span>  {t("refund_policy_note")} </span> </strong>
                            </p>
                        </div>


                        <div className="img w-full lg:w-1/2 flex justify-center ">
                            <img src={MoneyBackImg} className=" imgArrow rounded-xl w-60" alt="MoneyBackGuarantee" />
                        </div>

                    </div>

                </div>
            </div>

        </div>

        <Footer />

        <div className="whatsappIcon fixed left-5 bottom-5 pointer hover:scale-105 transition-transform">
            <a href="https://wa.me/201212250652"  >
                <img src={whatsApp} className="w-16 " alt="whatsApp" />
            </a>
        </div>
    </>
}
