import { useContext } from 'rect'

import { AppCanvas } from '../components/Layout'
import { useFirestore, FirebaseContext } from '../firebase'

const ModalPage = () => {
  // const db = useContext(FirebaseContext)

  const { state: task, isLoading } = useFirestore('TASKS/8PbGSfUfGPea6CqD3qFc')

  return (
    <AppCanvas>
      <section className="canvas">
        <header>
          <h1 className="text-preset-1">Testing components here...</h1>
          <h2>{isLoading ? 'Loading' : task.title}</h2>
        </header>
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
