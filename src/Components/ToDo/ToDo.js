import React from 'react';

class ToDo extends React.Component {
    state = {
        tasks: []
    }
    render() {
        const { tasks } = this.state;


        const Tasks = this.state.tasks.map((task, index) => {
            return (
                <p key={index} className="task">
                    {task}
                </p>
            )
        })


        // if (!tasks.length)
        //     return <div>Tasks is Empty</div>

        return (
            <div>
                <h1>ToDo Component</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Add Task"
                    />
                    <button>Add</button>
                </div>
                <div className="task_wrapper">
                    {!tasks.length && <div>Tasks is Empty</div>}
                    {Tasks}
                </div>
            </div>
        )
    }
}

export default ToDo;