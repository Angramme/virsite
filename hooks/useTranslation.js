import { useContext } from 'react'
import { LocaleContext } from '../context/LocaleContext'
import translate from '../translations/translate'

export default function useTranslation() {
  const { locale } = useContext(LocaleContext)

  function t(key) {
    return translate(locale, key);
  }

  return {
    t,
    locale
  }
}