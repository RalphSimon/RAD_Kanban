import { forwardRef } from 'react'

export const MenuTrigger = forwardRef(({ children }, ref) => {
  return (
    <div className="trigger__root" ref={ref}>
      {children}
      <style jsx>{`
				.trigger__root {
					z-index: 2;
					width: auto;
					height: auto;
				}
			`}</style>
    </div>
  )
})
