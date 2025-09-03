import { useRef } from 'react';
import styles from './styles.module.css';

function TicketForm() {
  // const [preview, setPreview] = useState(null);
  // const [error, setError] = useState('');
  // const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // function validateFile(file) {
  //   if (!file) {
  //     return false;
  //   }
  //   if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
  //     setError('Only JPG or PNG files are allowed');
  //     setPreview(null);
  //     return false;
  //   }

  //   if (file.size > 500 * 1024) {
  //     setError('File too large. Please upload a photo under 500KB.');
  //     setPreview(null);
  //     return false;
  //   }
  //   setError('');
  //   setPreview(URL.createObjectURL(file));
  //   return true;
  // }

  return (
    <>
      <header className={styles.headerContainer}>
        <img
          src="../../../public/assets/images/logo-full.svg"
          alt="logo"
          className={styles.logoImg}
        />
      </header>
      <div className={styles.infoText}>
        <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
        <p>Secure your spot at next year's biggest coding conference.</p>
      </div>

      <form className={styles.formContainer}>
        <label>
          Upload Avatar
          <div className={styles.fileInputContainer}>
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              ref={fileInputRef}
              className={styles.inputFile}
            />
          </div>
        </label>
        <label>
          Full Name
          <input type="text" className={styles.inputField} />
        </label>
        <label>
          Email Address
          <input
            type="email"
            placeholder="example@email.com"
            className={styles.inputField}
          />
        </label>
        <label>
          GitHub Username
          <input
            type="text"
            placeholder="@yourusername"
            className={styles.inputField}
          />
        </label>
        <button className={styles.generateBtn}>Generate My Ticket</button>
      </form>
    </>
  );
}
export default TicketForm;
