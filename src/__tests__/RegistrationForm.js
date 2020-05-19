import React from 'react';
import { render, } from '@testing-library/react';
import RegistrationForm from '../components/registrationForm/registrationForm';

it('renders the username input field', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("E-Mail")).toBeInTheDocument();
});

it('renders the password input field', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("Passwort")).toBeInTheDocument();
});

it('renders the registration button', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("Registrieren")).toBeInTheDocument();
});

it('renders the icon upload button', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("Firmenlogo laden*")).toBeInTheDocument();
});

it('renders the password repeat input field', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("Passwort wiederholen")).toBeInTheDocument();
});

it('renders the IBAN input field', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("IBAN Firmenkonto")).toBeInTheDocument();
});

it('renders the firstname input field', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("Vorname Eigentümer*in")).toBeInTheDocument();
});

it('renders the surname input field', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("Nachname Eigentümer*in")).toBeInTheDocument();
});

it('renders the country input field', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("Land")).toBeInTheDocument();
});

it('renders the city input field', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("Stadt")).toBeInTheDocument();
});

it('renders the zip input field', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("Postleitzahl")).toBeInTheDocument();
});

it('renders the address input field', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("Adresse")).toBeInTheDocument();
});

it('renders the webpage input field', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("Webseite")).toBeInTheDocument();
});

it('renders the phone number input field', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("Telefonnummer")).toBeInTheDocument();
});

it('renders the company name input field', () => {
  const { getByText } = render(<RegistrationForm />);
  expect(getByText("Firmenname")).toBeInTheDocument();
});