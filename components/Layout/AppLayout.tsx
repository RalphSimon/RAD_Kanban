export const AppLayout = ({ children }) => {
  return (
    <div className="app-layout">
      {children}
      <style jsx global>{`
				@import url('https://fonts.googleapis.com/css?family=Barlow:400,400i,600,800');

				:root {
					--color-gray-base: #aeb2c0;
					--color-indigo-base: #2e5bff;
					--color-indigo2-base: #692eff;
					--color-fuchsia-base: #d22eff;
					--color-fuchsia2-base: #ff2ec4;
					--color-red-base: #ff2e5b;
					--color-red2-base: #ff692e;
					--color-yellow-base: #ffd22e;
					--color-yellow2-base: #c4ff2e;
					--color-green-base: #5bff2e;
					--color-green2-base: #2eff69;
					--color-teal-base: #29e7be;
					--color-cyan-base: #2ec4ff;
					--color-gray-light: #f8f9fa;
					--color-indigo-light: #e9eeff;
					--color-indigo2-light: #f0ebff;
					--color-fuchsia-light: #faebff;
					--color-fuchsia2-light: #ffebf9;
					--color-red-light: #ffebef;
					--color-red2-light: #ffeee8;
					--color-yellow-light: #fff9e3;
					--color-yellow2-light: #f8ffe6;
					--color-green-light: #eeffe9;
					--color-green2-light: #ebfff0;
					--color-teal-light: #eafffa;
					--color-cyan-light: #e6f8ff;
					--color-gray-dark: #3c3f48;
					--color-indigo-dark: #2447c8;
					--color-indigo2-dark: #5224c8;
					--color-fuchsia-dark: #a624ca;
					--color-fuchsia2-dark: #ca249b;
					--color-red-dark: #ca2448;
					--color-red2-dark: #ca5324;
					--color-yellow-dark: #cba724;
					--color-yellow2-dark: #9ccb24;
					--color-green-dark: #48cb24;
					--color-green2-dark: #24cb53;
					--color-teal-dark: #24cba7;
					--color-cyan-dark: #249bca;

					--icon-btn-size-base: 48px;
					--icon-btn-size-small: 32px;

					--color-brand: var(--color-indigo-base);
					--color-focus: var(--color-indigo-base);
					--color-warning: var(--color-red2-base);
					--color-error: var(--color-red-base);
					--color-success: var(--color-teal-base);
					--color-text-base: #2e384d;
					--color-text-gray: #676b7b;
					--color-text-light: #9a9fb1;
					--color-text-white: #fff;
					--color-divider: #e4e8f0;
					--color-bg-app-default: #f4f6fc;
					--color-bg-panel: #fff;
					--color-bg-canvas: var(--color-gray-light);
					--color-bg-button-default: var(--color-indigo-base);
					--radius-default: 5px;
					--font-Barlow: 'Barlow', sans-serif;
					--easing-default: cubic-bezier(0.4, 0, 0.2, 1);
				}

				*,
				*::before,
				*::after {
					box-sizing: border-box;
				}

				body {
					margin: 0;
					padding: 0;
					font-family: var(--font-Barlow);
					font-weight: 400;
					color: var(--color-text-base);
					background-color: var(--color-bg-canvas);
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}

				code {
					font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
						monospace;
				}

				h1,
				h2,
				h3,
				h4,
				h5 {
					margin: 0;
				}

				hr {
					border-top: none;
					border-right: none;
					border-left: none;
					border-bottom: 1px solid var(--color-text-gray);
				}

				.text-preset-1 {
					font-size: 32px;
					font-weight: 400;
					line-height: 1.2416666666666667;
					letter-spacing: -0.6px;
					margin-bottom: 16px;
				}

				.text-preset-2 {
					font-size: 28px;
					font-weight: 600;
					line-height: 1;
				}

				.text-preset-3 {
					font-size: 20px;
					font-weight: 400;
					line-height: 1.2142857142857142;
				}

				.text-preset-4 {
					font-size: 18px;
					font-weight: 800;
					line-height: 1.4;
					text-transform: capitalize;
				}

				.text-preset-4--weight-light {
					font-weight: 400;
					color: var(--color-text-light);
				}

				.text-preset-5,
				.text-preset-5--light {
					font-size: 13px;
					font-weight: 600;
					line-height: 1.5384615384615385;
					text-decoration: uppercase;
					letter-spacing: 1.21px;
					text-transform: uppercase;
				}

				.text-preset-5--light {
					color: var(--color-text-light);
				}

				.text-preset-6,
				.text-preset-7 {
					margin: 0;
				}

				.text-preset-6 {
					font-size: 15px;
					font-weight: 400;
					line-height: 1.5333333333333334;
				}

				.text-preset-7 {
					font-size: 11px;
					font-weight: 400;
					font-style: italic;
					line-height: 1.7692307692307692;
					letter-spacing: 1.13px;
					color: var(--color-text-light);
				}

				.app-layout {
					width: 100vw;
					height: 100vh;
					display: grid;
					grid-template-columns: repeat(
						4,
						[col-start] minmax(max-content, 1fr)
					);
					grid-template-rows: repeat(4, [canvas] 1fr) [bottom-nav] 64px;
				}

				@media (min-width: 480px) {
					.text-preset-1 {
						font-size: 48px;
						margin-bottom: 24px;
					}

					.text-preset-2 {
						font-size: 34px;
					}

					.text-preset-3 {
						font-size: 28px;
					}

					.app-layout {
						grid-template-rows: repeat(8, [row-start] 1fr);
						grid-template-columns: [nav-start] 64px repeat(
								7,
								[col-start] minmax(max-content, 1fr)
							);
					}
				}
			`}</style>
    </div>
  )
}
