import { useEffect, useRef, useMemo, useContext, useState } from 'react'

import { Tab } from './Tab'
import { TabsContext } from './TabContainer'
import { TabMarker } from './TabMarker'

export const Tabs = ({ children }) => {
  const navRef = useRef(null)
  const [state, dispatch] = useContext(TabsContext)

  const tabs = useMemo(
    () =>
      children.map((child, index) => {
        return (
          <Tab
            key={index}
            active={index === state.activeTab}
            onClick={() => {
              dispatch({
                type: 'SET_ACTIVE_TAB',
                payload: index
              })
            }}>
            {child.props.children}
          </Tab>
        )
      }),
    [children, state, dispatch]
  )

  useEffect(() => {
    const nav = navRef.current
    const tabWidths = Array.from(nav.children)
      .filter(child => child.tagName === 'BUTTON')
      .map(child => child.clientWidth)

    dispatch({ type: 'SET_TAB_WIDTHS', payload: tabWidths })
  }, [dispatch])

  return (
    <div className="rail">
      <nav className="nav" ref={navRef}>
        {tabs}
      </nav>

      <TabMarker translation={state.translation} width={state.activeWidth} />

      <style jsx>{`
				.rail {
					overflow: hidden;
					border-bottom: 1px solid var(--color-divider);
				}
				.nav {
					display: inline-flex;
				}
			`}</style>
    </div>
  )
}
