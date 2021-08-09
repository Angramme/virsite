import React from "react";
import Error from "next/error";

import { isLocale } from "../translations/getInitialLocale";
import { LocaleProvider } from "../context/LocaleContext";

import { locales } from '../translations/config'

export const getStaticPropsHOF = (callback) => async (ctx) => {
  let pageProps = callback ? (await callback(ctx)) : null;
  if(pageProps && pageProps.notFound) return { notFound:true };
  const revalidate = pageProps ? pageProps.revalidate || false : false;
  pageProps = pageProps ? pageProps.props || {} : {};

  if (typeof ctx.params.lang !== "string" || !isLocale(ctx.params.lang))
	return { notFound:true };
    // return { props: { ...pageProps, locale: undefined } };
  return { props: { ...pageProps, locale: ctx.params.lang }, revalidate };
};

export const getStaticPathsHOF = (callback)=> async (ctx) =>{
	const def = callback ? await callback(ctx) : null;
	if(def && (!def.paths || !def.fallback)) console.error("both paths and fallback keys are required [check: https://nextjs.org/docs/basic-features/data-fetching]")
	return {
		paths: [].concat(...locales.map(lang=>
			(def && def.paths && def.paths.length > 0) ?
			def.paths.map(({params})=>({
				params: { lang, ...params }
			}))
			: [{ params: {lang} }]
		)),
		fallback: (def && def.fallback) ? def.fallback : false,
	}
}

export default function withLocale(WrappedPage) {
  const WithLocale = ({ locale, ...pageProps }) => {
    if (!locale) {
      // no valid locale detected
      return <Error statusCode={404} />;
    }
    return (
      <LocaleProvider lang={locale}>
        <WrappedPage {...pageProps} />
      </LocaleProvider>
    );
  };

//   WithLocale.getInitialProps = async (ctx) => {
//     // retrieve initial props of the wrapped component
//     let pageProps = {};
//     if (WrappedPage.getInitialProps) {
//       pageProps = await WrappedPage.getInitialProps(ctx);
//     }

//     if (typeof ctx.query.lang !== "string" || !isLocale(ctx.query.lang)) {
//       // in case the value of 'lang' is not a valid locale return it as undefined
//       return { ...pageProps, locale: undefined };
//     }

//     // the locale is valid
//     return { ...pageProps, locale: ctx.query.lang };
//   };

  return WithLocale;
}
