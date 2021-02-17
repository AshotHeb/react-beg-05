import React from 'react';
import Task from '../Task/Task';
import AddTask from '../AddTask/AddTask';
// import styles from './todo.module.css';
import idGenerator from '../../helpers/idGenerator';
import { Container, Row, Col, Button } from 'react-bootstrap';

class ToDo extends React.Component {
    state = {
        tasks: [
            {
                _id: idGenerator(),
                text: `AngularJS     — JavaScript-фреймворк с открытым исходным кодом.
                 Предназначен для разработки одностраничных приложений. 
                Его цель — расширение браузерных приложений на основе MVC-шаблона,
                 а также упрощение тестирования и разработки
                 `
            },
            {
                _id: idGenerator(),
                text: `React Js       — JavaScript-библиотека с открытым исходным кодом для разработки пользовательских интерфейсов. 
                React разрабатывается и поддерживается Facebook, Instagram и сообществом отдельных разработчиков и корпораций.
                 React может использоваться для разработки одностраничных и мобильных приложений
                 `
            },
            {
                _id: idGenerator(),
                text: `Vue.js      — JavaScript-фреймворк с открытым исходным кодом для создания пользовательских интерфейсов.
                 Легко интегрируется в проекты с использованием других JavaScript-библиотек. 
                Может функционировать как веб-фреймворк для разработки одностраничных приложений в реактивном стиле
                `
            },

        ],
        removeTasks: [],
    }
    handleSubmit = (value) => {
        if (!value) return;
        const tasks = [...this.state.tasks];
        tasks.push({
            _id: idGenerator(),
            text: value
        });
        this.setState({
            tasks
        });
    }

    handleDeleteOneTask = (id) => {
        let tasks = [...this.state.tasks];
        tasks = tasks.filter(item => item._id !== id);


        // const idx = tasks.findIndex(item => item._id === id);
        // tasks.splice(idx ,1);

        this.setState({
            tasks
        });



    }
    toggleSetRemoveTaskIds = (_id) => {
        //copy Set
        //const  removeTasks = new Set(removeTasks);
        let removeTasks = [...this.state.removeTasks];
        if (removeTasks.includes(_id)) {
            removeTasks = removeTasks.filter(id => id !== _id);
        } else {
            removeTasks.push(_id);
        }

        this.setState({
            removeTasks
        });
    }
    removeSelectedTasks = () => {
        let tasks = [...this.state.tasks];
        const removeTasks = [...this.state.removeTasks];
        tasks = tasks.filter(item => !removeTasks.includes(item._id));
        this.setState({
            tasks,
            removeTasks:[] //new Set()
        });

    }
    render() {
        const { tasks ,removeTasks } = this.state;
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
                        disabled={!!removeTasks.length}
                    />
                </Col>
            )
        })

        return (
            <div>
                <Container>
                    <Row className="mt-4">
                        <Col>
                            <h1>ToDo Component</h1>
                            <AddTask
                                handleSubmit={this.handleSubmit}
                                disabled={!!removeTasks.length}
                            />
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
                                onClick={this.removeSelectedTasks}
                                disabled={!!!removeTasks.length}
                            >
                                Remove Selected
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ToDo;