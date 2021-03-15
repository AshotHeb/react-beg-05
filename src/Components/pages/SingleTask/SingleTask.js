import React from 'react';
import styles from './singleTask.module.css';
import dateFormatter from '../../../helpers/date';
import { Button } from 'react-bootstrap';
import TaskActionsModal from '../../TaskActionsModal/TaskActionsModal';

class SingleTask extends React.Component {
    state = {
        singleTask: null,
        isEditModal: false
    }
    toggleEditModal = () => {
        this.setState({
            isEditModal: !this.state.isEditModal
        });
    }
    handleEditTask = (formData) => {
        fetch("http://localhost:3001/task/" + formData._id, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                this.setState({
                    singleTask: data
                });
            })
            .catch(error => {
                console.log("Single Task Page,Edit Task Error", error);
            });
    }
    handleDeleteTask = (id) => {
        fetch(`http://localhost:3001/task/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;

                this.props.history.push("/");
            })
            .catch(error => {
                console.error("Get Single Task Request Error", error);
            });
    }


    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                this.setState({
                    singleTask: data
                });
            })
            .catch(error => {
                console.error("Get Single Task Request Error", error);
            });
    }

    render() {
        const { singleTask, isEditModal } = this.state;
        if (!singleTask) {
            return <div>
                <span>Loading...</span>
            </div>
        }

        return (
            <>
                <div className={styles.singeTask}>
                    <div>
                        <button onClick={() => this.props.history.goBack()}>
                            Go Back
                        </button>
                    </div>
                    <div className={styles.task}>
                        <h2>{singleTask.title}</h2>
                        <p>
                            {singleTask.description}
                        </p>
                        <p>
                            Date :   <span className={styles.date}> {dateFormatter(singleTask.date)}</span>
                        </p>
                        <p>
                            Created_at :  <span className={styles.date}> {dateFormatter(singleTask.created_at)}</span>
                        </p>
                        <div>
                            <Button
                                variant="danger"
                                style={{ backgroundColor: "#962e2e", border: 0 }}
                                onClick={() => this.handleDeleteTask(singleTask._id)}
                            >
                                Delete
                </Button>
                            <Button
                                variant="warning"
                                className="ml-5"
                                style={{ backgroundColor: "#64a0eb", border: "0" }}
                                onClick={this.toggleEditModal}
                            >
                                Edit
                </Button>
                        </div>
                    </div>
                </div>
                {
                    isEditModal && <TaskActionsModal
                        editableTask={singleTask}
                        onHide={this.toggleEditModal}
                        onSubmit={this.handleEditTask}
                    />
                }
            </>
        );
    }
};

export default SingleTask;