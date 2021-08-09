import SiteLayout from "../../components/SiteLayout"
import Image from '../../components/Image'

import withLayout from "../../hoc/withLayout"
import withLocale from "../../hoc/withLocale"
import { getStaticPropsHOF, getStaticPathsHOF } from '../../hoc/withLocale'
import useTranslation from "../../hooks/useTranslation"

import styles_help from '../../styles/helpers.module.sass'
import {capitalize_first} from '../../lib/helpers/string'
import DynamicImage from "../../components/DynamicImage"


const Creation = ()=>{
    const {t} = useTranslation();
    return <div className={styles_help.container}>
        <h1>{capitalize_first(t('creation'))}</h1>
        <div className={styles_help.flex_container}>
            <div>
                {t('process1')}
                <br/><br/>
                {t('process2')}
            </div>
            <div className={styles_help.col25}>
                <DynamicImage ratio={1.08} nextSizes={["70vh"]} src="/img/buzia1.jpg"></DynamicImage>
            </div>
        </div>
        <div className={styles_help.flex_container}>
            <div className={styles_help.col25}>
                <DynamicImage ratio={1} nextSizes={["70vh"]} src="/img/slimak1.jpg"></DynamicImage>
            </div>
            <div>
                {t('process3')}
            </div>
        </div>
    </div>
}

export const getStaticProps = getStaticPropsHOF();
export const getStaticPaths = getStaticPathsHOF();

export default withLocale(withLayout(Creation, x=>
    <SiteLayout pageTitle="creation">{x}</SiteLayout>));