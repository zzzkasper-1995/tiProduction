type Schedules = Record<string, string>;

/** Каждый день в указанное время будет выполняться
 * отправка сообщения с указанным содержимым */
const schedules: Schedules = {
  "16:40": "news",
  // '16:37': 'cuteCat'
};

export { schedules };
