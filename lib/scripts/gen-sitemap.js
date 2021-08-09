const { SitemapStream, streamToPromise } = require('sitemap');
const { locales, defaultLocale } = require('../../translations/config');
const { imageUrls: galleryImages } = require('../../data/gallery-images');

module.exports.generateSitemap = async function generateSitemap() {
    // const siteUrl = process.env.FULL_SITE_URL;
    const siteUrl = 'www.vitraux-artistiques-izabela.fr';
    
    const smStream = new SitemapStream({
        hostname: `https://${siteUrl}`,
        xmlns: { news: false },
    });

    const get_nav_in_lang = (lang)=>([
        { lang: lang, url: `https://${siteUrl}/${lang}/` },
        { lang: lang, url: `https://${siteUrl}/${lang}/contact` },
        { lang: lang, url: `https://${siteUrl}/${lang}/creation` },
        { lang: lang, url: `https://${siteUrl}/${lang}/gallery` },
    ]);

    const get_locale_switcher = (url)=>locales.map(lang=>({
        lang: lang, url: `https://${siteUrl}/${lang}/${url}`,
    }));

    const get_priority = (val, lang)=>val * (lang==defaultLocale? 1.0 : 0.9);

    const get_images = (imgs)=>imgs.map(img=>({
        url: `https://${siteUrl}/img/${img}`,
        caption: `${img}`,
        // caption: 'An image',
        // title: 'The Title of Image One',
        // geoLocation: 'London, United Kingdom',
        // license: 'https://creativecommons.org/licenses/by/4.0/'
    }));

    [
        { 
            url: '', 
            priority: 1, 
            changefreq: "weekly", 
            img: get_images(['luk.jpg']),
        },
        { 
            url: 'contact', 
            priority: 1, 
            changefreq: "weekly", 
        },
        { 
            url: 'creation', 
            priority: 0.7, 
            changefreq: "weekly",
            img: get_images(['buzia1.jpg', 'slimak1.jpg']),
        },
        {
            url: 'gallery',
            priority: 0.8,
            changefreq: "weekly",
            img: get_images(galleryImages.map(x=>x.filename)),
        },
    ].forEach(({url, priority, changefreq, img})=>
        locales.forEach(lang=>
            smStream.write({
                url: `/${lang}/${url}`,
                priority: get_priority(priority, lang),
                changefreq: changefreq,
                links: [
                    ...get_nav_in_lang(lang),
                    ...get_locale_switcher(url),
                ],
                img: img || [],
            })));

    smStream.end();
    return (await streamToPromise(smStream)).toString();
};

