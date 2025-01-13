/**
 * kanban card
 */
export interface Task {
    isNew: boolean;
    id: number;
    name: string;
    description: string;
    status: 'To Do' | 'In Progress' | 'Testing' | 'Done';
}
