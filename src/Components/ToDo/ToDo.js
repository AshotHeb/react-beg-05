import React from 'react';
import Task from '../Task/Task';
import Confirm from '../Confirm/Confirm';
// import EditTaskModal from '../EditTaskModal/EditTaskModal';
import TaskActionsModal from '../TaskActionsModal/TaskActionsModal';
// import styles from './todo.module.css';
// import idGenerator from '../../helpers/idGenerator';
import dateFormmatter from '../../helpers/date';
import { Container, Row, Col, Button } from 'react-bootstrap';

class ToDo extends React.Component {
    state = {
        tasks: [],
        removeTasks: new Set(),
        isAllChecked: false,
        isConfirmModal: false,
        editableTask: null,
        isOpenAddTaskModal: false
    }
    handleSubmit = (formData) => {
        if (!formData.title || !formData.description) return;
        formData.date = dateFormmatter(formData.date);
        const tasks = [...this.state.tasks];
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
                tasks.push(data);
                this.setState({
                    tasks
                });
            })
            .catch(error => {
                console.log("catch Error", error);
            });



    }

    handleDeleteOneTask = (id) => {
        let tasks = [...this.state.tasks];
        tasks = tasks.filter(item => item._id !== id);
        this.setState({
            tasks
        });
    }
    toggleSetRemoveTaskIds = (_id) => {
        let removeTasks = new Set(this.state.removeTasks);
        if (removeTasks.has(_id)) {
            removeTasks.delete(_id);
        } else {
            removeTasks.add(_id);
        }

        this.setState({
            removeTasks
        });
    }
    removeSelectedTasks = () => {
        fetch("http://localhost:3001/task", {
            method: "PATCH",
            body: JSON.stringify({ tasks: Array.from(this.state.removeTasks) }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                let tasks = [...this.state.tasks];
                const { removeTasks } = this.state;
                tasks = tasks.filter(item => !removeTasks.has(item._id));
                this.setState({
                    tasks,
                    removeTasks: new Set(),
                    isAllChecked: false
                });
            })


    }
    handleToggleCheckAll = () => {
        const { tasks, isAllChecked } = this.state;
        let removeTasks = new Set();
        if (!isAllChecked) {
            removeTasks = new Set(this.state.removeTasks);
            tasks.forEach(task => {
                removeTasks.add(task._id);
            });
        };
        this.setState({
            removeTasks,
            isAllChecked: !isAllChecked
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
        const tasks = [...this.state.tasks];
        const idx = tasks.findIndex(task => task._id === editTask._id);
        tasks[idx] = editTask;
        this.setState({
            tasks
        });
    }
    toggleOpenAddTaskModal = () => {
        this.setState({
            isOpenAddTaskModal: !this.state.isOpenAddTaskModal
        });
    }
    componentDidMount() {
        fetch("http://localhost:3001/task")
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    throw data.error;
                }
                this.setState({
                    tasks: data
                });
            })
            .catch(error => {
                console.error("Get Tasks Request Error", error);

            });
    }
    render() {


        const {
            tasks,
            removeTasks,
            isAllChecked,
            isConfirmModal,
            editableTask,
            isOpenAddTaskModal
        } = this.state;
        const Tasks = this.state.tasks.map(task => {
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
                        toggleSetRemoveTaskIds={this.toggleSetRemoveTaskIds}
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
                                    onClick={this.toggleOpenAddTaskModal}
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
                                    onClick={this.handleToggleCheckAll}
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
                            // onHide={this.toggleOpenAddTaskModal}
                            // handleSubmit={this.handleSubmit}
                            onHide={this.toggleOpenAddTaskModal}
                            onSubmit={this.handleSubmit}
                        />
                    }
                </div>
            </>
        )
    }

}

export default ToDo;

