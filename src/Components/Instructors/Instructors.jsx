import "./InstructorsStyle.scss"

import coach from "../../assets/Coach.jpeg"
import doctor from "../../assets/Doctor.jpeg"

import CoachArafat from "../../assets/Team/MahmoudArafat.jpeg"
import Ceo from "../../assets/Team/CEO2.jpeg"
import Wsal from "../../assets/Team/coach-Wsal.jpeg"
import Reem from "../../assets/Team/Reem1.jpeg"
import Halah from "../../assets/Team/CaptinHalah.jpeg"
import MMotawe from "../../assets/Team/Dr.M.jpg"
import AmrSaber from "../../assets//Team/AmrSaber.jpeg"

import CountDown from "../CountDown/CountDown"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useLanguage } from "../../contexts/LanguageContext"


export default function Instructors() {


    const { t } = useTranslation();
    const { language } = useLanguage();


    const instructorsData = [
        {
            name: " م. أحمد تيسير ",
            title: " المدير التنفيذي CEO ",
            img: Ceo,
            direction: "instructorOne",
            desc: [

            ],
        },
        {
            name: " كابتن علاء متولي ",
            title: "أخصائي تغذيه علاجيه ورياضيه",
            img: coach,
            direction: "instructorTwo",
            desc: [
                "اون لاين كوتش",
                "لايف كوتش",
                "صاحب قناة fitness in gym عدiد المشتركين بها تجاوز المليون مشترك"
            ],
        },
        {
            name: " كابتن محمود عرفات  ",
            title: " مدرب كمال اجسام ولياقة بدنية وبطل العرب في كمال الاجسام",
            img: CoachArafat,
            direction: "instructorOne",
            desc: [

            ],
        },
        {
            name: " د. عبدالمؤنس ناصر ",
            title: "مدرب و أخصائي تغذية معتمد من جامعة المنصورة و الجمعية الأمريكية للتعليم الطبي المستمر و الجمعية الأمريكية لعلوم الرياضة",
            img: doctor,
            direction: "instructorTwo",
            desc: [
                "خبرة لاكثر من 6 سنوات في مجال التغذية و التدريب",
                "ساعدت مئات العملاء في الوصول لأهدافهم و عمل أفضل جسم رياضي يمكنهم الوصول اليه"
            ],
        },
        {
            name: " د. محمد مطاوع ",
            title: " خبير في الذكاء الاصطناعي وحاصل علي دبلومة تغذية معتمدة من الجامعة الأمريكية ",
            img: MMotawe,
            direction: "instructorOne",
            desc: [
            ],
        },
        {
            name: " م . عمرو صابر",
            title: " مدير خدمة العملاء ",
            img: AmrSaber,
            direction: "instructorTwo",
            desc: [
            ],
        },
        {
            name: " كابتن / وصال فهمي    ",
            title: " باحثة ماجستير ( تدريب رياضي ) بالتربية الرياضية ",
            img: Wsal,
            direction: "instructorOne",
            desc: [
                "خريجة تربيه رياضيه جامعة المنصوره",
                "حاصلة علي كورسات  التدريب الشخصي من تاس اكاديمي",
                "أخصائية التغذية الرياضية من تاس اكاديمي",
                "أيروبك من اكاديميه المرسال   ",
                "تأهيل الرياضي بجامعه منصوره",
            ],
        },
        {
            name: " كابتن ريم",
            title: " مدرب شخصي ",
            img: Reem,
            direction: "instructorTwo",
            desc: [

            ],
        },
        {
            name: " كابتن هاله ",
            title: " مدرب شخصي ",
            img: Halah,
            direction: "instructorOne",
            desc: [

            ],
        },

    ]



    const instructorsDataEn = [
        {
            name: "Mr. Ahmed Taysir",
            title: "Chief Executive Officer (CEO)",
            img: Ceo,
            direction: "instructorOne",
            desc: [

            ],
        },
        {
            name: "Captain Alaa Matwally",
            title: "Clinical and Sports Nutrition Specialist",
            img: coach,
            direction: "instructorTwo",
            desc: [
                "Online Coach",
                "Live Coach",
                "Owner of the fitness in gym channel with over one million subscribers"
            ],
        },
        {
            name: "Captain Mahmoud Arafat  ",
            title: "bodybuilding and fitness coach and the Arab champion in bodybuilding",
            img: CoachArafat,
            direction: "instructorOne",
            desc: [
                "Captain Mahmoud Arafat",
                "Live Coach",
                "Owner of the fitness in gym channel with over one million subscribers"
            ],
        },
        {
            name: "Dr. Abdulmounes Nasser",
            title: "Trainer and Nutrition Specialist certified by Mansoura University, the American Association for Continuing Medical Education, and the American College of Sports Medicine",
            img: doctor,
            direction: "instructorTwo",
            desc: [
                "Over 6 years of experience in nutrition and training",
                "Helped hundreds of clients achieve their goals and create the best athletic body they can achieve"
            ],
        },
        {
            name: "Dr. Mohamed Motawea",
            title: "Expert in Artificial Intelligence and holder of a certified nutrition diploma from the American University",
            img: MMotawe,
            direction: "instructorOne",
            desc: [],
        },
        {
            name: " Mr. Amr Saber  ",
            title: "Customer service manager ",
            img: AmrSaber,
            direction: "instructorTwo",
            desc: [
            ],
        },
        {
            name: "Captain / Wesal Fahmy ",
            title: "Master's degree (sports training) in physical education ",
            img: Wsal,
            direction: "instructorOne",
            desc: [
                "Graduate of Physical Education, Mansoura University",
                "Received personal training courses from TASS Academy",
                "Sports nutrition specialist from TASS Academy",
                "Aerobics from Al-Marsal Academy",
                "Athlete rehabilitation from Mansoura University",
            ],
        },
        {
            name: "Captain Reem",
            title: "Personal Trainer",
            img: Reem,
            direction: "instructorTwo",
            desc: [

            ],
        },
        {
            name: "Captain Hala",
            title: "Personal Trainer",
            img: Halah,
            direction: "instructorOne",
            desc: [],
        },
    ];




    useEffect(() => {

        const links = document.querySelectorAll('a[data-scroll-to]');

        links.forEach(link => {
            link.addEventListener('click', function (event) {
                event.preventDefault();
                const targetId = this.getAttribute('data-scroll-to');
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }, [])


    return (
        <div id="Instructors" className="py-7 pb-0 overflow-hidden  ">


            <div className="container ">


                <div className="title my-7 mb-0 lg:mb-10">
                    <h2 className="text-mainRed text-center" >
                        <strong> {t("Instructors_title")}  </strong>
                    </h2>
                </div>




                <div className="wrapper flex flex-wrap justify-center items-center">






                    {language === "ar" ? <>

                        {instructorsData?.map((ele, idx) => {
                            return <div key={idx} className={`instructor ${ele.direction}  mt-20 flex justify-between  flex-wrap w-full lg:w-1/2  `}>

                                <div className="text w-full  order-1 ">
                                    <h3 className="mb-3 mt-5  text-center font-bold  ">  <strong> {ele.name} </strong>  </h3>
                                    <p className="text-center px-8 ">
                                        <strong>    {ele.title} </strong>
                                    </p>
                                </div>


                                <div className="img w-full flex justify-center ">
                                    <img src={ele.img} className="rounded-xl object-cover  h-full" alt="Instructor" />
                                </div>

                            </div>
                        })}

                    </> : <>


                        {instructorsDataEn?.map((ele, idx) => {
                            return <div key={idx} className={`instructor ${ele.direction}  mt-20 flex justify-between  flex-wrap w-full lg:w-1/2  `}>

                                <div className="text w-full  order-1 ">
                                    <h3 className="mb-3 mt-5  text-center font-bold  ">  <strong> {ele.name} </strong>  </h3>
                                    <p className="text-center ">
                                        <strong>    {ele.title} </strong>
                                    </p>
                                </div>


                                <div className="img w-full flex justify-center ">
                                    <img src={ele.img} className="rounded-xl object-cover  h-full" alt="Instructor" />
                                </div>

                            </div>
                        })}


                    </>}


                </div>


            </div>


            <div className="counter py-2 bg-counterBack">
                <div className="count flex justify-center mt-14">

                    <CountDown TimeColor="text-blue-900" textColor="text-gray-400" fs="text-2xl" justify="justify-center" />

                </div>

                <a href="#" data-scroll-to="ChoosePlan" className="btn flex justify-center px-4 my-5">
                    <button className='p-4 px-5 bg-BlueDark  flex flex-col justify-center items-center text-white shadow-cardShadow rounded'>
                        <span className="mb-2 text-2xl font-bold ">  {t("subscribeNow_Instuctors")} </span>
                    </button>
                </a>
            </div>
        </div>
    )
}
