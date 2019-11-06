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
			return {
				...state,
				studentsList: action.res
			};
		
		default:
			return state;
	}
}