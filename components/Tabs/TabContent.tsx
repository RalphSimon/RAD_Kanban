import { useContext, Fragment, useMemo } from 'react'
import posed, { PoseGroup } from 'react-pose'

import { TabsContext } from './TabContainer'

/*
  My own experiment being helpful:
  https://codesandbox.io/s/o54xjwxyx9
*/
const fromLeft = (previous, current) => previous > current
const transition = { duration: 500, ease: [0.4, 0, 0.2, 1] }
const TabTransition = posed.div({
  enter: {
    x: '0%',
    transition
  },
  preEnter: {
    x: ({ prev, current }) => (fromLeft(prev, current) ? '-100%' : '100%'),
    transition
  },
  exit: {
    x: ({ prev, current }) => (fromLeft(prev, current) ? '100%' : '-100%'),
    transition
  }
})

export const TabContent = ({ children }) => {
  const [state] = useContext(TabsContext)

  return (
    <div className="content-root">
      <PoseGroup
        preEnterPose="preEnter"
        prev={state.prevTab}
        current={state.activeTab}>
        <TabTransition key={state.activeTab} className="tabbed-content">
          {children[state.activeTab]}
        </TabTransition>
      </PoseGroup>
      <style jsx global>{`
				.content-root {
					width: 100%;
					height: 100%;
					overflow: hidden;
					position: relative;
				}
				.tabbed-content {
					flex: 1;
					width: 100%;
					height: 100%;
				}
			`}</style>
    </div>
  )
}
