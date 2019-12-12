//@flow
import * as React from 'react';
import Helmet from 'react-helmet';
import { LayoutContext } from './';

type Props = {
	children: React.Node,
}

function Layout(props: Props) {
	const state = React.useContext(LayoutContext);
	const {title, classNameLayout} = state;
	
	return(
		<React.Fragment>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			
			{/* Header */}
			
			<main role="main" className={`${classNameLayout}`}>
				{props.children}
			</main>
			
			{/* Footer */}
		
		</React.Fragment>
	)
}

export {Layout}