// @flow
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from '@reach/router';
import {LayoutProvider} from '../components/LayoutProvider';
import routes from '../routes';
import {store} from '../redux/store';
import uuid from 'uuid';

function Root(){
	// here I added by default some data
	let studentsList: Array<Object> = [
		{
			id: uuid.v4(),
			name: "Henderson Daniel",
			dateOfB: '2000-11-05', // 5 November 2000
			rating: 3
		},
		{
			id: uuid.v4(),
			name: "Shaw Luis",
			dateOfB: '1999-05-05', // 5 May 1999
			rating: 5
		},
		{
			id: uuid.v4(),
			name: "Scott Marvin",
			dateOfB: '2000-09-11', // 11 August 2000
			rating: 2
		}
	];
	
	React.useEffect(() => {
		localStorage.setItem('studentsList', JSON.stringify(studentsList))
	},[studentsList]);
	
	return (
		<Provider store={store}>
			<LayoutProvider value={{title: "Loading..."}}>
				<Router>
					{routes.map((route, i) => (
						<route.component key={i} {...route}/>
					))}
				</Router>
			</LayoutProvider>
		</Provider>
	);
}

export default Root;
