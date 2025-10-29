export type ChatsListMockType = {
  name: string;
  last: string;
  newCount?: string;
};

export const chatsListMock: ChatsListMockType[] = [
  { name: 'Марьяна', last: 'Примерно так' },
  { name: 'Валерьяна', last: 'Изображение', newCount: '5' },
  { name: 'Кабачок', last: 'Пакеда!' },
  { name: 'Сергей Петрович', last: 'Допустим, если пол...' },
  { name: 'Coyote Ugly', last: 'Изображение', newCount: '1' },
];

export type ChatMockType = {
  date: string,
  chat: { member: number, messages:
  { time: string; text?: string; image?: string; }[]
  }[]
};
export const chatMock: ChatMockType[] = [
  { date: '30.08.2025',
    chat: [
      { member: 1,
        messages: [
          { time: '10:20', text: 'Это просто текст, он ни о чем. Здесь нет глубокого смысла ' +
                        'и скрытых идей. Просто слова, расположенные в ' +
                        'определённом порядке, чтобы заполнить пространство ' +
                        'и показать, как выглядит шрифт в этом макете. И всё ' +
                        'Это текст-пустышка, созданный для того, чтобы ваш ' +
                        'глаз привык к шрифту, размеру и отступам.' },
          { time: '11:01', text: 'Никакого смысла, только красота дизайна.' },
          { time: '11:01', image: '/images/mock/message.jpg' },
        ],
      },
      { member: 2,
        messages: [
          { time: '11:05', text: 'Просто набор символов, чтобы вы оценили дизайн.' },
          { time: '11:21', text: 'Ещё один бессмысленный абзац, просто для заполнения места, ' +
                      'не несущий совсершенно никакой смысловой нагрузки.' },
        ],
      },
      { member: 1,
        messages: [
          { time: '11:38', text: 'Ну и просто заключительный ответ' },
        ],
      },
    ],
  }];
