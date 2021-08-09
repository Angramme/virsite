
export default !process.env.USE_CUSTOM_OPTIMIZED_IMAGES ? require('next/image').default : 
function MyImage({src, quality, sizes, layout, ...props}){
    if(layout != 'fill') console.error("unsupported layout specified!");
    const url = `${src.substr(5)}`; // remove the /img/
    const generated_image = quality>90 ? 
        require(`public/img/${url}?resize&sizes[]=500&sizes[]=700&sizes[]=900&sizes[]=1000&sizes[]=1500&sizes[]=2000`) : 
        require(`public/img/${url}?resize&sizes[]=300&sizes[]=500&sizes[]=700`);
    return <img
        {...props}
        // src={'/public/img/buzia1.jpg'}
        srcSet={generated_image.srcSet} // optimized multiple sizes for different screens etc
        src={generated_image.src}
        sizes={sizes}
        decoding={'async'}
        style={{
            position: 'absolute',
            top:0,
            left:0,
            bottom:0,
            right:0,
            boxSizing: 'border-box',
            padding:0,
            border: 'none',
            margin: 'auto',
            display: 'block',
            width:0,
            height:0,
            minWidth: '100%',
            maxWidth: '100%',
            minHeight: '100%',
            maxHeight: '100%',
            //backgroundColor: require(`${url}?lqip-colors`)[0],
            ...props.style,
        }}
        />
}