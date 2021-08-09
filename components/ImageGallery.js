import { useEffect, useState, useRef } from 'react';
import useTranslation from 'hooks/useTranslation';

import {GrClose} from 'react-icons/gr'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import Image from 'components/Image'

import styles from 'styles/img_gallery.module.sass'


export default function ImageGallery({images, ...props}){
    const {t} = useTranslation();

    const default_size = 40;
    const default_unit = 'vh';

    const activeclass = (stl)=>(displayActive? stl+' '+styles.active : stl);
    const [displayActive, setDisplayActive] = useState(false);
    const [displayVisible, setDisplayVisible] = useState(false);
    const [displayLoading, setDisplayLoading] = useState(false);
    const [displayData, setDisplayData] = useState({
        src: images[0].full_url,
    });
    const [displayZoomed, setDisplayZoomed] = useState(false);
    const zoomBox = useRef();

    const openDisplay = (img_src)=>{
        setDisplayLoading(true);
        setDisplayZoomed(false);
        setDisplayVisible(true);
        setDisplayActive(true);
        setDisplayData({
            src: img_src,
        });
        zoomBox.current.style.left = zoomBox.current.style.top = null;
    };
    const closeDisplay = ()=>{
        setDisplayLoading(false);
        setDisplayActive(false);
        setTimeout(()=>setDisplayVisible(false), 350);
        setDisplayZoomed(false);
        zoomBox.current.style.left = zoomBox.current.style.top = null;
    }
    const getOnMove = ()=>!displayZoomed ? null : (ctx)=>{
        // raw js is faster than state driven style, less lag
        zoomBox.current.style.left = `${(-ctx.clientX+window.innerWidth*.5)}px`;
        zoomBox.current.style.top = `${(-ctx.clientY+window.innerHeight*.5)}px`;
    };

    return <div>
        <div 
            className={activeclass(styles.display_container)}
            style={{display:(displayVisible ? 'block' : 'none')}}
            >
            <div className={styles.display_loading}
                style={{display: displayLoading ? 'block' : 'none'}}>
                    <div className={styles.loading_container}><AiOutlineLoading3Quarters/></div>
                    {t('loading')}...
            </div>
            <div 
                ref={zoomBox}
                className={activeclass(styles.display_container2)
                    +(displayZoomed?' '+styles.zoomed:'')}
                >
                <Image
                    {...displayData}
                    quality={100}
                    className={activeclass(styles.display_image)}
                    layout="fill"
                    onLoad={()=>setDisplayLoading(false)}
                    />
            </div>
            <div
                className={styles.drag_device}
                onDrag={getOnMove()}
                onMouseDown={(ctx)=>{
                    if(displayZoomed){
                        zoomBox.current.style.left =  zoomBox.current.style.top = null;
                    }else{
                        zoomBox.current.style.left = `${(-ctx.clientX+window.innerWidth*.5)}px`;
                        zoomBox.current.style.top = `${(-ctx.clientY+window.innerHeight*.5)}px`;
                    }
                    setDisplayZoomed(!displayZoomed);
                }}
                onPointerMove={getOnMove()}
                style={{cursor: displayZoomed ? 'zoom-out' : 'zoom-in'}}
                />
            <GrClose
                className={styles.close_button}
                onMouseDown={closeDisplay}/>
        </div>
        <ul className={styles.container}>
            {images.map(({filename, full_url, width, height})=>{
                if(!filename || !full_url || !width || !height)
                    console.error("image data incomplete for: "+filename);

                const ss = (size)=>`${Math.round(size)}`+default_unit;
                const width_l = default_size*width/height;
                const height_l = default_size;

                return <li 
                    key={filename} 
                    className={styles.image_container}
                    style={{ height: ss(height_l), width:ss(width_l) }}
                    onMouseDown={()=>openDisplay(full_url)}
                    >
                    <Image 
                        layout="fill"
                        sizes={[ss(Math.max(width_l, height_l)*1.3)]}
                        quality={65}
                        // width={width} 
                        // height={height} 
                        className={styles.next_img} 
                        src={full_url}/>    
                </li>
            })}
            <li className={styles.image_container}/> {/* avoid stretching last element */}
        </ul>
    </div>
}