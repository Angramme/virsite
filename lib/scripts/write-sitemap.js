const {generateSitemap} = require('./gen-sitemap');
const fs = require('fs');


generateSitemap()
.then(sm=>{
    fs.writeFileSync('public/sitemap.xml', sm);
})
