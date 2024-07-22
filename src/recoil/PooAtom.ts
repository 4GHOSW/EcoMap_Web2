import { atom } from 'recoil'

export interface Poo {
  name: string
  etc: string
}

export const PooAtom = atom<Poo>({
  key: 'poo',
  default: {
    name: 'poo',
    etc: '',
  },
})
