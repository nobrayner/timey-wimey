import React from 'react'
import { store } from '../store'
import { Provider } from 'react-redux'
import { render as rtlRender, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../app'

function render(ui: React.ReactElement) {
  const Wrapper: React.FunctionComponent<{}> = ({ children }) => (<Provider store={store}>{children}</Provider>)
  return rtlRender(ui, { wrapper: Wrapper })
}

describe('Timey Wimey', () => {
  it('displays the current date as a heading, help text, and a new button when there are no entries', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: new Date().toLocaleDateString() })).toBeInTheDocument()
    expect(screen.getByTestId('helptext')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /\+ new card/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /\+ new card/i })).not.toBeDisabled()
  })
})