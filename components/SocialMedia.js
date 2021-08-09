import styles from '../styles/social.module.sass'
import { HiShare } from 'react-icons/hi'
import { AiFillFacebook } from 'react-icons/ai'
import {GrClose} from 'react-icons/gr'

import React, { useState } from 'react'

const RShare = require("react-share");
const share_platforms = Object.keys(RShare)
.reduce((arr, x)=>{
    let re = x.match(/(.*)ShareButton/);
    if(re) arr.push(re[1]);
    return arr;
}, []);


export default function SocialMedia({...props}){
    const [shareVisible, setShareVisible] = useState(false);

    return <div {...props} className={props.className+' '+styles.container}>
        <a href="https://www.facebook.com/Vitraux-dArt-Izabela-Ozieblowska-1738121579832625/" target="_blank"><AiFillFacebook/></a>
        {/* <a href="http://www.google.com" target="_blank"><HiShare/></a> */}
        <a onClick={()=>setShareVisible(true)}><HiShare/></a>
        <div 
            className={styles.social_popup}
            style={{
                display: shareVisible ? null : "none",
            }}
            >
            {share_platforms.map(platform=>
            <div key={platform}>
                {React.createElement(
                    RShare[platform+'ShareButton'], 
                    {
                        url: process.env.FULL_SITE_URL,
                        image: `${process.env.FULL_SITE_URL}/luk.jpg`,
                        ...(platform=="Pinterest"?{media:`${process.env.FULL_SITE_URL}/luk.jpg`}:{})
                    }, 
                    React.createElement(
                        RShare[platform+'Icon'],
                        {
                            round: false,
                            borderRadius: ".3rem",
                            size: "3rem",
                            bgStyle: {
                                // fill: "gray",
                            },
                        },
                        null
                    ))}
            </div>
            )}
        </div>
        <div 
            className={styles.cover_up}
            style={{
                display: shareVisible ? null : "none",
            }}>
                <div 
                    className={styles.close_btn}
                    onClick={()=>setShareVisible(false)}>
                    <GrClose/>
                </div>
            </div>
    </div>
}