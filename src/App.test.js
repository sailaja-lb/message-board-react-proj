import { render, screen } from '@testing-library/react';
import {App} from './App';


test('should display _Home when logged in', () => {
  const expectedHome = 'This is Homepage'
  const mockHome = () => <div>{expectedHome}</div>

  const state = {
    isLoggedIn: true
  }
  render(<App _Home={mockHome} _useDispatch={() => {}}
              _useSelector={fn => fn(state)}/>)
  expect(screen.getByText(expectedHome)).toBeInTheDocument()
});

test('should display _Register screen when isRegister is true', () => {
  const expectedRegister = 'This is Register Page'
  const mockRegister = () => <div>{expectedRegister}</div>

  const state = {
    isRegister: true
  }
  render(<App _Register={mockRegister} _useDispatch={() => {}}
              _useSelector={fn => fn(state)}/>)
  expect(screen.getByText(expectedRegister)).toBeInTheDocument()
});

test('should display the login screen when logged out', () => {
  const expectedText = 'This is the expected text'
  const mockLogin = () => <>{expectedText}</>

  const state = {
    isLoggedIn: false
  }
  render(<App _Login={mockLogin} _useDispatch={() => {}} _useSelector={fn => fn(state)}/>)
  expect(screen.getByText(expectedText)).toBeInTheDocument()
});

