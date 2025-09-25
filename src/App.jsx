import './css/App.css'
import { GlobalProvider } from './component/GlobalContext';
import Navigation from './component/Navigation';

const App = () => {
  return (
    <GlobalProvider>
      <Navigation />
    </GlobalProvider>
  );
};
export default App;
