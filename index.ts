import { main } from "./src";

main();

// TODO что еще сделать


/**
 * // При прослушке каналов есть ошибка 
 * [2024-02-29T09:05:46.229] [WARN] - [Connection closed while receiving data]
Error: Not connected
    at ConnectionTCPFull.recv (/Users/alex/Documents/Dev/tiProduction/node_modules/telegram/network/connection/Connection.js:71:15)
    at async MTProtoSender._recvLoop (/Users/alex/Documents/Dev/tiProduction/node_modules/telegram/network/MTProtoSender.js:362:24)
    // Погуглить либо заменить на прослушку через таймер
    // либо принудительно рвать коннект раз в 10 мин и перезапускать
 
    */

    // оценивать позитьивность/негативность поста
// Проверить какие события еще считывает слушатель,
// Можно ли считывать реакции с поста
// Антиспам в комменты
// Умный проверяльщие соответсвия JSON определенному типу
// ограничения:
// Наличие ссылок
// Наличие erid
// Длинный текст поста, потому что съест много токенов

// Если в тексте поста указан изначальный источник, то попробовать выдернуть его и сохранить, в дальнейшем для проверки информации
// В ночное время научиться отправлять замьюченные сообщения

// Вести лог отбракованных сообщений, может получать ссылки на них для удобства?
// Нужен логер
//  @banksta - убирать @название канала

// Получать количество свободных токенов из GPT
// Скоринг новости от ChatGPT и проверка правильности формата
// Подготовить список правил проверок

/** Ответ пришли в формате json {score: number, text: string | ''} оцени на сколько интересен пост от 1 до 10, если он интересен на 5+ то перефразируй его, если меньше 5, то в text запиши null. Пост - "Рекордное число россиян попросили убежище в Южной Корее в 2023 году. В 2023 году их было 5750, это более чем в пять раз больше, чем годом ранее, следует из данных корейской миграционной службы. Общее число просителей убежища с российским паспортом достигло 18 838. По этому показателю Россия с большим отрывом обогнала Казахстан, Китай, Малайзию и другие страны."  */

// тихие сообщения по ночам
// разные рубрики
// включать и отключать комменты под сообщениями разных типов для создания активности
// анализ схожести постов
// Определять тематику поста
// Смайлики