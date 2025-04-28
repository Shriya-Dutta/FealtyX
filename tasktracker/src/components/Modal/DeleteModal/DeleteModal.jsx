import React from "react";
import Button from "../../Button/Button";
import "./DeleteModalStyles.css";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../../redux/slices/taskSlice";

const DeleteModal = (props) => {

    const dispatch = useDispatch();

    const handleDeleteTask = () => {
        dispatch(deleteTask(props.taskID));
        props.onClose();
    };

    return (
        <>
            <div id='delete-modal-overlay' className="DeleteModalOverlay">
                <div id='delete-modal-content' className="DeleteModalContent">

                    <div id='delete-modal-header' className="DeleteModalHeader">
                        <h3>Are you sure you want to delete this task?</h3>
                    </div>

                    <div id='delete-modal-buttons' className="DeleteModalButtons">
                        <Button
                            id='confirmDelete-btn'
                            className='confirmDeleteBtn'
                            value='Delete'
                            onClick={handleDeleteTask}
                        />

                        <Button
                            id='cancel-btn'
                            className='cancelBtn'
                            value='Cancel'
                            onClick={props.onClose}
                        />
                    </div>

                </div>
            </div>
        </>
    );
};

export default DeleteModal;