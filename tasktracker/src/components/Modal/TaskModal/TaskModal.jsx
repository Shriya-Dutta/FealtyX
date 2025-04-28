import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../../../redux/slices/taskSlice";
import "./TaskModalStyles.css";
import Button from "../../Button/Button";
import { FaTimes } from "react-icons/fa";

const CreateEditModal = (props) => {

    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.tasks);
    const role = useSelector((state) => state.auth.user?.role);

    const task = tasks.find((task) => task.id === props.taskID);

    const [title, setTitle] = useState(task ? task.title : "");
    const [description, setDescription] = useState(task ? task.description : "");
    const [priority, setPriority] = useState(task ? task.priority : "");
    const [assignedTo, setAssignedTo] = useState(task ? task.assignedTo : "");
    const [assignedBy, setAssignedBy] = useState(task ? task.assignedBy : "");
    const [startDate, setStartDate] = useState(task ? task.startDate : new Date());
    const [comments, setComments] = useState(task ? task.comments : "");
    const [status, setStatus] = useState(task ? task.status : "Open");
    const [time, setTime] = useState(0);
    const [totalTime, setTotalTime] = useState(task ? task.timeSpent : 0);

    const handleCreateTask = () => {

        const newTask = {
            title: title,
            description: description,
            priority: priority,
            status: status,
            assignedTo: assignedTo,
            assignedBy: assignedBy,
            startDate: startDate,
            closedDate: null,
            approvedDate: null,
            comments: comments,
            timeSpent: totalTime,
        };

        if (props.text === "Create Task") {
            dispatch(addTask(newTask));

        } else if (props.text === "Update Task") {

            const updatedTask = {
                ...task,
                timeSpent: totalTime + time, // Add the new log time to total time
            };

            if (status === "Closed") {
                updatedTask.status = "Pending Approval";
                updatedTask.closedDate = new Date();
            } else {
                updatedTask.status = "Open";
                updatedTask.closedDate = null;
            }

            dispatch(updateTask({ id: task.id, updatedTask }));
        }
        props.onClose();
    };

    const handleApproveTask = () => {

        const updatedTask = {
            ...task,
            status: "Closed",
            approvedDate: new Date(),
        };
        dispatch(updateTask({ id: task.id, updatedTask }));
        props.onClose();
    };

    const handleRejectTask = () => {

        const updatedTask = {
            ...task,
            status: "Open",
            approvedDate: null,
            closedDate: null,
        };
        dispatch(updateTask({ id: task.id, updatedTask }));
        props.onClose();
    };

    const isFormValid = title && description && priority && assignedTo && assignedBy;

    return (
        <div id='model-overlay' className="modalOverlay">
            <div id='modal-content' className="modalContent">

                <div id='modal-header' className="modalHeader">
                    <h2>{props.text}</h2>
                    <FaTimes
                        id="close-icon"
                        className='closeIcon'
                        onClick={props.onClose}
                    />
                </div>

                <div id='modal-form' className="modalForm">

                    <label id='name-label' className="taskLabel">
                        Title:
                        <input
                            id='task-name'
                            className="taskInput"
                            type="text"
                            placeholder="Task Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            readOnly={(props.text === "Task Details" || props.text === "Approve Task") ? true : false}
                        />
                    </label>

                    <label id='desc-label' className="taskLabel">
                        Description:
                        <textarea
                            id='task-desc'
                            className="taskInput"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            readOnly={(props.text === "Task Details" || props.text === "Approve Task") ? true : false}
                        />
                    </label>

                    <label id='priority-label' className="taskLabel">
                        Priority:
                        <select
                            id='task-priority'
                            className="taskInput"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            required
                            disabled={(props.text === "Task Details" || props.text === "Approve Task") ? true : false}
                        >
                            <option value="" disabled>Select Priority</option>
                            <option value="High">High</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Low">Low</option>
                        </select>
                    </label>

                    <label id='assignee-label' className="taskLabel">
                        Assigned By:
                        <input
                            id='task-assignedBy'
                            className="taskInput"
                            type="text"
                            placeholder="Assigned By"
                            value={assignedBy}
                            onChange={(e) => setAssignedBy(e.target.value)}
                            required
                            readOnly={(props.text === "Task Details" || props.text === "Approve Task") ? true : false}
                        />
                    </label>

                    <label id='assignee-label' className="taskLabel">
                        Assigned To:
                        <input
                            id='task-assignedTo'
                            className="taskInput"
                            type="text"
                            placeholder="Assign To"
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            required
                            readOnly={(props.text === "Task Details" || props.text === "Approve Task") ? true : false}
                        />
                    </label>

                    <label id='comments-label' className="taskLabel">
                        Comments:
                        <textarea
                            id='task-comments'
                            className="taskInput"
                            placeholder="Comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            readOnly={(props.text === "Task Details" || props.text === "Approve Task") ? true : false}
                        />
                    </label>

                    {props.text === 'Update Task' && (
                        <label id='logTime-label' className="taskLabel">
                            Log Time:
                            <input
                                id='task-logTime'
                                className="taskInput"
                                type="number"
                                min="0"
                                placeholder="Time Spent (in hours)"
                                value={time}
                                onChange={(e) => {
                                    const newTime = Math.max(0, Number(e.target.value));
                                    setTime(newTime);
                                }}
                            />
                        </label>
                    )}

                    {(props.text === "Task Details" || props.text === "Approve Task") && (
                        <>
                            <label id='startDate-label' className="taskLabel">
                                Start Date:
                                <input
                                    id='task-startDate'
                                    className="taskInput"
                                    type="text"
                                    value={task.startDate ? new Date(task.startDate).toLocaleDateString('en-GB') : ""}
                                    readOnly
                                />
                            </label>

                            <label id='closedDate-label' className="taskLabel">
                                Closed Date:
                                <input
                                    id='task-closedDate'
                                    className="taskInput"
                                    type="text"
                                    value={task.closedDate ? new Date(task.startDate).toLocaleDateString('en-GB') : ""}
                                    readOnly
                                />
                            </label>

                            <label id='approvedDate-label' className="taskLabel">
                                Approved Date:
                                <input
                                    id='task-approvedDate'
                                    className="taskInput"
                                    type="text"
                                    value={task.approvedDate ? new Date(task.startDate).toLocaleDateString('en-GB') : ""}
                                    readOnly
                                />
                            </label>
                        </>
                    )}

                    {props.text !== "Create Task" && (
                        <>
                            <label id='priority-label' className="taskLabel">
                                Status:
                                <select
                                    id='task-status'
                                    className="taskInput"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                    disabled={(props.text === "Task Details" || props.text === "Approve Task") ? true : false}
                                >
                                    <option value="" disabled>Select Status</option>
                                    <option value="Open">Open</option>
                                    <option value="Closed">Close</option>
                                </select>
                            </label>

                            <label id='totalTime-label' className="taskLabel">
                                Total Time Spent:
                                <input
                                    id='task-logTime'
                                    className="taskInput"
                                    type="text"
                                    min="0"
                                    placeholder="Time Spent (in hours)"
                                    value={totalTime}
                                />
                            </label>
                        </>
                    )}

                </div>

                {role === 'Developer' ? (
                    props.text !== "Task Details" && (

                        <div id='modal-btns' className="modalButtons">

                            <Button
                                id='create-task'
                                className='createTask'
                                value={props.text}
                                onClick={handleCreateTask}
                                disabled={!isFormValid}
                            />

                            <Button
                                id='cancel-task'
                                className='cancelTask'
                                value="Cancel"
                                onClick={props.onClose}
                            />

                        </div>
                    )) : (
                    role === 'Manager' ? (
                        props.text === "Approve Task" && (
                            <div id='modal-btns' className="modalButtons">

                                <Button
                                    id='approve-task'
                                    className='approveTask'
                                    value="Approve & Close"
                                    onClick={handleApproveTask}
                                />

                                <Button
                                    id='reopen-task'
                                    className='reopenTask'
                                    value="Reject & Reopen"
                                    onClick={handleRejectTask}
                                />

                            </div>
                        )
                    ) : null
                )}
            </div>
        </div>
    );
};

export default CreateEditModal;