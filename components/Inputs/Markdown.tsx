import { Fragment } from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  source: string[] | string;
  height: number | string;
}

export const Markdown = ({ source, height }) => (
  <Fragment>
    <ReactMarkdown source={source} className="markdown__output" />

    <style jsx global>{`
			.markdown__output {
				height: ${height ? height + 'px' : 'auto'};
				overflow: hidden;
			}

			.markdown__output,
			.markdown__output h1,
			.markdown__output h2,
			.markdown__output h3,
			.markdown__output p {
				text-overflow: ellipsis;
				overflow: ${height ? 'hidden' : 'auto'};
				 {
					/* white-space: nowrap; */
				}
			}
		`}</style>

    <style jsx global>{`
			.markdown__output h1 {
				font-size: 32px;
				font-weight: 400;
				line-height: 1.2416666666666667;
				letter-spacing: -0.6px;
				margin-bottom: 16px;
			}

			.markdown__output h2 {
				font-size: 28px;
				font-weight: 600;
				line-height: 1;
			}

			.markdown__output h3 {
				font-size: 20px;
				font-weight: 400;
				line-height: 1.2142857142857142;
			}

			.markdown__output p {
				font-size: 15px;
				font-weight: 400;
				line-height: 1.5333333333333334;
			}
		`}</style>
  </Fragment>
)
