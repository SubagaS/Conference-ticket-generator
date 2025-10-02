import { useState, useRef } from 'react';
import type { ChangeEvent, DragEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
const MAX_FILE_SIZE = 500 * 1024; // 500 KB

function TicketForm() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null); //file holds the actual File pobject selected ny the user, setFile is the function to update file.
  const [preview, setPreview] = useState<string | null>(null); // preview holds a base64 string(data URL) used as the src for img.
  const [error, setError] = useState<string>(''); //error holds a error message.
  const [fullName, setFullName] = useState<string>('');
  const [fullNameError, setFullNameError] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const [github, setGithub] = useState<string>('');
  const [githubError, setGithubError] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null); // creates a ref to store an <input type='file'/> DOM element.

  const validateFile = (selectedFile: File) => {
    // function that checks the file type and size
    const validTypes = ['image/jpeg', 'image/png']; // MIME type : It is a two part identifier like image/jpeg or text/html, that specifies the type and format of data being transmitted between server and browser.

    if (!validTypes.includes(selectedFile.type)) {
      setError('Only .jpg, .jpeg, .png files are allowed');
      resetFile();
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File size must be less than 500 KB');
      resetFile();
      return false;
    }
    setError('');
    return true;
  };

  const processFile = (selectedFile: File) => {
    if (!validateFile(selectedFile)) return; // first validates the file, if invalid it exits.

    setFile(selectedFile); // stores the File object in a state.

    const reader = new FileReader(); // FileReader is a browser API that is used to read file contents.
    reader.onloadend = () => {
      setPreview(reader.result as string); // When reading finishes, reader.result contains the file contents as a data URL, 'as string' is being used here to tell TS that we expect a string here.
    };
    reader.readAsDataURL(selectedFile); //Starts reading the file and converts it to base64 data URL to preview.
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //Handler for the file imput onChange
    const selectedFile = e.target.files?.[0]; //e.target.files is a fileList. '?.[0]' is optional chaining, if a file exists, take the first file
    if (selectedFile) processFile(selectedFile); //If there is a file , pass it to processFile.
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0]; //gets the first dropped file.
    if (droppedFile) {
      processFile(droppedFile);
    } //If there is a file , pass it to processFile.
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault(); //Lets the drop event happen.
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let formContainsError = false;

    if (!file) {
      setError('Please select a valid file before submitting.');
      formContainsError = true;
    }
    if (fullName.length === 0) {
      setFullNameError('Please enter this field.');
      formContainsError = true;
    }

    if (!email.includes('@') || !email.includes('.') || email === '') {
      setEmailError('Please enter a valid email.');
      formContainsError = true;
    }
    if (github === '') {
      setGithubError('GitHub username cannot be empty.');
      formContainsError = true;
    }

    try {
      const res = await fetch(`https://api.github.com/users/${github}`);

      if (res.status === 404) {
        setGithubError('This GitHub username does not exist.');
        return;
      }
      if (!res.ok) {
        setGithubError('Could not verify GitHub username. Try again later.');
        return;
      }
    } catch (err) {
      setGithubError('Network error while checking GitHub.');
      formContainsError = true;
    }

    if (!formContainsError) {
      navigate('/ticketGenerated', {
        state: { fullName, email, github, preview },
      });
    }
  };

  const resetFile = () => {
    //Clears file and preview state
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; //Clearing the input value allows re-selecting the same file and ensures onChange fires.
    }
  };

  const handleChangeClick = () => {
    fileInputRef.current?.click(); //opens the file picker for the user. '?.' is the optional chaining: the call is only attempted when the ref is non-null
  };
  const handleFullName = (e: ChangeEvent<HTMLInputElement>): void => {
    setFullName(e.target.value);
    setFullNameError('');
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    setEmailError('');
  };
  const handleGithubUser = (e: ChangeEvent<HTMLInputElement>): void => {
    setGithub(e.target.value);
    setGithubError('');
  };

  return (
    <>
      <header className={styles.headerContainer}>
        <img
          src={`${import.meta.env.BASE_URL}/assets/images/logo-full.svg`}
          alt="logo"
          className={styles.logoImg}
        />
      </header>
      <div className={styles.infoText}>
        <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
        <p>Secure your spot at next year's biggest coding conference.</p>
      </div>

      <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
        <label>
          Upload Avatar
          <input
            type="file"
            id="img-upload"
            accept=".jpg, .jpeg, .png"
            ref={fileInputRef}
            onChange={handleFileChange}
            className={styles.inputFile}
          />
          {!preview && (
            <label
              htmlFor="img-upload"
              className={styles.fileUploadImgInputContainer}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <button
                type="button"
                className={styles.uploadBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <img
                  src={`${
                    import.meta.env.BASE_URL
                  }/assets/images/icon-upload.svg`}
                  alt="upload-icon"
                />
              </button>
              <p>Drag and drop or click to upload</p>
            </label>
          )}
          {preview && (
            <div className={styles.fileInputContainer}>
              <img
                src={preview}
                alt="Selected file preview"
                style={{ width: '50px', height: '50px', marginTop: '8px' }}
              />
              <br />
              <button type="button" onClick={handleChangeClick}>
                Change Image
              </button>
              <button type="button" onClick={resetFile}>
                Remove Image
              </button>
            </div>
          )}
          {error && <p className={styles.errorMessage}>{error}</p>}
          <p className={styles.uploadPhotoMsg}>
            <img
              src={`${import.meta.env.BASE_URL}/assets/images/icon-info.svg`}
              alt="info-icon"
              className={styles.infoIcon}
            />
            Upload your photo (JPG or PNG, max size: 500KB).
          </p>
        </label>

        <label>
          Full Name
          <input
            type="text"
            placeholder="Fullname"
            className={styles.inputField}
            value={fullName}
            onChange={handleFullName}
          />
          {fullNameError && (
            <p className={styles.errorMessage}>{fullNameError}</p>
          )}
        </label>

        <label>
          Email Address
          <input
            type="email"
            placeholder="example@email.com"
            className={styles.inputField}
            value={email}
            onChange={handleEmail}
          />
          {emailError && <p className={styles.errorMessage}>{emailError}</p>}
        </label>

        <label>
          GitHub Username
          <input
            type="text"
            placeholder="Username"
            className={styles.inputField}
            onChange={handleGithubUser}
          />
          {githubError && <p className={styles.errorMessage}>{githubError}</p>}
        </label>
        <button className={styles.generateBtn} type="submit">
          Generate My Ticket
        </button>
      </form>
    </>
  );
}
export default TicketForm;
