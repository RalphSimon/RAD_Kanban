import { Fragment } from 'react'
import App, { Container } from 'next/app'
import Router from 'next/router'
import Head from 'next/head'
import { Home, LogIn, Trello } from 'styled-icons/feather'

// import { resetServerContext } from 'react-beautiful-dnd'

import { SignOutButton } from '../components/Buttons'
import { AppLayout } from '../components/Layout'
import { BottomNav, NavItem, SideNav } from '../components/Navigation'
import { FirebaseContext } from '../firebase/context'
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

        <FirebaseContext>
          <AppLayout>
            <SideNav>
              <Fragment>
                <NavItem href="/" label="Home">
                  <Home size="24" strokeWidth="1.5" />
                </NavItem>
                <NavItem href="/modal" label="Modal">
                  <Trello size="24" strokeWidth="1.5" />
                </NavItem>
                <NavItem href="/auth" label="auth">
                  <LogIn size="24" strokeWidth="1.5" />
                </NavItem>
                <SignOutButton />
              </Fragment>
            </SideNav>

            <Component {...pageProps} />

            <BottomNav>
              <Fragment>
                <NavItem href="/" label="Home">
                  <Home size="24" strokeWidth="1.5" />
                </NavItem>
                <NavItem href="/modal" label="Modal">
                  <Trello size="24" strokeWidth="1.5" />
                </NavItem>
                <NavItem href="/auth" label="auth">
                  <LogIn size="24" strokeWidth="1.5" />
                </NavItem>
                <SignOutButton />
              </Fragment>
            </BottomNav>
          </AppLayout>
        </FirebaseContext>
      </Container>
    )
  }
}
