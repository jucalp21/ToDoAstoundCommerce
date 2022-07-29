// import { v4 as uuid } from 'uuid';
export default class Task {
    constructor(taskName) {
        this.taskId = new Date().getMilliseconds();
        this.taskName = taskName;
        this.taskIsCompleted = false;
    }
}
