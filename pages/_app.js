import React from "react";
import App from "next/app";
import '../styles/global.sass'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Component {...pageProps}></Component>
    );
  }
}

export default MyApp;
