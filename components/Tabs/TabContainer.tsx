import { useReducer, useState, createContext } from 'react'

export const TabsContext = createContext(null)

interface TabState {
  activeTab: number | string;
  prevTab: number | string;
  translation: number | string;
  activeWidth: number | string;
  tabWidths: number[];
}

interface Action {
  type: string;
  payload: number | string | number[];
}

const reducer = (state: TabState, action: Action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TAB': {
      return {
        ...state,
        activeTab: action.payload,
        prevTab: state.activeTab,
        activeWidth: state.tabWidths[action.payload],
        translation: state.list[action.payload]
      }
    }
    case 'SET_TAB_WIDTHS': {
      const l = Array.from(action.payload).reduce(
        (acc, curr, i) => {
          const l = [...acc, acc[i] + curr]
          return l
        },
        [0]
      )

      return {
        ...state,
        tabWidths: action.payload,
        activeWidth: action.payload[state.activeTab],
        list: l
      }
    }
    default:
      return state
  }
}

export const TabContainer = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    activeTab: 0,
    prevTab: 1,
    translation: 0,
    activeWidth: 0,
    tabWidths: []
  })

  return (
    <section>
      <TabsContext.Provider value={[state, dispatch]}>
        {children}
      </TabsContext.Provider>

      <style jsx>{`
				section {
					display: flex;
					flex-direction: column;
					width: 100%;
					height: 100%;
					overflow: hidden;
				}
			`}</style>
    </section>
  )
}
