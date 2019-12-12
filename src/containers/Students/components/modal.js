// @flow
import * as React from 'react';
import { Formik } from "formik";
import { Modal, TextField, Icon } from '@material-ui/core';
import { Rating  } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import * as uuid from 'uuid';
import { isNotUndefined } from '../../../utils/fns';

type Props = {
	isShowed: boolean,
	toggleModal: any => void,
	selectedStudent: Object | null,
	addNewStudent: (Object) => void,
	editStudent: (Object) => void
}

const useStyles = makeStyles(() => ({
		container: {
			display: 'flex',
			flexWrap: 'wrap'
		},
		textField: {
			marginLeft: "auto",
			marginRight: "auto",
			marginBottom: 20,
			width: '100%'
		}
	})
);

function SubmitStudentInfoModal(props: Props) {
	const {isShowed, toggleModal, addNewStudent, editStudent, selectedStudent = null} = props;
	
	const classes = useStyles();
	
	const validate = (values: Object): Object => {
		let errors: Object = {};
		
		if (isNotUndefined(values.name)) {
			if (values.name === "") {
				errors.name = "req"
			}
		}
		
		if (isNotUndefined(values.dateOfB)) {
			if (values.dateOfB === "") {
				errors.dateOfB = "req"
			}
		}
		return errors;
	};
	
	const submitInfo = (values: Object, actions: Object) => {
		let student: Object = {
			id: "",
			name: values.name,
			dateOfB: values.dateOfB,
			rating: values.rating
		};
		
		if (!selectedStudent) {
			student.id = uuid.v4();
			addNewStudent(student);
		}else {
			student.id = selectedStudent.id;
			editStudent(student);
		}
		
		actions.resetForm();
		return toggleModal();
	};
	
	return(
		<Modal
			aria-labelledby="simple-modal-title"
			aria-describedby="simple-modal-description"
			open={isShowed}
			onClose={() => toggleModal()}
		>
			<div className="submit-student-info-modal">
				<h4>{!selectedStudent ? "Добавить нового студента" : "Редактировать"}</h4>
				<span onClick={() => toggleModal()} className="btn--close-modal"><Icon>close_icon</Icon></span>
				
				<Formik
					initialValues={{
						name: !selectedStudent ? "" : selectedStudent.name,
						dateOfB: !selectedStudent ? "" : selectedStudent.dateOfB,
						rating: !selectedStudent ? 1 : selectedStudent.rating,
					}}
					validate={(values) => validate(values)}
					onSubmit={(values, actions) => submitInfo(values, actions)}
				>
					{form => (
						<form onSubmit={form.handleSubmit} className={classes.container} autoComplete="off">
							<fieldset>
								<TextField
									error={form.errors.name && true}
									id="standard-basic"
									className={classes.textField}
									label="Full name"
									margin="normal"
									name="name"
									defaultValue={form.values.name}
									onChange={(e) => {
										form.handleChange(e)
									}}
								/>
								<TextField
									id="date"
									error={form.errors.dateOfB && true}
									label="Date of birth"
									type="date"
									className={classes.textField}
									InputLabelProps={{
										shrink: true,
									}}
									onChange={(e) => {
										form.handleChange(e)
									}}
									name="dateOfB"
									defaultValue={form.values.dateOfB}
								/>
								
								<span className="simple-label">Rate student</span>
								<Rating
									aria-required="true"
									name="rating"
									value={form.values.rating}
									onChange={(_, val) => {
										form.setFieldValue('rating', val)
									}}
								/>
								
								<button className="btn btn--submit" type="submit">
									<Icon>{!selectedStudent ? "person_add" : "edit"}</Icon>
								</button>
							</fieldset>
						</form>
					)}
				</Formik>
			</div>
		</Modal>
	)
}

export default SubmitStudentInfoModal;