import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import SocialMedia from './SocialMedia'
import LocaleSwitcher from './LocaleSwitcher'
import useTranslation from '../hooks/useTranslation'
import styles from '../styles/nav.module.sass'

import { BsArrowRight } from 'react-icons/bs'
const RightArrow = ()=><BsArrowRight style={{display:"block", verticalAlign: 'baseline'}}/>;

export const menu_options = [
    ['home', ''],
    ['creation', 'creation'],
    ['restoration', 'restoration'],
    ['gallery', 'gallery'],
    ['contact', 'contact'],
];

const Navigation = ({currentPage}) => {
  const { t, locale } = useTranslation();
  const MaxAspectRatio = 3/2;
  const [ aspectRatio, setAspectRatio ] = useState();
  const [ menuOpen, setMenuOpen ] = useState(false);
  const getMenuClosed = () => aspectRatio < MaxAspectRatio && !menuOpen;

  useEffect(() => {
    const resizeListener = () => setAspectRatio(window.innerWidth/window.innerHeight);
    resizeListener();
    window.addEventListener('resize', resizeListener);
    return () => window.removeEventListener('resize', resizeListener);
  }, []);

  return (
    <div className={styles.filler}>
        <div 
            className={styles.container}
            onMouseLeave={()=>setMenuOpen(false)}
            onPointerLeave={()=>setMenuOpen(false)}
            style={{
                left: getMenuClosed() ? "-20rem" : "0",
                opacity: getMenuClosed() ? 0 : 100,
            }}>
            <h1 className={styles.header}>{t('stained_glass_art')}<br/>{t('name')}</h1>
            <div className={styles.menu}>
                {menu_options.map(
                    x=><div key={x[0]} className={currentPage==x[0]? 
                            styles.current_button : styles.button}>
                        <Link 
                            href={`/[lang]/${x[1]}`} 
                            as={`/${locale}/${x[1]}`}>
                                {t(x[0])}
                        </Link>
                    </div>
                )}
            </div>
            <SocialMedia onClick={()=>setMenuOpen(true)}/>
            <LocaleSwitcher className={styles.language}/>
        </div>
        <div 
            className={styles.open_menu_btn} 
            onClick={()=>setMenuOpen(true)}
            style={{
                left: getMenuClosed() ? "0" : "-10rem"
            }}>
            <div>
                <RightArrow/> 
                {[].concat(...Array.from({length:3},(v,k)=>[
                    <div key={'d'+k}>{t('menu')}</div>, 
                    <RightArrow key={'ra'+k}/>
                ]))}  
            </div>
        </div>
    </div>
  );
}

export default Navigation