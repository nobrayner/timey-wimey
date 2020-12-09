import React from 'react'
import { createStore, EnhancedStore } from "@reduxjs/toolkit"
import { render as rtlRender, RenderOptions as RTLRenderOptions, screen } from '@testing-library/react'
import { Provider } from "react-redux"
import { RootState, reducer } from "./store"

interface RenderOptions extends RTLRenderOptions {
  initialState?: RootState
  store?: EnhancedStore
}
export function render(ui: React.ReactElement, {initialState, store = createStore(reducer, initialState), ...rtlOptions}: RenderOptions = {}) {
  const Wrapper: React.FunctionComponent<{}> = ({ children }) => (<Provider store={store}>{children}</Provider>)
  return rtlRender(ui, { wrapper: Wrapper })
}

export { screen } from '@testing-library/react'