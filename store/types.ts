export interface Task {
  id: String;
  taskName: String;
  complete: Boolean;
  createdAt: String;
}

export type Tasks = Task[];

export interface GlobalState {
  tasks: Tasks;
}
