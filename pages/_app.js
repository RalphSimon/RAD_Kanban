import { Fragment } from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { Home, User, PlayCircle } from 'styled-icons/feather'

// import { resetServerContext } from 'react-beautiful-dnd'

import { SignOutWithConfirmation } from '../components/Auth'
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
    const { Component, pageProps, router } = this.props

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
                <NavItem href="/" label="Home" currentRoute={router.route}>
                  <Home size="24" strokeWidth="1.5" />
                </NavItem>
                <NavItem
                  href="/profile"
                  label="Profile"
                  currentRoute={router.route}>
                  <User size="24" strokeWidth="1.5" />
                </NavItem>
                <NavItem
                  href="/notifications"
                  label="alerts"
                  currentRoute={router.route}>
                  <PlayCircle size="24" strokeWidth="1.5" />
                </NavItem>
                <SignOutButton>
                  <SignOutWithConfirmation menuPlacement="right" />
                </SignOutButton>
              </Fragment>
            </SideNav>

            <Component {...pageProps} />

            <BottomNav>
              <Fragment>
                <NavItem href="/" label="Home" currentRoute={router.route}>
                  <Home size="24" strokeWidth="1.5" />
                </NavItem>
                <NavItem
                  href="/profile"
                  label="Profile"
                  currentRoute={router.route}>
                  <User size="24" strokeWidth="1.5" />
                </NavItem>
                <NavItem
                  href="/notifications"
                  label="alerts"
                  currentRoute={router.route}>
                  <PlayCircle size="24" strokeWidth="1.5" />
                </NavItem>
                <SignOutButton>
                  <SignOutWithConfirmation menuPlacement="top-center" />
                </SignOutButton>
              </Fragment>
            </BottomNav>
          </AppLayout>
          <div id="checklist-portal" />
        </FirebaseContext>
      </Container>
    )
  }
}
