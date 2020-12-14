import React from 'react'
import { createStore, EnhancedStore } from "@reduxjs/toolkit"
import { render as rtlRender, RenderOptions as RTLRenderOptions } from '@testing-library/react'
import { Provider } from "react-redux"
import { RootState, reducer } from "./store"
import { build, fake, perBuild, sequence } from '@jackfranklin/test-data-bot'
import { TimeCard } from './types'

interface RenderOptions extends Omit<RTLRenderOptions, 'wrapper'> {
  initialState?: RootState
  store?: EnhancedStore
}
export function render(ui: React.ReactElement, { initialState, store = createStore(reducer, initialState), ...rtlOptions }: RenderOptions = {}) {
  const Wrapper: React.FunctionComponent<{}> = ({ children }) => (<Provider store={store}>{children}</Provider>)
  return rtlRender(ui, { wrapper: Wrapper, ...rtlOptions })
}

export { screen } from '@testing-library/react'

const randomTicketID = () => fake(f => `${f.lorem.word()}-${f.random.number()}`)

export const timeCardBuilder = build<TimeCard>('TimeCard', {
  fields: {
    id: sequence(),
    start: fake(f => f.date.recent(1)),
    end: fake(f => f.date.recent(1)),
    ticket: randomTicketID(),
    details: fake(f => f.lorem.words()),
  },
  traits: {
    noend: {
      overrides: { end: perBuild(() => undefined) }
    }
  },
})
export const newTimeCardDetailsBuilder = build<{ start: string, end: string, ticket: string, details: string }>('TimeCard', {
  fields: {
    start: fake(f => `${f.random.number(23).toString().padStart(2, '0')}:${f.random.number(59).toString().padStart(2, '0')}`),
    end: fake(f => `${f.random.number(23).toString().padStart(2, '0')}:${f.random.number(59).toString().padStart(2, '0')}`),
    ticket: randomTicketID(),
    details: fake(f => f.lorem.words()),
  },
  postBuild: (timeCard) => {
    const startHours = Number(timeCard.start.split(':')[0])
    const endMinutes = timeCard.end.split(':')[1]
    timeCard.end = `${startHours + (Math.random() * (23 - startHours) | 0)}:${endMinutes}`
    return timeCard
  }
})