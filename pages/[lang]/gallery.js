import withLocale from '../../hoc/withLocale'
import withLayout from '../../hoc/withLayout'
import { getStaticPathsHOF, getStaticPropsHOF } from '../../hoc/withLocale'
import useTranslation from '../../hooks/useTranslation'

import SiteLayout from '../../components/SiteLayout'
import ImageGallery from '../../components/ImageGallery'

import styles_help from '../../styles/helpers.module.sass'

import sizeOf from 'image-size'
import path from 'path'
import { capitalize_first } from '../../lib/helpers/string'
import BigButton from '../../components/BigButton'


const Gallery = ({imageData})=>{
    const {t, locale} = useTranslation();
    return <div className={styles_help.container}>
        <h1>{capitalize_first(t('gallery'))}</h1>
        <ImageGallery images={imageData}/>
        <BigButton btns={[[t('contact'), '/[lang]/contact', `/${locale}/contact`]]} topOffset={"10rem"}/>
    </div>
};

export const getStaticPaths = getStaticPathsHOF();
export const getStaticProps = getStaticPropsHOF(async ctx=>{
    const {imageUrls:images} = await import('../../data/gallery-images.js');

    return {
        props: {
            imageData: images.map(({filename, full_url})=>{
                const {width, height} = sizeOf(
                    path.join(process.cwd(), 'public', full_url));
                return{
                    filename, full_url,
                    width, height,
                }
            })}}
});

export default withLocale(withLayout(Gallery, x=>
    <SiteLayout pageTitle="gallery">{x}</SiteLayout>))