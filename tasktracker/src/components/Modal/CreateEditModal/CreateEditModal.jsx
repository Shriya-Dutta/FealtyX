import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../../../redux/slices/taskSlice";
import "./CreateEditModalStyles.css";
import Button from "../../Button/Button";

const CreateEditModal = (props) => {

    const dispatch = useDispatch();
    const { tasks } = useSelector((state) => state.tasks);

    const task = tasks.find((task) => task.id === props.taskID);
    console.log("Task Modal: ", task);

    const [title, setTitle] = useState(task ? task.title : "");
    const [description, setDescription] = useState(task ? task.description : "");
    const [priority, setPriority] = useState(task ? task.priority : "");
    const [assignee, setAssignee] = useState(task ? task.assignee : "");
    const [startDate, setStartDate] = useState(task ? task.startDate : new Date());
    const [comments, setComments] = useState(task ? task.comments : "");
    const [status, setStatus] = useState(task ? task.status : "Open");
    const [time, setTime] = useState(0);

    const handleCreateTask = () => {

        const newTask = {
            title: title,
            description: description,
            priority: priority,
            status: status,
            assignee: assignee,
            startDate: startDate,
            closedDate: null,
            approvedDate: null,
            comments: comments,
            timeSpent: 0,
        };

        if (props.text === "Create Task") {
            dispatch(addTask(newTask));
        } else {
            newTask.timeSpent += parseInt(time);
            if (status === "Closed") {
                newTask.status = "Pending Approval";
                newTask.closedDate = new Date();
            }
            else {
                newTask.status = "Open";
                newTask.closedDate = null;
            }
            dispatch(updateTask({ id: task.id, updatedTask: newTask }));
        }
        props.onClose();
    };

    const isFormValid = title && description && priority && assignee;

    return (
        <div id='model-overlay' className="modalOverlay">
            <div id='modal-content' className="modalContent">

                <div id='modal-header' className="modalHeader">
                    <h2>Create New Task</h2>
                </div>

                <div id='modal-form' className="modalForm">

                    <label id='name-label' className="taskLabel">
                        Name:
                        <input
                            id='task-name'
                            className="taskInput"
                            type="text"
                            placeholder="Task Name"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>

                    <label id='desc-label' className="taskLabel">
                        Description:
                        <input
                            id='task-desc'
                            className="taskInput"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
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
                        >
                            <option value="" disabled>Select Priority</option>
                            <option value="High">High</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Low">Low</option>
                        </select>
                    </label>

                    <label id='assignee-label' className="taskLabel">
                        Assignee:
                        <input
                            id='task-assignee'
                            className="taskInput"
                            type="text"
                            placeholder="Assignee"
                            value={assignee}
                            onChange={(e) => setAssignee(e.target.value)}
                            required
                        />
                    </label>

                    <label id='comments-label' className="taskLabel">
                        Comments:
                        <input
                            id='task-comments'
                            className="taskInput"
                            type="text"
                            placeholder="Comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                        />
                    </label>

                    {props.text === "Update Task" && (
                        <>
                            <label id='priority-label' className="taskLabel">
                                Status:
                                <select
                                    id='task-status'
                                    className="taskInput"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Select Status</option>
                                    <option value="Open">Open</option>
                                    <option value="Closed">Close</option>
                                </select>
                            </label>

                            <label id='logTime-label' className="logTimeLabel">
                                Log Time:
                                <input
                                    id='task-logTime'
                                    className="taskInput"
                                    type="number"
                                    min="0"
                                    placeholder="Time Spent (in hours)"
                                    value={time}
                                    onChange={(e) => {
                                        const newValue = Math.max(0, Number(e.target.value)); // <--- ensures manually typed negative numbers become 0
                                        setTime(newValue);
                                      }}
                                />
                            </label>
                        </>
                    )}

                </div>

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
            </div>
        </div>
    );
};

export default CreateEditModal;