import Link from 'next/link'

import useTranslation from '../hooks/useTranslation'
import styles from '../styles/footer.module.sass'
import {capitalize_first} from '../lib/helpers/string'
import {menu_options} from '../components/Navigation'

export default function Footer(){
    const {t, locale} = useTranslation();
    return <div className={styles.container}>
        <div className={styles.divider}/>
        <div className={styles.flex}>
            <div>
                <h3>{capitalize_first(t('contact'))}</h3>
                tel: <a href="tel:+33687940757">+33 687/940757</a><br/>
                email: <a href = "mailto: izaozi@orange.fr ">izaozi@orange.fr </a> <br/>
            </div>
            <div>
                <h3>{capitalize_first(t('social_media'))}</h3>
                <a href="https://www.facebook.com/Vitraux-dArt-Izabela-Ozieblowska-1738121579832625/" target="_blank">Facebook</a> <br/>
                {/* Partager: truc <br/> */}
            </div>
            <div>
                <h3>{capitalize_first(t('sitemap'))}</h3>
                {menu_options.map(x=><span key={x[0]}>
                    <Link href={`/[lang]/${x[1]}`} as={`/${locale}/${x[1]}`}>{t(x[0])}</Link>
                    <br/>
                </span>)}
                <br/>
                <Link href={`/[lang]/sitemap`} as={`/${locale}/sitemap`}>sitemap</Link>
            </div>
            <div>
                <h3>{capitalize_first(t('support'))}</h3>
                <a href="jaimelabourgogne.com" target="_blank">jaimelabourgogne.com</a> <br/>
                <a href="https://infovitrail.com/index.php/fr/ateliers-de-vitrail/ateliers-vitrail-france/ateliers-vitrail-cote-d-or-21/2128-vitraux-d-art-izabela-ozieblowska" target="_blank">infovitrail.com</a> <br/>
            </div>
        </div>
        <div className={styles.divider}/>
        <div>
            &copy; Copyright Izabela Ozieblowska; &#8195; Design Kacper Ozieblowski;
        </div>
    </div>
}