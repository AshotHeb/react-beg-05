import React, { useEffect } from 'react';
import Task from '../../Task/Task';
import Search from '../../Search/Search';
import Confirm from '../../Confirm/Confirm';
import TaskActionsModal from '../../TaskActionsModal/TaskActionsModal';
import Preloader from '../../Preloader/Preloader';
import dateFormmatter from '../../../helpers/date';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import actionTypes from '../../../Redux/actionTypes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    setTasksThunk,
    addTaskThunk,
    deleteOneTaskThunk,
    editTaskThunk,
    removeAnyTasksThunk,
    toggleActiveStatusThunk
} from '../../../Redux/actions';

const ToDo = (props) => {
    const {
        //state
        tasks,
        loading,
        removeTasks,
        isAllChecked,
        isOpenAddTaskModal,
        isConfirmModal,
        editableTask,
        errorMessage,
        successMessage,
        //functions
        toggleCheckTask,
        toggleCheckAllTasks,
        toggleOpenAddTaskModal,
        toggleOpenConfirmModal,
        setOrRemoveEditableTask,
        deleteOneTask,
        editTask,
        removeAnyTasks,
        setTasks,
        toggleActiveTask

    } = props;
    const handleSubmit = (formData) => {
        if (!!!formData.title.trim() || !!!formData.description.trim()) return;
        formData.date = dateFormmatter(formData.date);
        props.AddTask(formData);

    }

    useEffect(() => {
        setTasks();
    }, [setTasks]);
    useEffect(() => {
        errorMessage && toast.error(`🦄  ${errorMessage}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, [errorMessage]);

    useEffect(() => {
        successMessage && toast.success(`🦄  ${successMessage}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, [successMessage]);

    const Tasks = tasks.map(task => {
        return (
            <Col
                key={task._id}
                className="d-flex justify-content-center mt-3"
                xs={12}
                md={6}
                xl={4}
            >
                <Task
                    task={task}
                    handleDeleteOneTask={deleteOneTask}
                    toggleSetRemoveTaskIds={toggleCheckTask}
                    disabled={!!removeTasks.size}
                    checked={removeTasks.has(task._id)}
                    handleSetEditTask={setOrRemoveEditableTask}
                    toggleActiveTask={toggleActiveTask}
                />
            </Col>
        )
    });



    return (
        <>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <Search />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col>
                            <Button
                                varinat="primary"
                                onClick={toggleOpenAddTaskModal}
                            >
                                Add Task
                                    </Button>
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        {!tasks.length && <div>Tasks is Empty</div>}
                        {Tasks}
                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <Button
                                variant="danger"
                                onClick={toggleOpenConfirmModal}
                                disabled={!!!removeTasks.size}
                            >
                                Remove Selected
                            </Button>
                            <Button
                                variant="primary"
                                className="ml-5"
                                onClick={toggleCheckAllTasks}
                                disabled={!!!tasks.length}
                            >
                                {isAllChecked ? 'Remove All Selected' : 'Select All'}
                            </Button>
                        </Col>
                    </Row>

                </Container>
                {
                    isConfirmModal && <Confirm
                        onHide={toggleOpenConfirmModal}
                        onSubmit={() => removeAnyTasks(removeTasks)}
                        message={` Do you wont to delete ${removeTasks.size} task? `}
                    />
                }
                {
                    editableTask && <TaskActionsModal
                        editableTask={editableTask}
                        onHide={setOrRemoveEditableTask}
                        onSubmit={editTask}
                    />
                }
                {
                    isOpenAddTaskModal && <TaskActionsModal
                        onHide={toggleOpenAddTaskModal}
                        onSubmit={handleSubmit}
                    />
                }
                {
                    loading && <Preloader />
                }
                {
                    <ToastContainer />
                }
            </div>
        </>
    );
}


const mapStateToProps = (state) => {
    const {
        tasks,
        loading,
        removeTasks,
        isOpenAddTaskModal,
        isAllChecked,
        isConfirmModal,
        editableTask,
        errorMessage,
        successMessage
    } = state.todoState;
    return {
        tasks,
        loading,
        removeTasks,
        isOpenAddTaskModal,
        isAllChecked,
        isConfirmModal,
        editableTask,
        errorMessage,
        successMessage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        //Thunks
        setTasks: () => dispatch(setTasksThunk()),
        AddTask: (formData) => dispatch(addTaskThunk(formData)),
        editTask: (editTask) => dispatch(editTaskThunk(editTask)),
        deleteOneTask: (_id) => dispatch(deleteOneTaskThunk(_id)),
        removeAnyTasks: (removeTasks) => dispatch(removeAnyTasksThunk(removeTasks)),
        toggleActiveTask: (task) => dispatch(toggleActiveStatusThunk(task)),

        //Actions
        toggleCheckTask: (_id) => dispatch({ type: actionTypes.TOGGLE_CHECK_TASK, _id }),
        toggleCheckAllTasks: () => dispatch({ type: actionTypes.TOGGLE_CHECK_ALL_TASKS }),
        toggleOpenAddTaskModal: () => dispatch({ type: actionTypes.TOOGLE_OPEN_ADD_TASK_MODAL }),
        toggleOpenConfirmModal: () => dispatch({ type: actionTypes.TOGGLE_OPEN_CONFIRM_MODAL }),
        setOrRemoveEditableTask: (task = null) => dispatch({ type: actionTypes.SET_OR_REMOVE_EDITABLE_TASK, task })
    }
}
const TodoProvider = connect(mapStateToProps, mapDispatchToProps)(ToDo);


export default TodoProvider;

