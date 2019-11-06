//@flow
import * as React from 'react';
import Helmet from 'react-helmet';

type Props = {
	title: string,
	classNameLayout: string,
	children: React.Node
}

class Layout extends React.Component<Props>{
	render() {
		const { title, classNameLayout, children } = this.props;
		return (
			<React.Fragment>
				<Helmet>
					<title>{title}</title>
				</Helmet>
				
				<main role="main" className={`portfolio ${classNameLayout}`}>
					{children}
				</main>
			</React.Fragment>
		);
	}
}

export default Layout;