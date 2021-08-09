

const check_params = (redirects, param, callback)=>(
    redirects && typeof redirects === 'object' &&
    param && typeof param === 'string');

const await_params = async (...params)=>{
    return await Promise.all(params);
}

export const getStaticPropsHOF = (redirects, param, callback) => {
    const getStaticPropsWrapped = async (ctx)=>{
        [redirects, param, callback] = await await_params(redirects, param, callback);
        if(!check_params(redirects, param, callback)){
            console.error('redirects and param are required');
            return null;
        }

        const page = ctx.params[param];
        if(!redirects[page]) 
            return callback ? await callback(ctx) || {} : {};
        return {
            redirect: {
                destination: `/${redirects[page]}`,
                statusCode: 301,
            }
        }
    };
    return getStaticPropsWrapped;
}

export const getStaticPathsHOF = (redirects, param, callback) => {
    const getStaticPathsWrapped = async (ctx)=>{
        [redirects, param, callback] = await await_params(redirects, param, callback);
        if(!check_params(redirects, param, callback)){
            console.error('redirects and param are required');
            return null;
        }

        const obj = await callback(ctx);
        return {
            paths: obj.paths.concat(
                Object.keys(redirects)
                .map(x=>{
                    let obj = {};
                    obj[param] = x;
                    return obj;
                })
                .map(x=>({params: x}))),
            fallback: obj.fallback || false,
        }
    }
    return getStaticPathsWrapped;
}

export default function withRedirects(x){return x}