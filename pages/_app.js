import App, { Container } from 'next/app'
import Head from 'next/head'

import { AppLayout, BottomNav, SideNav } from '../components/Layout'

export default class RADApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Head>
          <title>RAD Kanban</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
        </Head>
        <AppLayout>
          <SideNav />
          <Component {...pageProps} />
          <BottomNav>
            <p>Hello</p>
          </BottomNav>
        </AppLayout>
      </Container>
    )
  }
}
