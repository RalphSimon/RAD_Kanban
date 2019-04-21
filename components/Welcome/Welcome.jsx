export const Welcome = ({ children }) => (
	<div className="welcome">
		<div>
			<h1>Welcome</h1>
			<p>
				Delete the <pre>&#60;Welcome /&#62;</pre> component to start rolling your own
			</p>
		</div>

		<div className="welcome-switch">{children}</div>
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

			.welcome,
			.welcome-switch {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				text-align: center;
			}

			.welcome {
				width: 100vw;
				height: 100vh;
			}

			.welcome-switch {
				width: 50%;
				border-top: 1px solid #212529;
				padding-top: 24px;
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