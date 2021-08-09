import withLocale, {getStaticPropsHOF, getStaticPathsHOF} from '../../hoc/withLocale'
import withLayout from '../../hoc/withLayout'

import useTranslation from '../../hooks/useTranslation'
import translate from '../../translations/translate'
import { capitalize_first } from '../../lib/helpers/string'

import SiteLayout from '../../components/SiteLayout'
import Link from 'next/link'

import { locales, languageNames } from '../../translations/config'
import { menu_options } from '../../components/Navigation'

import styles_help from '../../styles/helpers.module.sass'

const Sitemap = ()=>{
    const { t, locale } = useTranslation();
    return <div className={styles_help.container}>
        <h1>{capitalize_first(t('sitemap'))}</h1>
        {locales.map(loc=>
            <div key={loc}>
                <h2>{languageNames[loc]}</h2>
                {menu_options.map(([opt, url])=>
                    <div key={loc+opt}>
                        <Link 
                            href={`/[lang]/${url}`} 
                            as={`/${loc}/${url}`}>
                            {translate(loc, opt)}
                        </Link>
                    </div>
                )}
            </div>
        )}
    </div>
}

export const getStaticProps = getStaticPropsHOF();
export const getStaticPaths = getStaticPathsHOF();

export default withLocale(withLayout(Sitemap, x=>
        <SiteLayout pageTitle={'sitemap'}>
            {x}
        </SiteLayout>
    ));