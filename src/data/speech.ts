export type SpeechScene = {
  id: string
  lines: string[]
  gradient: string
}

export const speechScenes: SpeechScene[] = [
  {
    id: 'intro',
    lines: [
      'Before anything else,',
      'I wanted you to have a quiet place',
      'just for us.',
    ],
    gradient:
      'linear-gradient(160deg, #fdf8f2 0%, #f5e6dc 45%, #e8d5e8 100%)',
  },
  {
    id: 'memory',
    lines: [
      'Every small moment with you',
      'became something I kept',
      'like a photograph in my pocket.',
    ],
    gradient:
      'linear-gradient(155deg, #f8ebe3 0%, #edd4d8 50%, #dcc8e0 100%)',
  },
  {
    id: 'truth',
    lines: [
      'You are the person I choose',
      'in ordinary mornings',
      'and in every uncertain tomorrow.',
    ],
    gradient:
      'linear-gradient(150deg, #f0e0e8 0%, #e4c4cc 40%, #c9b4d4 100%)',
  },
  {
    id: 'promise',
    lines: [
      'I am not asking for perfection.',
      'I am asking for your hand,',
      'your laughter, and your heart.',
    ],
    gradient:
      'linear-gradient(145deg, #ead8e4 0%, #d4a8b4 45%, #b898b8 100%)',
  },
]
