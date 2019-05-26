import App, { Container } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { Home, LogIn, Trello } from 'styled-icons/feather'
import { PoseGroup } from 'react-pose'
// import { resetServerContext } from 'react-beautiful-dnd'

import { AuthPageTransitions } from '../components/Auth'
import { AppLayout, BottomNav, NavItem, SideNav } from '../components/Layout'
import { loadDB, FirebaseContext } from '../firebase'

const { db } = loadDB()
const routes = ['/', '/sign-up', '/login']
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

  state = {
    prevRoute: routes.indexOf(this.props.router.route),
    currentRoute: routes.indexOf(this.props.router.route)
  }

  componentDidMount() {
    Router.events.on('routeChangeComplete', this.handleRouteChange)
  }

  componentWillUnmount() {
    Router.events.off('routeChangeComplete', this.handleRouteChange)
  }

  handleRouteChange = url => {
    const page = url.split('?')[0]
    this.setState(state => ({
      currentRoute: routes.indexOf(page) || 0,
      prevRoute: state.currentRoute
    }))
  }

  render() {
    const { Component, pageProps } = this.props
    const { currentRoute, prevRoute } = this.state
    console.log({
      currentRoute,
      prevRoute
    })
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
          <PoseGroup
            preEnterPose="preEnter"
            prev={prevRoute}
            current={currentRoute}
            animateOnMount={true}>
            <AuthPageTransitions
              key={currentRoute}
              className="page__transitions">
              <Component {...pageProps} />
            </AuthPageTransitions>
          </PoseGroup>
        </AppLayout>

        {/* <AppLayout>
          <SideNav>
            <NavItem href="/" label="Home">
              <Home size="24" strokeWidth="1.5" />
            </NavItem>
            <NavItem href="/modal" label="Modal">
              <Trello size="24" strokeWidth="1.5" />
            </NavItem>
            <NavItem href="/auth" label="auth">
              <LogIn size="24" strokeWidth="1.5" />
            </NavItem>
          </SideNav>

          <FirebaseContext.Provider value={db}>
            <Component {...pageProps} />
          </FirebaseContext.Provider>

          <BottomNav>
            <NavItem href="/" label="Home">
              <Home size="24" strokeWidth="1.5" />
            </NavItem>
            <NavItem href="/modal" label="Modal">
              <Trello size="24" strokeWidth="1.5" />
            </NavItem>
            <NavItem href="/auth" label="auth">
              <LogIn size="24" strokeWidth="1.5" />
            </NavItem>
          </BottomNav>
        </AppLayout> */}
      </Container>
    )
  }
}
