import React from 'react';
import styles from './singleTask.module.css';
import dateFormatter from '../../../helpers/date';
import { Button } from 'react-bootstrap';

class SingleTask extends React.Component {
    state = {
        singleTask: null
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
    handleHistoryTest = () => {
        const { history } = this.props;
        // history.goBack();
        // history.goForward();
        history.push("/contact");
    }
    render() {
        const { singleTask } = this.state;
        if (!singleTask) {
            return <div>
                <span>Loading...</span>
            </div>
        }

        return (
            <div className={styles.singeTask}>
                <div className={styles.task}>
                    <div>
                        <button onClick={this.handleHistoryTest}>
                            History Test
                        </button>
                    </div>
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
                        >
                            Delete
                </Button>
                        <Button
                            variant="warning"
                            className="ml-5"
                            style={{ backgroundColor: "#64a0eb", border: "0" }}
                        >
                            Edit
                </Button>
                    </div>
                </div>
            </div>
        );
    }
};

export default SingleTask;