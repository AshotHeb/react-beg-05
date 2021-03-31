import React from 'react';
import Task from '../../Task/Task';
import Confirm from '../../Confirm/Confirm';
import TaskActionsModal from '../../TaskActionsModal/TaskActionsModal';
import Preloader from '../../Preloader/Preloader';
import dateFormmatter from '../../../helpers/date';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import actionTypes from '../../../Redux/actionTypes';

class ToDo extends React.Component {
    state = {
        // tasks: [],
        // removeTasks: new Set(),
        // isAllChecked: false,
        isConfirmModal: false,
        editableTask: null,
        // isOpenAddTaskModal: false,
        // loading: false
    }
    handleSubmit = (formData) => {
        if (!!!formData.title.trim() || !!!formData.description.trim()) return;
        formData.date = dateFormmatter(formData.date);
        this.props.toggleLoading(true); //Loading Started
        fetch("http://localhost:3001/task", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.props.addTask(data);
                this.state.isOpenAddTaskModal && this.toggleOpenAddTaskModal();

            })
            .catch(error => {
                console.log("catch Error", error);
            })
            .finally(() => {
                this.props.toggleLoading(false); //Loading Ended 
            });

    }

    handleDeleteOneTask = (_id) => {
        this.props.toggleLoading(true); //Loading Started
        fetch("http://localhost:3001/task/" + _id, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error
                }
                this.props.deletOneTask(_id);
            })
            .catch(error => {
                console.error("Delete Task Request Error", error);
            })
            .finally(() => {
                this.props.toggleLoading(false); //Loading Ended
            });

    }
    removeSelectedTasks = () => {
        this.props.toggleLoading(true); //Loading Started
        fetch("http://localhost:3001/task", {
            method: "PATCH",
            body: JSON.stringify({ tasks: Array.from(this.props.removeTasks) }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.props.deleteCheckedTasks();
            })
            .catch(error => {
                console.error("Delete Any Tasks Request Error", error);
            })
            .finally(() => {
                this.props.toggleLoading(false); //Loading Ended
            });


    }
    handleToggleOpenModal = () => {
        this.setState({
            isConfirmModal: !this.state.isConfirmModal
        });
    }
    handleSetEditTask = (task) => {
        this.setState({
            editableTask: task
        });
    }
    setEditableTaskNull = () => {
        this.setState({
            editableTask: null
        });
    }
    handleEditTask = (editTask) => {
        this.props.toggleLoading(true); //Loading Started
        fetch("http://localhost:3001/task/" + editTask._id, {
            method: "PUT",
            body: JSON.stringify(editTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.props.editTask(data);
                this.state.editableTask && this.setEditableTaskNull();

            })
            .catch(error => {
                console.error("Edit Task Request", error);
            })
            .finally(() => {
                this.props.toggleLoading(false); //Loading Ended
            });

    }
    toggleOpenAddTaskModal = () => {
        this.setState({
            isOpenAddTaskModal: !this.state.isOpenAddTaskModal
        });
    }
    componentDidMount() {
        this.props.toggleLoading(true);
        fetch("http://localhost:3001/task")
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.props.setTasks(data);
            })
            .catch(error => {
                console.error("Get Tasks Request Error", error);

            })
            .finally(() => {
                this.props.toggleLoading(false);
            });
    }

    render() {
        console.log("Todo", this.props);
        const {
            //state
            tasks,
            loading,
            removeTasks,
            isAllChecked,
            isOpenAddTaskModal,
            //functions
            toggleCheckTask,
            toggleCheckAllTasks,
            toggleOpenAddTaskModal

        } = this.props;

        const {
            isConfirmModal,
            editableTask,
        } = this.state;




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
                        handleDeleteOneTask={this.handleDeleteOneTask}
                        toggleSetRemoveTaskIds={toggleCheckTask}
                        disabled={!!removeTasks.size}
                        checked={removeTasks.has(task._id)}
                        handleSetEditTask={this.handleSetEditTask}
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
                                    onClick={this.handleToggleOpenModal}
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
                            onHide={this.handleToggleOpenModal}
                            onSubmit={this.removeSelectedTasks}
                            message={` Do you wont to delete ${removeTasks.size} task? `}
                        />
                    }
                    {
                        editableTask && <TaskActionsModal
                            editableTask={editableTask}
                            onHide={this.setEditableTaskNull}
                            onSubmit={this.handleEditTask}
                        />
                    }
                    {
                        isOpenAddTaskModal && <TaskActionsModal
                            onHide={toggleOpenAddTaskModal}
                            onSubmit={this.handleSubmit}
                        />
                    }
                    {
                        loading && <Preloader />
                    }
                </div>
            </>
        )
    }

}


const mapStateToProps = (state) => {
    const {
        tasks,
        loading,
        removeTasks,
        isOpenAddTaskModal,
        isAllChecked
    } = state.todoState;
    return {
        tasks,
        loading,
        removeTasks,
        isOpenAddTaskModal,
        isAllChecked
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setTasks: (data) => {
            dispatch({ type: actionTypes.SET_TASKS, data });
        },
        toggleLoading: (isLoading) => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading });
        },
        deletOneTask: (_id) => {
            dispatch({ type: actionTypes.DELETE_ONE_TASK, _id });
        },
        addTask: (data) => {
            dispatch({ type: actionTypes.ADD_TASK, data });
        },
        editTask: (data) => {
            dispatch({ type: actionTypes.EDIT_TASK, data });
        },
        toggleCheckTask: (_id) => {
            dispatch({ type: actionTypes.TOGGLE_CHECK_TASK, _id });
        },
        deleteCheckedTasks: () => {
            dispatch({ type: actionTypes.DELETE_CHECKED_TASKS });
        },
        toggleCheckAllTasks: () => {
            dispatch({ type: actionTypes.TOGGLE_CHECK_ALL_TASKS });
        },
        toggleOpenAddTaskModal: () => {
            dispatch({ type: actionTypes.TOOGLE_OPEN_ADD_TASK_MODAL });
        }
    }
}
const TodoProvider = connect(mapStateToProps, mapDispatchToProps)(ToDo);


export default TodoProvider;

