import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import {Container} from "react-bootstrap";
import {useSelector} from "react-redux";


export function App({
                      _Login = Login, _Home = Home, _Register = Register,
                      _useSelector = useSelector
                    }) {
  const isLoggedIn = _useSelector(state => state.isLoggedIn);
  const isRegister = _useSelector(state => state.isRegister);

  if (isLoggedIn) {
      return <Container>
          <_Home/>
      </Container>
  } else if (isRegister) {
      return <div style={{
          position: 'absolute', left: '50%', top: '30%',
          transform: 'translate(-50%, -50%)'
      }}>
          <_Register/>
      </div>
  } else {
      return <div style={{
          position: 'absolute', left: '50%', top: '30%',
          transform: 'translate(-50%, -50%)'
      }}>
          <_Login/>
      </div>
  }
}
export default App;