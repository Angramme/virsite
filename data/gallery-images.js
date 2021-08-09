
module.exports.imageFolders = [
        {
            "folder":"/img/",
            "filenames":[
                "winogrona.jpg",
                "buzia1.jpg",
                "luk.jpg",
                "abstract2.jpg",
                "vitriol.png",
                "wdomu.jpg",
                "golab1.png",
                "herb3.png",
                "winogrona2.png",
                "herb2.png",
                "chimera1.png",
                "chimera2.jpg",
                "jezus1.jpg",
                "herb1.jpg",
                "konieca.png",
                "maria1.jpg",
                "maria2.jpg",
                "peugeot1.jpg",
                "plafon.png",
                "rog1.jpg",
                "rog2.jpg",
                "rosetta1.jpg",
                "ryba1.jpg",
                "ryba2.jpg",
                "slimak1.jpg",
                "tallboy1.jpg",
                "tallboy2.jpg",
                "abstract3.png",
                "abstract4.png",
                "abstract5.jpg"
            ]
        },
    ];

module.exports.imageUrls = [].concat(...module.exports.imageFolders.map(
    ({folder, filenames})=>filenames.map(filename=>({
        filename,
        full_url: folder+filename,
    }))));