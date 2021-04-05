import React, { memo } from 'react';
import styles from './task.module.css';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheckSquare, faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dateFormmatter from '../../helpers/date';

const Task = ({
    task,
    disabled,
    handleDeleteOneTask,
    toggleSetRemoveTaskIds,
    checked,
    handleSetEditTask,
    toggleActiveTask
}) => {

    return (
        <Card className={`${styles.card} ${checked && styles.checked}`}>
            <Card.Body className="cardBody">
                <input
                    type="checkbox"
                    onChange={() => toggleSetRemoveTaskIds(task._id)}
                    checked={checked}
                />
                <Card.Title>
                    <Link to={`/task/${task._id}`}>
                        Title : {task.title}
                    </Link>
                </Card.Title>
                <Card.Text> Description : {task.description}</Card.Text>
                <Card.Text> Date : {dateFormmatter(task.date)}</Card.Text>
                <Card.Text> Created_AT : {dateFormmatter(task.created_at)}</Card.Text>
                <div>
                    <Button
                        disabled={disabled}
                        variant="danger"
                        onClick={() => handleDeleteOneTask(task._id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                    <Button
                        variant="warning"
                        className="ml-3"
                        disabled={disabled}
                        onClick={() => handleSetEditTask(task)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>

                    <Button
                        variant="info"
                        className="ml-3"
                        disabled={disabled}
                        onClick={() => toggleActiveTask(task)}
                    >
                        <FontAwesomeIcon icon={task.status === "active" ? faHourglassHalf : faCheckSquare} />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};
Task.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }),
    disabled: PropTypes.bool.isRequired,
    handleDeleteOneTask: PropTypes.func.isRequired,
    toggleSetRemoveTaskIds: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    handleSetEditTask: PropTypes.func.isRequired,
    toggleActiveTask:PropTypes.func.isRequired
}

export default memo(Task);