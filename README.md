# tiProduction


Для запуска программы потребуется установить:
- https://nodejs.org/en
- https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable

Плдтянуть зависимости
```
yarn
```

Так же для работы потребуется .env файл в котором прописаны токены
OPENAI_API_KEY=ВашКлючОтГпт
BOT_TOKEN=ВашТокенБота


## Запуск программы

```
yarn dev
```


### Настройка сообщений

Расписание настраивается тут src/configs/schedules.ts
Промты настраиваются тут src/configs/promptMap.ts

Целевой канал настраивается тут index.ts:17

