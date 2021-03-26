import React, { useReducer, useEffect } from 'react';
import styles from './singleTask.module.css';
import dateFormatter from '../../../helpers/date';
import { Button } from 'react-bootstrap';
import TaskActionsModal from '../../TaskActionsModal/TaskActionsModal';
import Preloader from '../../Preloader/Preloader';

// class SingleTask extends React.Component {
//     state = {
//         singleTask: null,
//         isEditModal: false,
//         loading: false
//     }
//     toggleEditModal = () => {
//         this.setState({
//             isEditModal: !this.state.isEditModal
//         });
//     }
//     handleEditTask = (formData) => {
//         this.setState({ loading: true }); //Loading Started
//         fetch("http://localhost:3001/task/" + formData._id, {
//             method: "PUT",
//             body: JSON.stringify(formData),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data.error)
//                     throw data.error
//                 this.setState({
//                     singleTask: data,
//                     isEditModal: false,
//                 });
//             })
//             .catch(error => {
//                 console.log("Single Task Page,Edit Task Error", error);
//             })
//             .finally(() => {
//                 this.setState({ loading: false }); //Loading Ended
//             })
//     }
//     handleDeleteTask = (id) => {
//         fetch(`http://localhost:3001/task/${id}`, {
//             method: "DELETE"
//         })
//             .then(res => res.json())
//             .then(data => {
//                 if (data.error)
//                     throw data.error;

//                 this.props.history.push("/");
//             })
//             .catch(error => {
//                 console.error("Get Single Task Request Error", error);
//             });
//     }


//     componentDidMount() {
//         const { id } = this.props.match.params;
//         this.setState({ loading: true }); //Loading Started
//         fetch(`http://localhost:3001/task/${id}`)
//             .then(res => res.json())
//             .then(data => {
//                 if (data.error)
//                     throw data.error;
//                 this.setState({
//                     singleTask: data,
//                     loading: false //Loading Ended
//                 });
//             })
//             .catch(error => {
//                 const { history } = this.props;
//                 history.push("/404");
//                 console.error("Get Single Task Request Error", error);
//             })

//     }

//     render() {

//         const {
//             singleTask,
//             isEditModal,
//             loading
//         } = this.state;


//         if (!singleTask) return <Preloader />

//         return (
//             <>
//                 <div className={styles.singeTask}>

//                     <div className={styles.task}>
//                         <h2>{singleTask.title}</h2>
//                         <p>
//                             {singleTask.description}
//                         </p>
//                         <p>
//                             Date :   <span className={styles.date}> {dateFormatter(singleTask.date)}</span>
//                         </p>
//                         <p>
//                             Created_at :  <span className={styles.date}> {dateFormatter(singleTask.created_at)}</span>
//                         </p>
//                         <div>
//                             <Button
//                                 variant="danger"
//                                 style={{ backgroundColor: "#962e2e", border: 0 }}
//                                 onClick={() => this.handleDeleteTask(singleTask._id)}
//                             >
//                                 Delete
//                 </Button>
//                             <Button
//                                 variant="warning"
//                                 className="ml-5"
//                                 style={{ backgroundColor: "#64a0eb", border: "0" }}
//                                 onClick={this.toggleEditModal}
//                             >
//                                 Edit
//                 </Button>
//                         </div>
//                     </div>
//                 </div>
//                 {
//                     isEditModal && <TaskActionsModal
//                         editableTask={singleTask}
//                         onHide={this.toggleEditModal}
//                         onSubmit={this.handleEditTask}
//                     />
//                 }
//                 {
//                     loading && <Preloader />
//                 }

//             </>
//         );
//     }
// };

const initialState = {
    singleTask: null,
    isEditModal: false,
    loading: false
}
const reducer = (state, action) => {
    switch (action.type) {
        case "toggleEditModal":
            return {
                ...state,
                isEditModal: !state.isEditModal
            }
        case "toggleLoading":
            return {
                ...state,
                loading: action.loading
            }
        case "setSingleTask":
            return {
                ...state,
                singleTask: action.data
            }
        default:
            throw new Error();
    }
}

const SingleTask = (props) => {
    //Reducer
    const [state, dispatch] = useReducer(reducer, initialState);
    //Effects
    useEffect(() => {
        const { id } = props.match.params;
        dispatch({ type: "toggleLoading", loading: true }); //Loading Started
        fetch(`http://localhost:3001/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                dispatch({ type: "setSingleTask", data: data });
                dispatch({ type: "toggleLoading", loading: false }); //Loading Ended
            })
            .catch(error => {
                const { history } = this.props;
                history.push("/404");
                console.error("Get Single Task Request Error", error);
            })
    }, [])

    //Component Utils
    const {
        singleTask,
        isEditModal,
        loading
    } = state;



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
                            onClick={() => this.handleDeleteTask(singleTask._id)}
                        >
                            Delete
                        </Button>
                        <Button
                            variant="warning"
                            className="ml-5"
                            style={{ backgroundColor: "#64a0eb", border: "0" }}
                            onClick={() => dispatch({ type: "toggleEditModal" })}
                        >
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
            {
                isEditModal && <TaskActionsModal
                    editableTask={singleTask}
                    onHide={() => dispatch({ type: "toggleEditModal" })}
                    onSubmit={this.handleEditTask}
                />
            }
            {
                loading && <Preloader />
            }

        </>
    );
}

export default SingleTask;