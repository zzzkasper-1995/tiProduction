type TaskCallback = () => void;

class ScheduleService {
  private static instance: ScheduleService;
  private tasks: Map<string, NodeJS.Timeout>;

  private constructor() {
    this.tasks = new Map<string, NodeJS.Timeout>();
  }

  public static getInstance(): ScheduleService {
    if (!ScheduleService.instance) {
      ScheduleService.instance = new ScheduleService();
    }

    return ScheduleService.instance;
  }

  public scheduleTask(
    taskId: string,
    time: string,
    callback: TaskCallback,
  ): void {
    if (this.tasks.has(taskId)) {
      console.log(`Task with ID ${taskId} is already scheduled.`);

      return;
    }

    const executeTask = () => {
      const now = new Date();
      const [hour, minute] = time.split(":").map(Number);
      const nextExecution = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hour,
        minute,
      );

      if (nextExecution <= now) {
        // Если текущее время больше указанного, то задача будет запланирована на следующий день
        nextExecution.setDate(nextExecution.getDate() + 1);
      }

      const delay = nextExecution.getTime() - now.getTime();
      const timeoutId = setTimeout(() => {
        callback();

        // Планируем эту же задачу на следующий день
        this.tasks.delete(taskId);
        this.scheduleTask(taskId, time, callback);
      }, delay);

      this.tasks.set(taskId, timeoutId);
      console.log(`Task ${taskId} scheduled for ${nextExecution}`);
    };

    executeTask();
  }

  public cancelTask(taskId: string): void {
    const timeoutId = this.tasks.get(taskId);

    if (timeoutId) {
      clearTimeout(timeoutId);
      this.tasks.delete(taskId);
      console.log(`Task ${taskId} cancelled.`);
    } else {
      console.log(`Task ${taskId} not found.`);
    }
  }
}

/** Example
    // Пробегаем по расписанию заданному расписанию
    Object.keys(schedules).forEach((time) => {
        const promptName = schedules[time]

        // Через сервис планирования, выставляем задачу на формирование новости в определенное время
        ScheduleService.getInstance().scheduleTask('scheduleTime_' + time, time, async () => {
            console.log('\nTASK RUN', time, promptName)
            
            // ...
        })
    })
*/

export { ScheduleService };
