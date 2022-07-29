export default class Utils {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('TASKS') || '[]');
    }
    saveTaskInLS() {
        localStorage.setItem('TASKS', JSON.stringify(this.tasks));
    }
    addTask(task) {
        this.tasks.push(task);
        this.saveTaskInLS();
    }
    getTasks() {
        return this.tasks;
    }
    toggleTaskStatus(taskId) {
        this.tasks.forEach(task => {
            if (task.taskId === taskId) {
                console.log('in');
                task.taskIsCompleted = !task.taskIsCompleted;
            }
        });
        console.log(this.tasks);
        this.saveTaskInLS();
    }
}
