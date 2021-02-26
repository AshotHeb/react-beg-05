import React, { memo } from 'react';
import styles from './task.module.css';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Task = ({
    task,
    disabled,
    handleDeleteOneTask,
    toggleSetRemoveTaskIds,
    checked
}) => {

    return (
        <Card className={`${styles.card} ${checked && styles.checked}`} onClick={()=>console.log('Click')}>
            <Card.Body className="cardBody">
                <input
                    type="checkbox"
                    onChange={() => toggleSetRemoveTaskIds(task._id)}
                    checked={checked}
                />
                <Card.Title>Title : {task.text.slice(0, 10)}</Card.Title>
                <Card.Text> Description : {task.text}</Card.Text>
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
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};
Task.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired
    }),
    disabled: PropTypes.bool.isRequired,
    handleDeleteOneTask: PropTypes.func.isRequired,
    toggleSetRemoveTaskIds: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired
}

export default memo(Task);