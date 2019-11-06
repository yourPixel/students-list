//@flow
import { ACTION_TYPE } from '../../utils/const';

const initialState = {
	studentsList: []
};

export default function students(state: Object = initialState, action: Object) {
	switch (action.type) {
		case ACTION_TYPE.GET_ALL_STUDENTS:
			return {
				...state,
				studentsList: action.res,
			};
		case ACTION_TYPE.ADD_STUDENT:
			return {
				...state,
				studentsList: [
					...state.studentsList,
					action.res
				],
			};
		
		case ACTION_TYPE.DELETE_STUDENT:
			return {
				...state,
				studentsList: state.studentsList.filter(item => item.id !== action.id)
			};
		
		case ACTION_TYPE.EDIT_STUDENT:
			let student: Object | null = state.studentsList.find(item => item.id === action.res.id);
			Object.entries(student).map(([k,_]) => student[k] = action.res[k]);
			return {
				...state,
				studentsList: [
					...state.studentsList
				]
			};
		
		default:
			return state;
	}
}