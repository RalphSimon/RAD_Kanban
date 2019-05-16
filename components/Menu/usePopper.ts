import React, { useEffect, useLayoutEffect, useRef } from 'react'
import Popper from 'popper.js'

/*
  Popper.js docs
  https://github.com/FezVrasta/popper.js/blob/master/docs/_includes/popper-documentation.md#Popper.placements

  Reakit - PopoverState
  https://github.com/reakit/reakit/blob/master/packages/reakit/src/Popover/PopoverState.ts
*/

export const usePopper = (initialState = defaultState, isVisible) => {
  const {
    defaultPlacement,
    flip,
    shift,
    gutter,
    preventOverflow,
    boundariesElement,
    fixed
  } = initialState

  const popper = useRef<Popper | null>(null)
  const referenceRef = useRef<HTMLElement>(null)
  const popoverRef = useRef<HTMLElement>(null)
  const arrowRef = useRef<HTMLElement>(null)

  const [originalPlacement, place] = React.useState(defaultPlacement)
  const [placement, setPlacement] = React.useState(defaultPlacement)
  const [popoverStyles, setPopoverStyles] = React.useState<
  Partial<CSSStyleDeclaration>
  >({})
  const [arrowStyles, setArrowStyles] = React.useState<
  Partial<CSSStyleDeclaration>
  >({})

  useEffect(() => {
    if (referenceRef.current && popoverRef.current) {
      // create Popover instance
      popper.current = new Popper(referenceRef.current, popoverRef.current, {
        placement: originalPlacement,
        eventsEnabled: false,
        positionFixed: fixed,

        modifiers: {
          applyStyle: { enabled: false },
          flip: { enabled: flip, padding: 16 },
          shift: { enabled: shift },
          offset: { enabled: shift, offset: `0, ${gutter}` },
          preventOverflow: { enabled: preventOverflow, boundariesElement },
          arrow: arrowRef.current
            ? { enabled: true, element: arrowRef.current }
            : undefined,
          updateStateModifier: {
            order: 900,
            // TODO: https://github.com/facebook/react/pull/14853
            enabled: process.env.NODE_ENV !== 'test',
            fn: data => {
              setPlacement(data.placement)
              setPopoverStyles(data.styles)
              setArrowStyles(data.arrowStyles)
              return data
            }
          }
        }
      })
    }

    return () => {
      const { current } = popper
      if (current) {
        current.destroy()
      }
    }
  }, [
    originalPlacement,
    boundariesElement,
    fixed,
    flip,
    shift,
    gutter,
    preventOverflow
  ])

  useEffect(() => {
    const { current } = popper
    if (!current) return
    if (isVisible) {
      current.enableEventListeners()
    } else {
      current.disableEventListeners()
    }
    current.update()
  }, [isVisible])

  return {
    referenceRef,
    popoverRef,
    arrowRef,
    popoverStyles,
    arrowStyles,
    originalPlacement,
    placement,
    place
  }
}
