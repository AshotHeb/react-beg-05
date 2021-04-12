import actionTypes from './actionTypes';
const API_URL = process.env.REACT_APP_API_URL;
export const setTasksThunk = () => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`${API_URL}/task`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error;
            }
            dispatch({ type: actionTypes.SET_TASKS, data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error });


        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}

export const addTaskThunk = (formData) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`${API_URL}/task`, {
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
            dispatch({ type: actionTypes.ADD_TASK, data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });

        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}

export const deleteOneTaskThunk = (_id, history = null) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`${API_URL}/task/${_id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            if (history) {  //isSingleTask Delete Function
                history.push("/");
            } else {
                dispatch({ type: actionTypes.DELETE_ONE_TASK, _id });
            }
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}


export const editTaskThunk = (editTask, page = "todo") => (dispatch) => {
    console.log("editTask", editTask);
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`${API_URL}/task/${editTask._id}`, {
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
            if (page === "todo") {
                dispatch({ type: actionTypes.EDIT_TASK, data });
            } else if (page === "singleTask") {
                dispatch({ type: actionTypes.SET_SINGLE_TASK, data });
            } else {
                throw new Error("The Page is not Found ` " + page);
            }

        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });

        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });

}

export const removeAnyTasksThunk = (removeTasks) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`${API_URL}/task`, {
        method: "PATCH",
        body: JSON.stringify({ tasks: Array.from(removeTasks) }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error;
            }
            dispatch({ type: actionTypes.DELETE_CHECKED_TASKS });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });

        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });

}


export const toggleActiveStatusThunk = (task) => (dispatch) => {
    const status = task.status === "active" ? "done" : "active";
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`${API_URL}/task/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: actionTypes.TOGGLE_ACTIVE_TASK, task: data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}

export const sortOrFilterTasksThunk = (queryData) => (dispatch) => {
    let query = "?";
    for (let key in queryData) {
        query += key + "=" + queryData[key] + "&";
    }
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch(`${API_URL}/task` + query.slice(0, query.length - 1))
        .then(res => res.json())
        .then(data => {
            if (data.error) throw data.error;
            dispatch({ type: actionTypes.SET_TASKS, data });
        })
        .catch(error => {
            dispatch({ type: actionTypes.SET_ERROR_MESSAGE, errorMessage: error.message });
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}

export const setSingleTaskThunk = (id, history) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true }); //Loading Started
    fetch(`http://localhost:3001/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error;
            dispatch({ type: actionTypes.SET_SINGLE_TASK, data: data });
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false }); //Loading Ended
        })
        .catch(error => {
            history.push("/404");
            console.error("Get Single Task Request Error", error);
        });
}

export const toggleEditModalOfSingle = (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_EDIT_MODAL })
}


export const submitContactFormThunk = (formData, history) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });//Loading Started
    const contactFormData = { ...formData };
    const isValid = contactFormData.name.valid &&
        contactFormData.email.valid &&
        contactFormData.message.valid;

    let error = "";
    if (!contactFormData.name.valid) {
        error = !contactFormData.name.value ? "Field is Required" : contactFormData.name.error;
    } else if (!contactFormData.email.valid) {
        error = !contactFormData.email.value ? "Field is Required" : contactFormData.email.error;
    } else if (!contactFormData.message.valid) {
        error = !contactFormData.message.value ? "Field is Required" : contactFormData.message.error;
    }

    console.log("error", error);
    // setErrorMessage(error);
    if (!isValid) return;

    for (let key in contactFormData) {
        contactFormData[key] = contactFormData[key].value;
    }

    (async () => {
        try {
            const response = await fetch("http://localhost:3001/form", {
                method: "POST",
                body: JSON.stringify(contactFormData),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (data.error) throw data.error;
            history.push("/");

        } catch (error) {
            // setErrorMessage(error.message);
            console.log("Submit Contact Form Request Error", error);
        } finally {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false }); //Loading Ended

        }
    })()
}
