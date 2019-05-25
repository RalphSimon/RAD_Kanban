import { Check } from 'styled-icons/feather'

export const Complete = () => (
  <div className="kb-item__check">
    <Check size="18" strokeWidth="1.5" />
    <style jsx>{`
			.kb-item__check {
				z-index: 999;
				position: absolute;
				right: 0;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 24px;
				height: 24px;
				border-radius: 100%;
				background-color: var(--color-success);
				color: var(--color-text-white);
				transform: translate(24px, -24px);
			}
		`}</style>
  </div>
)
