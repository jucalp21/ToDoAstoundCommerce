import Task from './task.js';

export default class Utils {

	private tasks : Array<Task>;

	constructor() {
		this.tasks = JSON.parse(localStorage.getItem('TASKS') || '[]');
	}

	private saveTaskInLS(): void {
		localStorage.setItem('TASKS', JSON.stringify(this.tasks));
	}

	addTask(task: Task): void {
		this.tasks.push(task);
		this.saveTaskInLS();
	}

	getTasks(): Array<Task> {
		return this.tasks;
	}

	toggleTaskStatus(taskId: number): void {

		this.tasks.forEach(task => {
			if(task.taskId === taskId) {
				console.log('in')
				task.taskIsCompleted = !task.taskIsCompleted;
			}
		});

		console.log(this.tasks);
		this.saveTaskInLS();

	}

}