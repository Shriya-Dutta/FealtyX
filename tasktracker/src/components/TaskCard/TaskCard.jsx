import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './TaskCardStyles.css';
import CreateEditModal from '../Modal/TaskModal/TaskModal';
import DeleteModal from '../Modal/DeleteModal/DeleteModal';
import Button from '../Button/Button';
import { FaExclamationTriangle } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaHourglassHalf } from "react-icons/fa";
import { FaTasks } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const TaskCard = (props) => {

    const role = useSelector((state) => state.auth.user?.role);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState('');
    const [taskToView, setTaskToView] = useState('');
    const [taskToDelete, setTaskToDelete] = useState('');
    const [taskToApprove, setTaskToApprove] = useState('');

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

    const handleApproveTask = (e) => {
        const taskId = e.target.closest('.TaskCard').id;
        setTaskToApprove(taskId);
        setIsModalOpen(true);
    };

    const task = props.task;

    return (
        <>
            <div id={task.id} className="TaskCard">
                <div id="task-header" className='taskHeader'>
                    <h3>{task.title}</h3>
                    {role === 'Developer' ? (
                        <div id='icons' className='Icons'>
                            <FaPencilAlt
                                id="edit-icon"
                                className='editIcon'
                                onClick={task.status === 'Closed' ? undefined : handleEditTask}
                                style={{
                                    color: task.status === 'Closed' ? '#bebebe' : 'black',
                                    cursor: task.status === 'Closed' ? 'not-allowed' : 'pointer',
                                }}
                            />
                            <FaTrashAlt
                                id="delete-icon"
                                className='deleteIcon'
                                onClick={handleDeleteTask}
                                style={{ color: 'red' }}
                            />
                        </div>
                    ) : null}
                </div>

                <div id='task-body' className='taskBody' onClick={handleViewTask}>
                    {task.priority === 'High' ? (
                        <div id='high-priority' className='priority' style={{ color: 'red' }}>
                            <FaExclamationTriangle color="red" size="20px" />
                            <b>High</b>
                        </div>
                    ) : (
                        task.priority === 'Moderate' ? (
                            <div id='moderate-priority' className='priority' style={{ color: 'orange' }}>
                                <FaExclamationTriangle color="orange" size="20px" />
                                <b>Moderate</b>
                            </div>
                        ) : (
                            task.priority === 'Low' ? (
                                <div id='low-priority' className='priority' style={{ color: 'green' }}>
                                    <FaExclamationTriangle color="green" size="20px" />
                                    <b>Low</b>
                                </div>
                            ) : null
                        )
                    )}
                    {/* <p>Assigned To: {task.assignedTo}</p>
                    <p>Assigned By: {task.assignedBy}</p> */}

                    <div id='task-assign' className='taskAssignment'>
                        <div id="assigned-to" className='assign'>
                            <b>Assigned To:</b>
                            <p>{task.assignedTo}</p>
                        </div>
                        <div id="assigned-by" className='assign'>
                            <b>Assigned By:</b>
                            <p>{task.assignedBy}</p>
                        </div>
                    </div>
                </div>

                <div id='task-footer' className='taskFooter' style={{ justifyContent: (role === 'Manager' && task.status === 'Pending Approval') ? 'space-between' : 'flex-end' }}>

                    {role === 'Manager' && task.status === 'Pending Approval' ? (
                        <Button
                            id='approve-btn'
                            className='approveBtn'
                            value='Approve / Reject'
                            onClick={handleApproveTask}
                        />
                    ) : null}

                    {task.status === 'Open' ? (
                        <Button
                            id='status-open'
                            className='statusOpen'
                            value=''
                            icon={<FaTasks />}
                            iconStyle={{ color: "white", width: "16px", height: "16px" }}
                        />
                    ) : (
                        task.status === 'Closed' ? (
                            <Button
                                id='status-closed'
                                className='statusClosed'
                                value=''
                                icon={<FaCheckCircle />}
                                iconStyle={{ color: "white", width: "16px", height: "16px" }}
                            />
                        ) : (
                            <Button
                                id='status-pending'
                                className='statuspending'
                                value=''
                                icon={<FaHourglassHalf />}
                                iconStyle={{ color: "white", width: "16px", height: "16px" }}
                            />
                        )
                    )}
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
                        <CreateEditModal
                            onClose={handleCloseModal}
                            text="Task Details"
                            taskID={taskToView}
                        />
                    ) : (
                        taskToApprove ? (
                            <CreateEditModal
                                onClose={handleCloseModal}
                                text="Approve Task"
                                taskID={taskToApprove}
                            />
                        ) : (
                            taskToDelete ? (
                                <DeleteModal
                                    onClose={handleCloseModal}
                                    taskID={taskToDelete}
                                />
                            ) : null
                        ))
                )) : null}
        </>
    )
};

export default TaskCard;