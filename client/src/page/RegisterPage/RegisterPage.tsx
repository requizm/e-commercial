import { Header } from '../../component/Header/Header';
import { Register } from '../../component/Register/Register';
import './style/RegisterPage.scss';

export function RegisterPage() {
  return (
    <div className="App">
      <Header />
      <Register />
    </div>
  );
}
