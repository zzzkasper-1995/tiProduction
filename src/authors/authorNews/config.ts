const config = {
  subscribedChannels: ["@banksta"], //, "@bankrollo", "@rtvimain", "@bbbreaking"
  targetChannel: "@secretTiprod",
};


type PromptList = Record<string, {
  command: string
}>

const promptMap: PromptList = {
  newsRetelling: {
      command: 'Переформулируй следующий пост если это у местно: {post}'
  },
  clearPost: {
      command: 'Убери из текста поста смайлики: {post}'
  },
  scoring: {
    command: `
        Текст поста: "{post}"
        Оцени на сколько интересен пост от 1 до 10 для гражданина России, результат запиши в поле interest.
        Если в тексте есть указание на источник, то запиши его в поле source.
        Оцени позитивность поста от 1 до 10 для гражданина России, запиши значение в поле positive.
        Оцени на сколько много личного мнения автора от 1 до 10, значение запиши в поле subjectivity.
        Определи имеет ли пост важность для гражданина России, ответ запиши в поле important.
        Попробуй придумать емкий заголовок для новости длиной не больше 6 слов, запиши его в поле title.
        Есть ли в посте есть призыв подписаться на канал, продвижение продуктов определнных организаций или людей, то в поле hasAds поставь true.
        Если в посте есть прямая цитата, то выдели слова и автора цитаты в поле quote.
        Ответ пришли в формате json с полями -
          interest: number,
          title: string,
          source: string | '',
          positive: number,
          important: boolean,
          subjectivity: number,
          hasAds: boolean,
          quote: string
      `
  },
} as const

export { config, promptMap };
