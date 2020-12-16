import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import NewRelic from 'new-relic-agent-react'
import 'antd/dist/antd.css'

import withApollo from '../lib/apollo'
import {
  NEW_RELIC_LICENSE_KEY,
  NEW_RELIC_APPLICATION_ID
} from '../configs/vars'
import '../sass/styles.scss'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          ></link>
          <NewRelic
            licenseKey={NEW_RELIC_LICENSE_KEY}
            applicationID={NEW_RELIC_APPLICATION_ID}
          />
        </Head>

        <>
          <Component {...pageProps} />
        </>
      </>
    )
  }
}

export default withApollo({ ssr: false })(MyApp)
