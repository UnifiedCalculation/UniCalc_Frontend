import React from 'react';
import { render, getByTestId } from '@testing-library/react';
import LoginForm from '../components/loginForm/loginForm';

it('renders the username input field', () => {
  const { getByText } = render(<LoginForm />);
  const element = getByText(/username/i);
  expect(element).toBeInTheDocument();
});

it('renders the password input field', () => {
  const { getByText } = render(<LoginForm />);
  const element = getByText(/password/i);
  expect(element).toBeInTheDocument();
});

it('renders the login button', () => {
  const { getByText } = render(<LoginForm />);
  const element = getByText(/login/i);
  expect(element).toBeInTheDocument();
});

it('renders the logout button', () => {
  const { getByText } = render(<LoginForm />);
  const element = getByText(/logout/i);
  expect(element).toBeInTheDocument();
});
