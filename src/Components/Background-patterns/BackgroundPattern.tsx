import styles from './styles.module.css';

function Backgroundpattern() {
  return (
    <>
      <img
        src={`${import.meta.env.BASE_URL}/assets/images/pattern-circle.svg`}
        alt="pattern-circle"
        className={styles.patternCircle}
      />
      <img
        src={`${import.meta.env.BASE_URL}/assets/images/pattern-circle.svg`}
        alt="pattern-circle"
        className={styles.patternCircleNearForm}
      />
      <img
        src={`${import.meta.env.BASE_URL}/assets/images/pattern-lines.svg`}
        alt="pattern-lines"
        className={styles.patternLines}
      />
      <img
        src={`${
          import.meta.env.BASE_URL
        }/assets/images/pattern-squiggly-line-top.svg`}
        alt="line-top"
        className={styles.lineTop}
      />
      <img
        src={`${import.meta.env.BASE_URL}/assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg`}
        alt="line-bottom"
        className={styles.lineBottom}
      />
      <img
        src={`${import.meta.env.BASE_URL}/assets/images/pattern-squiggly-line-bottom-desktop.svg`}
        alt="line-bottom"
        className={styles.lineBottomDesktop}
      />
    </>
  );
}
export default Backgroundpattern;
