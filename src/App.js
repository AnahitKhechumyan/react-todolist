 import { Main } from './components/Main.js';
import { Footer } from './components/Footer.js';
import './App.css';

function App() {
  const date = Date().toString();
  
  return(
    <div className="ui container">
        <h1>TO DO</h1>
        <Main />
        <Footer timing={date}/>  
    </div>
  );
}

export default App;
