import { locales, defaultLocale } from './config'

export function isLocale(tested) {
    return locales.some(locale => locale === tested)
}

export function getInitialLocale(){
  // preference from the previous session
  const localSetting = localStorage.getItem('locale')
  if (localSetting && isLocale(localSetting)) {
    return localSetting
  }

  // the language setting of the browser
  const [browserSetting] = navigator.language.split('-')
  if (isLocale(browserSetting)) {
    return browserSetting
  }

  return defaultLocale
}