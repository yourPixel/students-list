import {ACTION_TYPE} from '../utils/const';

/////////////////ACTIONS CRUD (students list) //////////////
const getAll = (res) => ({type: ACTION_TYPE.GET_ALL_STUDENTS, res});
const add = (res) => ({type: ACTION_TYPE.ADD_STUDENT, res});
const remove = (id) => ({type: ACTION_TYPE.DELETE_STUDENT, id});
const edit = (res) => ({type: ACTION_TYPE.EDIT_STUDENT, res});


/////////////// ACTION DISPATCHER FUNCTIONS///////////////////

export const getAllStudents = () => dispatch => {
	const storedList = localStorage.getItem("studentsList");
	let list: Array<Object> = JSON.parse(storedList);
	dispatch(getAll(list))
};

export const addStudent = (value: Object) => dispatch => {
	const storedList = localStorage.getItem("studentsList");
	let lStorage: Array<Object> | null = storedList ? JSON.parse(storedList) : [];
	let newStudent: Object =
		Object.assign({}, {
			id: value.id,
			name: value.name,
			dateOfB: value.dateOfB,
			rating: value.rating,
		});
	lStorage.push(newStudent);
	localStorage.setItem('studentsList', JSON.stringify(lStorage));
	dispatch(add(newStudent))
};

export const deleteStudent = (id: any) => dispatch => {
	const storedList = localStorage.getItem("studentsList");
	let lStorage: Array<Object> | null = storedList ? JSON.parse(storedList) : [];
	localStorage.setItem("studentsList", JSON.stringify(lStorage.filter(item => item.id !== id)));
	dispatch(remove(id))
};

export const editStudent = (value: Object) => dispatch => {
	const storedList = localStorage.getItem("studentsList");
	let lStorage: Array<Object> | null = storedList ? JSON.parse(storedList) : [];
	if (lStorage.length > 0){
		let student: Object | null = lStorage.find(item => item.id === value.id);
		Object.entries(student).map(([k,_]) => student[k] = value[k]);
		localStorage.setItem("studentsList", JSON.stringify(lStorage));
	}
	dispatch(edit(lStorage))
};
