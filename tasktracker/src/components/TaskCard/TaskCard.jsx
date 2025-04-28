import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './TaskCardStyles.css';
import DeleteIcon from '../../utils/assets/DeleteIcon.png';
import EditIcon from '../../utils/assets/EditIcon.svg';
import CreateEditModal from '../Modal/CreateEditModal/CreateEditModal';
import ViewModal from '../Modal/ViewModal/ViewModal';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';
import Button from '../Button/Button';

const TaskCard = (props) => {

    const role = useSelector((state) => state.auth.user?.role);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState('');
    const [taskToView, setTaskToView] = useState('');
    const [taskToDelete, setTaskToDelete] = useState('');

    const handleDeleteTask = (e) => {
        const taskID = e.target.closest('.TaskCard').id;
        setTaskToDelete(taskID);
        setIsModalOpen(true);
    };

    const handleEditTask = (e) => {
        const taskId = e.target.closest('.TaskCard').id;
        setTaskToEdit(taskId);
        setIsModalOpen(true);

    };

    const handleCloseModal = () => {
        setTaskToEdit('');
        setTaskToView('');
        setTaskToDelete('');
        setIsModalOpen(false);
    };

    const handleViewTask = (e) => {
        const taskId = e.target.closest('.TaskCard').id;
        setTaskToView(taskId);
        setIsModalOpen(true);
    }

    const task = props.task;

    return (
        <>
            <div id={task.id} className="TaskCard">
                <div id="task-header" className='taskHeader'>
                    <h3>{task.title}</h3>
                    {role === 'Developer' ? (
                        <div id='icons' className='Icons'>
                            <img
                                id="edit-icon"
                                className='editIcon'
                                src={EditIcon}
                                alt="Edit"
                                onClick={handleEditTask}
                            />
                            <img
                                id="delete-icon"
                                className='deleteIcon'
                                src={DeleteIcon}
                                alt="Delete"
                                onClick={handleDeleteTask}
                            />
                        </div>
                    ) : null}
                </div>

                <div id='task-body' className='taskBody' onClick={handleViewTask}>
                    <p
                        style={{
                            color: task.priority === 'High' ? 'red' :
                                task.priority === 'Moderate' ? 'yellow' :
                                    task.priority === 'Low' ? 'green' : 'black',
                        }}
                    >
                        Priority: {task.priority}
                    </p>
                    <p>Status: {task.status}</p>
                    <p>Assignee: {task.assignee}</p>
                </div>

                <div id='task-footer' className='taskFooter'>
                    {role === 'Manager' && task.status === 'Pending Approval' ? (
                        <Button
                            id='approve-btn'
                            className='approveBtn'
                            value='Approve / Reject'
                            onClick={handleViewTask}
                        />
                    ) : null}
                </div>

            </div>
            {isModalOpen ? (
                taskToEdit ? (
                    <CreateEditModal
                        onClose={handleCloseModal}
                        text="Update Task"
                        taskID={taskToEdit}
                    />
                ) : (
                    taskToView ? (
                        <ViewModal
                            onClose={handleCloseModal}
                            taskID={taskToView}
                        />
                    ) : (
                        taskToDelete ? (
                            <DeleteModal
                                onClose={handleCloseModal}
                                taskID={taskToDelete}
                            />
                        ) : null
                    ))
            ) : null}
        </>
    )
};

export default TaskCard;