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
	return dispatch(getAll(list))
};

export const addStudent = (value: Object) => dispatch => {
	let storedList = getStoredList();
	let newStudent: Object =
		Object.assign({}, {
			id: value.id,
			name: value.name,
			dateOfB: value.dateOfB,
			rating: value.rating,
		});
	storedList.push(newStudent);
	storeList(storedList);
	return dispatch(add(newStudent))
};

export const deleteStudent = (id: any) => dispatch => {
	let storedList = getStoredList();
	storeList(storedList.filter(item => item.id !== id));
	return dispatch(remove(id))
};

export const editStudent = (value: Object) => dispatch => {
	let storedList = getStoredList();
	if (storedList.length > 0){
		let student: Object | null = storedList.find(item => item.id === value.id);
		Object.entries(student).map(([k,_]) => student[k] = value[k]);
		storeList(storedList)
	}
	return dispatch(edit(value))
};

function getStoredList () {
	const storedList = localStorage.getItem("studentsList");
	let lStorage: Array<Object> | null = storedList ? JSON.parse(storedList) : [];
	return lStorage;
}

function storeList (value: any) {
	return localStorage.setItem("studentsList", JSON.stringify(value));
}
