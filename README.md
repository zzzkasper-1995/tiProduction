# tiProduction


Для запуска программы потребуется установить:
- https://nodejs.org/en
- https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable

Плдтянуть зависимости
```
yarn
```


## Запуск программы

### Запуск бота 
Для запуска бота получите токен бота в botFather
и вставте его сюда 
```
// bot.ts
const bot = new Telegraf('Токен вашего бота');
```

Для запуска модуля бота

```
node ./bot.ts
```


### Запуск бота 
Для запуска модуля GPT нужно получить токен в openai
и вставте его сюда 
```
// gpt.ts
const openaiApiKey = 'Ваш токен'; 
```

Для запуска модуля GPT

```
node ./gpt.ts
```


### Запуск парсера постов 
Для запуска модуля парсера, нужно получить id приложения в телеграмм тут https://my.telegram.org/auth?to=apps
и вставте его сюда 
```
// parser.ts
const apiId = XXXXX; // замените на ваш api_id
const apiHash = 'замените на ваш api_hash';
```

Для запуска модуля парсера

```
node ./parser.ts
```


Какой канал парсить настраивается тут 
```
    const channel = '@lemonfortea';
```


