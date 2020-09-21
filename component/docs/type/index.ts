export interface ITaskProps {
    task: {
        id: string;
        title: string;
        state: string;
    };
    onArchiveTask: (id: string) => {};
    onPinTask: (id: string) => {};
}