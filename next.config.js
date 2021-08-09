const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images');
const path = require('path')

const base_config = {
        env: {
            FULL_SITE_URL: "https://www.vitraux-artistiques-izabela.fr",
            USE_CUSTOM_OPTIMIZED_IMAGES: true, // next-optimized-images and my custom image component
        },
        future: {
            webpack5: true,
        },
        webpack: (config, { isServer }) => {
            config.resolve.modules.push(path.resolve('./'));
            if (isServer) require('./lib/scripts/write-sitemap');
            return config
        },
        async redirects() {
            return [
                ...([
                    ['/créations-des-vitraux', '/fr/creation'],
                    ['/restauration-des-vitraux', '/fr/restoration'],
                    ['/contact', '/fr/contact'],
                    ['/mentions-légales', '/fr/contact'],
                    ['/soutien', '/fr/contact'],
                ]).map(([source, destination])=>({source, destination, permanent: true, statusCode: 301})),
                // other stuff
            ]
        },
    };

module.exports = base_config;

module.exports = withPlugins([
    [optimizedImages, {
        imagesFolder: 'public/img',
        responsive: {
            adapter: require('responsive-loader/sharp')
        }
    }], 
], base_config);
