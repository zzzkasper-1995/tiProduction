
type PromptList = Record<string, {
    command: string
}>

const promptMap: PromptList = {
    'news': {
        command: 'найди 3 новости о последних событиях в мировой политике,перепиши текст самих новостей так что бы было интересно их читать, сделай их немного смешными но сохрани информационную составляющую в полном обьеме, добавь ссылки на исходные страницы в интернете из которых взята информация, оформи текст для публикации в телеграм канале, для каждой новости сделай заголовок минимум с одним смайликом отражающим суть новости'
    },
    'cuteCat': {
        command: 'Раскажи забавную историю про котика'
    }, 
    'newRetelling': {
        command: 'Немного переформулируй следующий пост: {post}'
    }
}

export {promptMap}