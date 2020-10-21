export interface ITabContents {
    name: string;
    onClick: (e: MouseEvent) => void
}

export interface ITabProps {
    tabContents: ITabContents[];
}