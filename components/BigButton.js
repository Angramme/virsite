import styles from '../styles/big_button.module.sass'

import Link from 'next/link'

export default function BigButton({btns, topOffset, ...props}){
    return <div {...props} className={props.className+' '+styles.container} style={{
        marginTop: topOffset,
        ...props.style,
    }}>
        {btns.map(([btn, href, as])=><h1 
            className={styles.big_button}
            key={btn}>
            <div className={styles.magic_box}></div>
            <Link key={btn} href={href} as={as}>{btn}</Link>
        </h1>)}
    </div>
}