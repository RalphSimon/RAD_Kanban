export const Welcome = () => (
	<div className="welcome">
		<div>
			<h1>Welcome</h1>
			<p>
				Delete the <pre>&#60;Welcome /&#62;</pre> component to start rolling your own
			</p>
		</div>
		<style jsx global>{/* CSS */ `
			*,
			*::before,
			*::after {
				box-sizing: border-box;
			}

			body {
				margin: 0;
				font-family: 'Avenir', 'Helvetica Neue', sans-serif;
				font-weight: 300;
				color: #212529;
			}

			.welcome {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100vw;
				height: 100vh;
				text-align: center;
			}

			h1 {
				font-size: 3rem;
			}

			p {
				font-size: 1rem;
			}
		`}</style>
	</div>
)
