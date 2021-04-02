import actionTypes from './actionTypes';

export const setTasksThunk = () => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch("http://localhost:3001/task")
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error;
            }
            dispatch({ type: actionTypes.SET_TASKS, data });
        })
        .catch(error => {
            console.error("Get Tasks Request Error", error);

        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}

export const addTaskThunk = (formData) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
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
            dispatch({ type: actionTypes.ADD_TASK, data });
        })
        .catch(error => {
            console.log("catch Error", error);
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}

export const deleteOneTaskThunk = (_id) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
    fetch("http://localhost:3001/task/" + _id, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                throw data.error
            }
            dispatch({ type: actionTypes.DELETE_ONE_TASK, _id });
        })
        .catch(error => {
            console.error("Delete Task Request Error", error);
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });
}


export const editTaskThunk = (editTask) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
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
            dispatch({ type: actionTypes.EDIT_TASK, data });
        })
        .catch(error => {
            console.error("Edit Task Request", error);
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });

}

export const removeAnyTasksThunk = (editTask) => (dispatch) => {
    dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: true });
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
            dispatch({ type: actionTypes.DELETE_CHECKED_TASKS });
        })
        .catch(error => {
            console.error("Delete Any Tasks Request Error", error);
        })
        .finally(() => {
            dispatch({ type: actionTypes.TOGGLE_LOADING, isLoading: false });
        });

}