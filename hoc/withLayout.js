

export default function withLayout(Component, func){
    const to_ret = ({...pageProps})=>func(<Component {...pageProps}/>);
    to_ret.getInitialProps = Component.getInitialProps;
    return to_ret;
}