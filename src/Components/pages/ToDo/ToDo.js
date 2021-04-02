import React, { useEffect } from 'react';
import Task from '../../Task/Task';
import Confirm from '../../Confirm/Confirm';
import TaskActionsModal from '../../TaskActionsModal/TaskActionsModal';
import Preloader from '../../Preloader/Preloader';
import dateFormmatter from '../../../helpers/date';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import actionTypes from '../../../Redux/actionTypes';
import {
    setTasksThunk,
    addTaskThunk,
    deleteOneTaskThunk,
    editTaskThunk,
    removeAnyTasksThunk
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
        //functions
        toggleCheckTask,
        toggleCheckAllTasks,
        toggleOpenAddTaskModal,
        toggleOpenConfirmModal,
        setOrRemoveEditableTask,
        deleteOneTask,
        editTask,
        removeAnyTasks,
        setTasks

    } = props;
    const handleSubmit = (formData) => {
        if (!!!formData.title.trim() || !!!formData.description.trim()) return;
        formData.date = dateFormmatter(formData.date);
        props.AddTask(formData);

    }

    useEffect(() => {
        setTasks();
    }, [setTasks]);


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
                />
            </Col>
        )
    });

    return (
        <>
            <div>
                <Container>
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
                        onSubmit={removeAnyTasks}
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
        editableTask
    } = state.todoState;
    return {
        tasks,
        loading,
        removeTasks,
        isOpenAddTaskModal,
        isAllChecked,
        isConfirmModal,
        editableTask
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        //Thunks
        setTasks: () => dispatch(setTasksThunk()),
        AddTask: (formData) => dispatch(addTaskThunk(formData)),
        editTask: (editTask) => dispatch(editTaskThunk(editTask)),
        deleteOneTask: (_id) => dispatch(deleteOneTaskThunk(_id)),
        removeAnyTasks: () => dispatch(removeAnyTasksThunk()),

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

