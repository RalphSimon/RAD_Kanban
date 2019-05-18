import fetch from 'node-fetch'

import { AppCanvas } from '../components/Layout'
import { Header } from '../components/Home'
import { DateDisplay, TimeDisplay } from '../components/Helpers'

const Home = () => {
  const date = Date.now()

  return (
    <AppCanvas>
      <Header>
        <TimeDisplay date={date} />
        <DateDisplay
          date={date}
          options={{
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          }}
        />
      </Header>
    </AppCanvas>
  )
}

Home.getInitialProps = async () => {}

export default Home
