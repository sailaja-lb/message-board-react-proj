import { render, screen } from '@testing-library/react';
import {App} from './App';


it('should display _Home when isLoggedIn is true', () => {
  const expectedHome = 'This is Homepage'
  const mockHome = () => <div>{expectedHome}</div>

  const state = {
    isLoggedIn: true
  }
  render(<App _Home={mockHome} _useSelector={fn => fn(state)}/>)
  expect(screen.getByText(expectedHome)).toBeInTheDocument()
});

it('should display _Register screen when isRegister is true', () => {
  const expectedRegister = 'This is Register Page'
  const mockRegister = () => <div>{expectedRegister}</div>

  const state = {
    isRegister: true
  }
  render(<App _Register={mockRegister} _useSelector={fn => fn(state)}/>)
  expect(screen.getByText(expectedRegister)).toBeInTheDocument()
});

it('should display the login screen when logged out(isLoggedIn is false)', () => {
  const expectedText = 'This is the expected text'
  const mockLogin = () => <>{expectedText}</>

  const state = {
    isLoggedIn: false
  }
  render(<App _Login={mockLogin} _useSelector={fn => fn(state)}/>)
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

