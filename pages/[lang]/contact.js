import { useEffect, useState } from 'react'
import SiteLayout from "../../components/SiteLayout"
import withLayout from "../../hoc/withLayout"
import withLocale, { getStaticPropsHOF, getStaticPathsHOF } from "../../hoc/withLocale"

import styles_help from '../../styles/helpers.module.sass'
import styles from '../../styles/contact.module.sass'

import 'leaflet/dist/leaflet.css'

import dynamic from 'next/dynamic'
import useTranslation from '../../hooks/useTranslation'
import { capitalize_first } from '../../lib/helpers/string'
const import_react_leaflet = async ()=>{
    if(!window.__react_leaflet_module) window.__react_leaflet_module = await import('react-leaflet');
    return window.__react_leaflet_module;
}
const react_leaflet_import_components = mod_names=>{
    let ret = {};
    for(let mod_name of mod_names){
        ret[mod_name] = dynamic(
            ()=>import_react_leaflet().then(mod=>mod[mod_name]),
            { ssr:false });
    }
    return ret;
};
const { MapContainer, TileLayer, Marker, Popup } = react_leaflet_import_components(['MapContainer', 'TileLayer', 'Marker', 'Popup']);

const Contact = ()=>{
    const {t, locale} = useTranslation();

    const position = [46.951540, 4.633121];
    const [marker_icon, setMarker_icon] = useState();
    useEffect(async ()=>{
        const leaflet = await import('leaflet');
        await setMarker_icon(leaflet.icon({ 
            iconUrl: "/map-marker.png",
            iconSize: leaflet.point(50, 50),
            iconAnchor: leaflet.point(25, 50),
        }));
    }, [])
    
    return <div className={styles_help.container}>
        <h1>{capitalize_first(t('contact'))}</h1>
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            <Marker {...(marker_icon? {icon:marker_icon}:{})} position={position}>
                {/* <Popup>Notre atelier.</Popup> */}
            </Marker>
        </MapContainer>
        
        <div className={styles.flex_info} style={{textAlign:"left"}}>
            <div>
                <h3>{capitalize_first(t('our_coordinates'))}</h3>
                Vitraux d'Art Ozieblowski <br/>
                <a 
                    href="https://goo.gl/maps/8keDcR273fxPHE7Y7"
                    target="_blank">
                    2, rue de l'Eglise <br/>
                    21340 Nolay <br/>
                    France <br/>
                </a>
            </div>
            <div>
                <h3>{capitalize_first(t('contact'))}</h3>
                tel: <a href="tel:+33687940757">+33 687/940757</a><br/>
                email: <a href = "mailto: izaozi@orange.fr ">izaozi@orange.fr </a> <br/>
            </div>
            <div>
                <h3>{capitalize_first(t('headquarters'))}</h3>
                Vitraux d'Art Franciszek Ozieblowski <br/>
                <a 
                    href="https://goo.gl/maps/8keDcR273fxPHE7Y7"
                    target="_blank">
                    2, rue de l'Eglise <br/>
                    21340 Nolay <br/>
                    France <br/>
                </a>
            </div>
            <div>
                <h3>{capitalize_first(t('legal_representative'))}</h3>
                Franciszek Ozieblowski <br/>
                Izabela Ozieblowska <br/>
                <br/>
                SIRET: 849.321.104.00010 <br/>
            </div>
        </div>
    </div>
}

export const getStaticProps = getStaticPropsHOF();
export const getStaticPaths = getStaticPathsHOF();

export default withLocale(withLayout(Contact, x=>
    <SiteLayout pageTitle="contact">{x}</SiteLayout>));