import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
<<<<<<< HEAD

import logo from "../../assets/Logo3.png"
import facebook from "../../assets/social/facebook.png"
import instagram from "../../assets/social/instagram.png"
import tiktok from "../../assets/social/tiktok.png"
=======
>>>>>>> 296b85ead2362e4e203cdd23f7883c4d2c2a0cd5

// import logo from "../../assets/Logo3.png"
// import facebook from "../../assets/social/facebook.png"
// import instagram from "../../assets/social/instagram.png"
// import tiktok from "../../assets/social/tiktok.png"

export default function Footer() {

    const { t } = useTranslation();


    return (
        <footer id="footer" className="p-12 dir-ltr text-center text-white bg-gray-950">
            {/* <div className="logoImg flex justify-center">
                <img src={logo} className="w-32" alt="logo" />
            </div> */}
            {/* <p  >
                <Link to={"/PrivacyPolicy"} ><span > {t("footer_links_privacyPolicy")}   </span></Link>
                <span className="mx-1" > | </span>
                <Link to={"/RefundPolicy"} ><span >   {t("footer_links_refundPolicy")} </span></Link>
                <span className="mx-1" > | </span>
                <Link to={"/TermsConditions"} ><span > {t("footer_links_termsConditions")}  </span></Link>
                <span className="mx-1" > | </span>
                <Link to={"/ContactUs"}><span>{t("footer_links_contactUs")}</span></Link>
            </p> */}

<<<<<<< HEAD
            <div className="socia flex justify-center gap-x-4 my-4"> 
                <a href="https://www.facebook.com/GR7.fit"  target="_blanck" ><img src={facebook} className="w-7" alt="facebook" /></a>
                <a href="https://www.instagram.com/gr7.fit"  target="_blanck" ><img src={instagram} className="w-7" alt="instagram" /></a>
                <a href="https://www.tiktok.com/@gr7.fit"  target="_blanck" ><img src={tiktok} className="w-7" alt="tiktok" /></a>
            </div>

            <p className="mt-2 flex items-center gap-3 justify-center flex-wrap">  {t("footer_copyright")} |
=======
            {/* <div className="socia flex justify-center gap-x-4 my-4"> 
                <a href="https://www.facebook.com/GR7.fit"  target="_blanck" ><img src={facebook} className="w-7" alt="facebook" /></a>
                <a href="https://www.instagram.com/gr7.fit"  target="_blanck" ><img src={instagram} className="w-7" alt="instagram" /></a>
                <a href="https://www.tiktok.com/@gr7.fit"  target="_blanck" ><img src={tiktok} className="w-7" alt="tiktok" /></a>
            </div> */}
>>>>>>> 296b85ead2362e4e203cdd23f7883c4d2c2a0cd5

            <p className="mt-2 flex items-center gap-3 justify-center flex-wrap">  {t("footer_copyright")} 

                {/* <img src={logo} className="w-14" alt="logo" /> */}
            </p>

        </footer>
    )
}
