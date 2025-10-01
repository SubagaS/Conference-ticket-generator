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
      <div className={styles.formEmailInfo}>
        <h1>
          Congrats, <span className={styles.fullNameSpan}>{data.fullName}</span>
          ! Your ticket is ready.
        </h1>
        <p>
          We've emailed your ticket to <span className={styles.emailID}>{data.email}</span> and will send updates in the
          run up to the event.
        </p>
      </div>
      <div className={styles.ticketBgContainer}>
        <p className={styles.ticketId}>#01609</p>
        <div className={styles.datePlaceContainer}>
          <img
            src="../../../public/assets/images/logo-mark.svg"
            alt="logo-mark"
            className={styles.logoMark}
          />
          <div className={styles.datePlace}>
            <h2>Coding Conf</h2>
            <p>Jan 31, 2025 / Austin, TX</p>
          </div>
        </div>
        <div className={styles.formDetails}>
          <img
            src={data.preview}
            alt="avatar-img"
            className={styles.formAvatar}
          />
          <div className={styles.formDetailsText}>
            <h2>{data.fullName}</h2>
            <div className={styles.githubDetails}>
              <img
                src="../../../public/assets/images/icon-github.svg"
                alt="github-icon"
              />
              <p>{data.github}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TicketGenerated;
