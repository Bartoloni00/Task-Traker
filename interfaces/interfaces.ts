export interface Task {
    id?: number,
    description?: string,
    status?: string
}

export interface addResult {
    message: string,
    task: Task
}