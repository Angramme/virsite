import Head from 'next/head'
import Footer from './Footer'
import Navigation from './Navigation'
import CookieConsent from "react-cookie-consent";
import { FaCookieBite } from 'react-icons/fa'

import { useEffect } from 'react'
import useTranslation from '../hooks/useTranslation'
import {capitalize_first} from '../lib/helpers/string'

import styles from '../styles/layout.module.sass'

import { locales } from '../translations/config'

export default function SiteLayout({pageTitle, children}){
    useEffect(()=>{
        const update_height_vals = ()=>{
            const DS = document.documentElement.style;
            DS.setProperty('--vh', `${window.innerHeight * 0.01}px`);
            DS.setProperty('--vw', `${window.innerWidth * 0.01}px`);
        };
        update_height_vals();
        window.addEventListener('resize', update_height_vals);
        return ()=>window.removeEventListener('resize', update_height_vals);
    }, []);

    const {t, locale} = useTranslation();
    return <>
        <Head>
            <title>{capitalize_first(t(pageTitle))}</title>
            <link rel="icon" href="/logo-sharp.png"></link>
            {locales.map(x=>
                <link key={x} rel="alternate" hrefLang={x} href={`${process.env.FULL_SITE_URL}/${x}/${pageTitle}`}/>
                )}
        </Head>
        <div className={styles.background}></div>
        <div className={styles.layout}>
            <Navigation currentPage={pageTitle}/>
            <div className={styles.child_and_footer_container}>
                <div className={styles.children_container}>
                    {children}
                </div>
                <Footer/>
            </div>
        </div>
        <CookieConsent
            location="bottom"
            buttonText={t('cookie_btn')}
            cookieName="cookie_consent_cookie"
            style={{ 
                fontSize: ".8rem",
                background: "white",
                color: "black",
                borderTop:"solid 2px black",
            }}
            buttonStyle={{ color: "white", background:"black", fontSize: ".85rem" }}
            expires={150}
            >
                <FaCookieBite style={{marginRight:'1.5em'}}/>
                {t('cookie_msg')}
        </CookieConsent>
    </> 
}