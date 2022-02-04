import { Language } from '../interfaces/language'
import englishImg from './../assets/images/260-united-kingdom.svg'
import greekImg from './../assets/images/170-greece.svg'

export const languages: Language[] = [
  {
    imageSrc: englishImg,
    path: 'en',
    id: 0,
    text: 'translations.english'
  },
  {
    imageSrc: greekImg,
    path: 'el',
    id: 1,
    text: 'translations.greek'
  }
]
