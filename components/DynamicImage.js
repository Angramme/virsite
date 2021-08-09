import Image from './Image'
import styles from '../styles/dynamic_image.module.sass'

export default function DynamicImage({src, ratio, nextSizes, ...props}){
    return <div {...props} style={{
        display: "inline-block",
        position: "relative",
        width: "100%",
    }} className={props.className+' '+styles.container}>
        <div style={{
            marginTop: `${ratio*100}%`
        }}></div>
        <Image layout="fill" src={src} sizes={nextSizes||["100vw"]} quality={80} style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "silver",
        }}></Image>
    </div>
}