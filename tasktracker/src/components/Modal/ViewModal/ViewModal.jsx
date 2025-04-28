import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTask } from "../../../redux/slices/taskSlice";
import "./ViewModalStyles.css";
import CloseIcon from "../../../utils/assets/CloseIcon.svg";
import Button from "../../Button/Button";

const View = (props) => {

    const { tasks } = useSelector((state) => state.tasks);
    const role = useSelector((state) => state.auth.user?.role);
    const dispatch = useDispatch();

    const task = tasks.find((task) => task.id === props.taskID);
    console.log("Task Modal: ", task);

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

    return (
        <div id='view-model-overlay' className="ViewModalOverlay">
            <div id='view-modal-content' className="ViewModalContent">

                <div id='view-modal-header' className="ViewModalHeader">
                    <h2>{task.title}</h2>
                    <img
                        id="close-icon"
                        className='closeIcon'
                        src={CloseIcon}
                        alt="Close"
                        onClick={props.onClose}
                    />
                </div>

                <div id='modal-form' className="modalForm">

                    <label id='desc-label' className="taskLabel">
                        {`Description: ${task.description}`}
                    </label>

                    <label id='priority-label' className="taskLabel">
                        {`Priority: ${task.priority}`}
                    </label>

                    <label id='status-label' className="statusLabel">
                        {`Status: ${task.status}`}
                    </label>

                    <label id='assignee-label' className="taskLabel">
                        {`Assignee: ${task.assignee}`}
                    </label>

                    <label id='startDate-label' className="startDateLabel">
                        {`Start Date: ${task.startDate ? new Date(task.startDate).toLocaleDateString('en-GB'): ""}`}
                    </label>

                    <label id='closedDate-label' className="closedDateLabel">
                        {`Closed Date: ${task.closedDate ? new Date(task.closedDate).toLocaleDateString('en-GB'): ""}`}
                    </label>

                    <label id='approvedDate-label' className="approvedDateLabel">
                        {`Approved Date: ${task.approvedDate ? new Date(task.approvedDate).toLocaleDateString('en-GB'): ""}`}
                    </label>

                    <label id='comments-label' className="taskLabel">
                        {`Comments: ${task.comments}`}
                    </label>

                    <label id='timeSpent-label' className="timeSpentLabel">
                        {`Total Time Spent: ${task.timeSpent} hours`}
                    </label>

                </div>

                {role === 'Manager' && task.status === 'Pending Approval'? (

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
                ) : null }
            </div>
        </div>
    );
};

export default View;