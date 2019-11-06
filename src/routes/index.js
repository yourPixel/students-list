import React from 'react';
import Loadable from 'react-loadable';

const load = (getComp) => Loadable({
	loader: () => getComp(),
	loading: () => <div>Loading...</div>
});

const routes = [
	{
		path: '/',
		component: load(() => import('../containers/Students'))
	}
];

export default routes;