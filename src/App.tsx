import TicketForm from './Pages/TicketGeneratorForm/TicketForm';
import TicketGenerated from './Pages/TicketGenerated/TicketGenerated';
import Backgroundpattern from './Components/Background-patterns/BackgroundPattern';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TicketForm />} />
        <Route path="/ticketGenerated" element={<TicketGenerated />} />
      </Routes>

      <Backgroundpattern />
      <div className="attribution">
        Challenge by{' '}
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/SubagaS"> Subaga Sreepathy</a>.
      </div>
    </>
  );
}

export default App;
