import styles from './styles.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

interface FormData {
  fullName: string;
  email: string;
  github: string;
  preview: string;
}

function TicketGenerated() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state as FormData | null;

  if (!data) {
    navigate('/');
    return null;
  }
  return (
    <>
      <header className={styles.headerContainer}>
        <img
          src="../../../public/assets/images/logo-full.svg"
          alt="logo"
          className={styles.logoImg}
        />
      </header>
      <div className={styles.formTextInfo}>
        <h1>Congrats, {data.fullName}! Your ticket is ready.</h1>
        <p>
          We've emailed your ticket to {data.email} and will send updates in the
          run up to the event.
        </p>
      </div>
      <div>
        <img
          src="../../../public/assets/images/logo-mark.svg"
          alt="logo-mark"
        />
        <div>
          <h2>Coding Conf</h2>
        </div>
      </div>
      <img
        src="../../../public/assets/images/pattern-ticket.svg"
        alt="ticket"
      />
    </>
  );
}
export default TicketGenerated;
