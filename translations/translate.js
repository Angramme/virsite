import strings from './strings'
import { defaultLocale } from '../translations/config'

export default function translate(locale, key){
    if (!strings[locale][key]) {
        console.warn(`Translation '${key}' for locale '${locale}' not found.`)
    }
    return strings[locale][key] || strings[defaultLocale][key] || `[not found][${key}]`
}