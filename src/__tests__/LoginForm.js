import React from 'react';
import { render } from '@testing-library/react';
import LoginForm from '../components/loginForm/loginForm';

it('renders the username input field', () => {
  const { getByText } = render(<LoginForm />);
  expect(getByText("E-Mail")).toBeInTheDocument();
});

it('renders the password input field', () => {
  const { getByText } = render(<LoginForm />);
  expect(getByText("Passwort")).toBeInTheDocument();
});

it('renders the login button', () => {
  const { getByText } = render(<LoginForm />);
  expect(getByText("Login")).toBeInTheDocument();
});

it('renders the registration button', () => {
  const { getByText } = render(<LoginForm />);
  expect(getByText("Registrieren")).toBeInTheDocument();
});
