// import { v4 as uuid } from 'uuid';

export default class Task {

	taskId : number;
	taskName : string;
	taskIsCompleted: boolean;

	constructor(taskName: string) {
		this.taskId = new Date().getMilliseconds();
		this.taskName = taskName;
		this.taskIsCompleted = false;
	}
}