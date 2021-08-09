import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { defaultLocale } from '../translations/config'

module.exports = async function getRedirects(){
    const pages = await promisify(fs.readdir)
        (path.resolve(`${process.cwd()}/pages/[lang]/`))
        .then(X=>X
            .map(url=>url.split('.')[0])
            .filter(x=>x != 'index')
            .reduce((o, e)=>{
                o[e] = `${defaultLocale}/${e}`;
                return o;
            }, {})
            )
    return {
        // redirects to default language
        ...pages,
        // custom redirects (from old website)
        ...{
            'créations-des-vitraux':'fr/creation',
            'restauration-des-vitraux':'fr/restoration',
            'contact':'fr/contact',
            'mentions-légales':'fr/contact',
            'soutien':'fr/contact',
        }
    };
};