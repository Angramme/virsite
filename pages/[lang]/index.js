import React from 'react'

import BigButton from '../../components/BigButton';
import DynamicImage from '../../components/DynamicImage';
import SiteLayout from '../../components/SiteLayout';

// import getRedirects from '../../data/redirects'
// import 
//     withRedirects, { 
//     getStaticPropsHOF as red_getStaticPropsHOF, 
//     getStaticPathsHOF as red_getStaticPathsHOF } 
//     from '../../hoc/withRedirects'
import withLayout from '../../hoc/withLayout';
import 
    withLocale, { 
    getStaticPropsHOF as loc_getStaticPropsHOF, 
    getStaticPathsHOF as loc_getStaticPathsHOF } 
    from '../../hoc/withLocale'

import useTranslation from '../../hooks/useTranslation'
import { capitalize_first } from '../../lib/helpers/string';

import styles_help from '../../styles/helpers.module.sass'

const Index = ()=>{
    const { t, locale } = useTranslation();
    return <div className={styles_help.container}>
        <div className={styles_help.flex_container}>
            <div className={styles_help.col25}>
                <DynamicImage ratio={1} nextSizes={["70vh"]} src={'/img/luk.jpg'}></DynamicImage>    
            </div>
            <div>
                <h1>{capitalize_first(t('about_us'))}</h1>
                {t('bio')}
            </div>
        </div>
        <BigButton btns={[
            [t('gallery'), '/[lang]/gallery', `/${locale}/gallery`],
            // [t('contact'), '/[lang]/contact', `/${locale}/contact`]
            ]} topOffset="7rem"/>
    </div>
}

export const getStaticProps = loc_getStaticPropsHOF();
export const getStaticPaths = loc_getStaticPathsHOF();

export default withLocale(withLayout(Index, x=>
        <SiteLayout pageTitle={'home'}>
            {x}
        </SiteLayout>
    ));

// const param = 'lang';
// const redirects = getRedirects();
// export const getStaticProps = red_getStaticPropsHOF(redirects, param, loc_getStaticPropsHOF());
// export const getStaticPaths = red_getStaticPathsHOF(redirects, param, loc_getStaticPathsHOF());

// export default withRedirects(withLocale(withLayout(Index, x=>
//         <SiteLayout pageTitle={'home'}>
//             {x}
//         </SiteLayout>
//     )));