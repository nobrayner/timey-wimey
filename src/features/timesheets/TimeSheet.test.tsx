import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import TimeSheet from './TimeSheet';

test('renders no data help text', () => {
  const { getByText } = render(
    <Provider store={store}>
      <TimeSheet />
    </Provider>
  )

  expect(getByText('Please click the "+ New Entry" button to add a time entry')).toBeInTheDocument()
})
