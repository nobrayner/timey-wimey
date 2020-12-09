import React from 'react'
import { createStore, EnhancedStore } from "@reduxjs/toolkit"
import { render as rtlRender, RenderOptions as RTLRenderOptions, screen } from '@testing-library/react'
import { Provider } from "react-redux"
import { RootState, reducer } from "./store"
import { build, fake, perBuild, sequence } from '@jackfranklin/test-data-bot'
import { TimeCard } from './types'

interface RenderOptions extends RTLRenderOptions {
  initialState?: RootState
  store?: EnhancedStore
}
export function render(ui: React.ReactElement, {initialState, store = createStore(reducer, initialState), ...rtlOptions}: RenderOptions = {}) {
  const Wrapper: React.FunctionComponent<{}> = ({ children }) => (<Provider store={store}>{children}</Provider>)
  return rtlRender(ui, { wrapper: Wrapper })
}

export { screen } from '@testing-library/react'

export const timeCardBuilder = build<TimeCard>('TimeCard', {
  fields: {
    id: sequence(),
    start: fake(f => f.date.recent(1)),
    end: fake(f => f.date.recent(1)),
    ticket: fake(f => `${f.lorem.word()}-${f.random.number()}`),
    details: fake(f => f.lorem.words()),
  },
  traits: {
    noend: {
      overrides: { end: perBuild(() => undefined) }
    }
  }
})