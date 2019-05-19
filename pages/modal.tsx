import { X } from 'styled-icons/feather'

import { AppCanvas } from '../components/Layout'
import { Button } from '../components/Buttons'
import { Menu, MenuTrigger, MenuList } from '../components/Menu'

const MyOptions = ({ children }) => {
  return (
    <div className="menu">
      {children}
      <style jsx>{`
				.menu {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 250px;
					height: 250px;
					padding: 16px;
					background-color: rgba(255, 255, 255, 1);
					box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
				}
			`}</style>
    </div>
  )
}

const ModalPage = () => {
  return (
    <AppCanvas>
      <section className="canvas">
        <h1 className="text-preset-1">Testing components here...</h1>
      </section>
      <style jsx>{`
				.canvas {
					display: flex;
					flex-wrap: nowrap;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					height: 100%;
					padding: 16px;
				}

				.row {
					display: flex;
					justify-content: space-between;
					width: 100%;
				}

				.row-center {
					display: flex;
					width: 100%;
					justify-content: center;
				}
			`}</style>
    </AppCanvas>
  )
}

export default ModalPage
