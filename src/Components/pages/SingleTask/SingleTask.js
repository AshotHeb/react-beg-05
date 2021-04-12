import React, { useEffect } from 'react';
import styles from './singleTask.module.css';
import dateFormatter from '../../../helpers/date';
import { Button } from 'react-bootstrap';
import TaskActionsModal from '../../TaskActionsModal/TaskActionsModal';
import Preloader from '../../Preloader/Preloader';
import { connect } from 'react-redux';
import {
    setSingleTaskThunk,
    deleteOneTaskThunk,
    editTaskThunk,
    toggleEditModalOfSingle
} from '../../../Redux/actions';



const SingleTask = (props) => {

    //Effects
    const { id } = props.match.params;
    const { history, setSingleTask } = props;
    useEffect(() => {
        setSingleTask(id, history);
    }, [id, history, setSingleTask]);
    const {
        //state
        singleTask,
        isEditModal,
        loading

    } = props;

    if (!!!singleTask) return <Preloader />

    return (
        <>
            <div className={styles.singeTask}>

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
                            onClick={() => props.deleteTask(singleTask._id, history)}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="warning"
                            className="ml-5"
                            style={{ backgroundColor: "#64a0eb", border: "0" }}
                            onClick={props.toggleEditModal}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
            {
                isEditModal && <TaskActionsModal
                    editableTask={singleTask}
                    onHide={props.toggleEditModal}
                    onSubmit={props.editTask}
                />
            }
            {
                loading && <Preloader />
            }

        </>
    );
}

const mapStateToProps = (state) => {
    const {
        singleTask,
        isEditModal
    } = state.singleTaskState;
    return {
        singleTask,
        isEditModal,
        loading: state.todoState.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setSingleTask: (id, history) => dispatch(setSingleTaskThunk(id, history)),
        deleteTask: (_id, history) => dispatch(deleteOneTaskThunk(_id, history)),
        editTask: (singleTask, page) => dispatch(editTaskThunk(singleTask, page)),
        toggleEditModal: () => dispatch({ type: "TOGGLE_EDIT_MODAL" })


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);