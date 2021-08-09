// components/LocaleSwitcher.tsx

import React from 'react'
import { useRouter } from 'next/dist/client/router'
import { locales, languageNames, countryCodes } from '../translations/config'
import { LocaleContext } from '../context/LocaleContext'
import Flag from 'react-world-flags'
import styles from '../styles/language.module.sass'

const LocaleSwitcher = ({...pageProps}) => {
  const router = useRouter()
  const { locale } = React.useContext(LocaleContext)

  const handleLocaleChange = (new_locale)=>React.useCallback(
    () => {
      const regex = new RegExp(`^/(${locales.join('|')})`)
      router.push(router.pathname, router.asPath.replace(regex, `/${new_locale}`))
    },
    [router]
  );

  return (<div {...pageProps } className={pageProps.className+' '+styles.container}>
      {locales.map(x=>
        <div key={'option'+x} className={styles.flag_container}
          onClick={handleLocaleChange(x)}>
          <span className={styles.flag_helper}></span>
          <Flag code={countryCodes[x]}/>
        </div>
      )}
    </div>
  )
}

export default LocaleSwitcher