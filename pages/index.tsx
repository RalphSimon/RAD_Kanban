import { HelloWorld } from '../components/Hello'

export default () => (
  <div className="index">
    <HelloWorld label="Hello World" />

    <style jsx>{`
			.index {
				width: 100vw;
				height: 100vw;
			}
		`}</style>
  </div>
)
