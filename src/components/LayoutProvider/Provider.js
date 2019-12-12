//@flow
import * as React from 'react';
import {LayoutContext} from "./";
import { Layout } from './';

type Props = {
	children: React.Node,
	value: Object
}

function LayoutProvider(props: Props){
	const [state, setState] = React.useState(props.value);
	
	const contextProps = {
		...state,
		setState
	};
	
	return (
		<LayoutContext.Provider value={contextProps}>
			<Layout>
				{props.children}
			</Layout>
		</LayoutContext.Provider>
	);
}

export {LayoutProvider};