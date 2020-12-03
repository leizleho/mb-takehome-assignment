import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sequence from './Sequence';

const renderApp = () => render(<Sequence />);

test('initial UI is rendered as expected', () => {
  const { getByText, getByTestId } = renderApp();
  expect(getByText('Sequence Table')).toBeInTheDocument();
  expect(getByTestId('sequence-rows').childNodes).toHaveLength(0);
});
