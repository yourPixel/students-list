// @flow
import * as React from 'react';
import { Icon } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import Layout from '../../components/Layout';
import { connect } from 'react-redux';
import { Data } from '../../components/tools';
import * as Actions from '../../actions';
import Item from './components/item';
import SubmitStudentInfoModal from './components/modal';

type Props = {
	dispatch: (any) => void,
	studentsList: Array<Object>
}
function Students(props: Props) {
	const { studentsList, dispatch } = props;
	const [isShowed, toggleModal] = React.useState(false);
	const [selectedStudent, setToEdit] = React.useState(null);
	const actions = bindActionCreators(Actions, dispatch);
	
	React.useEffect(() => {
		dispatch(Actions.getAllStudents())
	}, [dispatch]);
	
	return (
		<Layout title="STUDENTS | LIST" classNameLayout="">
			<section className="students-section">
				<SubmitStudentInfoModal
					isShowed={isShowed}
					toggleModal={() => {
						toggleModal(false);
						//clear object of selected student
						setToEdit(null)
					}}
					selectedStudent={selectedStudent}
					addNewStudent={(value) => actions.addStudent(value)}
					editStudent={(value) => actions.editStudent(value)}
				/>
				
				<div className="container">
					<div className="students-list">
						{(studentsList && studentsList.length > 0) ? (
							<Data data={studentsList}>
								{({ item, index }) => (
									<Item key={index}
									      student={item}
									      setToEdit={() => setToEdit(item)}
									      toggleModal={() => toggleModal(true)}
									      deleteStudent={() => actions.deleteStudent(item.id)}
									/>
								)}
							</Data>
						) : null}
					</div>
					
					<button type="button" className="btn btn--create-student" onClick={(e) => {
						e.preventDefault();
						toggleModal(true)
					}}>
						<Icon>person_add</Icon>
					</button>
				</div>
			</section>
		</Layout>
	);
}

const mapState = (state) => ({
	studentsList: state.studentsList
});

export default connect(mapState)(Students);