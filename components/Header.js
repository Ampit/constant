import headerStyles from "../styles/Header.module.css";

const Header = () => {
  return (
    <>
      <h1 className={headerStyles.title}>Constant</h1>
      <p className={headerStyles.description}>
        Stay consistent with everyday tasks
      </p>
    </>
  );
};

export default Header;
