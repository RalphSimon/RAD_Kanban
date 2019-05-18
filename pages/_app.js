import App, { Container } from 'next/app'
import Head from 'next/head'
import { Chrome, Database, Home, Trello } from 'styled-icons/feather'
// import { resetServerContext } from 'react-beautiful-dnd'

import { AppLayout, BottomNav, NavItem, SideNav } from '../components/Layout'

/*
  FIXME: Move this to _document.js
  resetServerContext()
*/
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
          <SideNav>
            <NavItem href="/" label="Home">
              <Home size="24" strokeWidth="1.5" />
            </NavItem>
            <NavItem href="/project" label="project">
              <Trello size="24" strokeWidth="1.5" />
            </NavItem>
            <NavItem href="/modal" label="Modal">
              <Chrome size="24" strokeWidth="1.5" />
            </NavItem>
            <NavItem href="/database" label="Database">
              <Database size="24" strokeWidth="1.5" />
            </NavItem>
          </SideNav>
          <Component {...pageProps} />
          <BottomNav>
            <NavItem href="/" label="Home">
              <Home size="24" strokeWidth="1.5" />
            </NavItem>
            <NavItem href="/project" label="project">
              <Trello size="24" strokeWidth="1.5" />
            </NavItem>
            <NavItem href="/modal" label="Modal">
              <Chrome size="24" strokeWidth="1.5" />
            </NavItem>
            <NavItem href="/database" label="Database">
              <Database size="24" strokeWidth="1.5" />
            </NavItem>
          </BottomNav>
        </AppLayout>
      </Container>
    )
  }
}
