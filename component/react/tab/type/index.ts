export interface ITabContents {
    name: string;
    className: string | null;
    //onClick: (e: MouseEvent) => {}
}

export interface ITabProps {
    tabContents: ITabContents[];
}