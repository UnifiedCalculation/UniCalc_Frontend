import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import LoginForm from '../components/loginForm/loginForm.';

it('renders the username input field', () => {
  const { getByText } = render(<LoginForm />);
  const element = getByText(/username/i);
  expect(element).toBeInTheDocument();
});

