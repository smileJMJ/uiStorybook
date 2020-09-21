import React from 'react';
import Task from './Task';
import {ITaskProps} from './type';

export default {
    component: Task,
    title: 'Example/Task'
};

const Template = (args: ITaskProps) => <Task {...args}/>;

export const Default = Template.bind({});
Default.args = {
    task: {
        id: '1',
        title: 'Test Task',
        state: 'TASK_INBOX',
        updateAt: new Date(2020, 9, 19)
    }
};

export const Pinned = Template.bind({});
Pinned.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_PINNED'
    }
};

export const Archived = Template.bind({});
Archived.args = {
    task: {
        ...Default.args.task,
        state: 'TASK_ARCHIVED'
    }
};