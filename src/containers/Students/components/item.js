// @flow
import * as React from 'react';
import {Icon} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import moment from 'moment';
import { ClickOutside } from '../../../components/tools';

type StudentProps = {
	student: Object,
}
function Item({ student, ...rest }: StudentProps){
	return(
		<div className="student-item">
			<span className={`icon`}>
				<Icon>person</Icon>
	        </span>
			<div className="details">
				{student ? (
					<React.Fragment>
						<h4>{student.name}</h4>
						<span className="dateOfB">{moment(student.dateOfB).format('DD MMM YYYY')}</span>
						<span className="rate">
							<Rating name={student.id} value={student.rating} size="small" disabled/>
						</span>
					</React.Fragment>
				) : null}
			</div>
			
			<Settings {...rest}/>
		</div>
	)
}

type SettingsProps = {
	setToEdit: any => void,
	toggleModal: any => void,
	deleteStudent: any => void
}
function Settings({setToEdit, toggleModal, deleteStudent}: SettingsProps) {
	const [opened, openSettings] = React.useState(false);
	
	const onClickedOutside = () => {
		if (opened) {
			return openSettings(false);
		}
	};
	return (
		<ClickOutside clickedOutside={onClickedOutside}>
			{({innerRef}) => (
				<div ref={innerRef} className={`settings ${opened ? 'active' : ''}`}>
					<div className="settings-tools">
						<span className="edit" onClick={(e) => {
							e.preventDefault();
							setToEdit();
							toggleModal()
						}}>
							<Icon>edit</Icon>
						</span>
						<span
							className="delete"
							onClick={() => {
								deleteStudent();
							}}
						>
							<Icon>delete</Icon>
						</span>
					</div>
					
					<span
						className="dots"
						onClick={() => {
							openSettings(true)
						}}
					>
						<span className="dot"/>
					</span>
				</div>
			)}
		</ClickOutside>
	)
}

export default Item