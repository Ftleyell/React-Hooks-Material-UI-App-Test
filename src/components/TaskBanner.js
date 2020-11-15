import React from 'react'

export const TaskBanner = props => (
    <h4>
        {props.userName} has {(props.taskItems.filter(t => !t.done).length > 0 ? "(" + (props.taskItems.filter(t => !t.done).length) + ") tasks left to complete." : "completed all tasks!✨")}
    </h4>
)