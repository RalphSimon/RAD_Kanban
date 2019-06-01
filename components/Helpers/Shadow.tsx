interface Props {
  isVisible: number;
}

export const Shadow = ({ opacity }: Props) => {
  return (
    <div className="shadow" style={{ opacity }}>
      <style jsx>{`
				.shadow {
					z-index: -10;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background-color: var(--color-bg-panel);
					box-shadow: 0 4px 16px 0px rgba(0, 0, 0, 0.12);
					opacity: 0;
					transition: opacity 0.1s linear;
				}
			`}</style>
    </div>
  )
}
