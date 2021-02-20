import headerStyles from "../styles/Header.module.css";

const Header = () => {
  return (
    <div>
      <h1 className={headerStyles.title}>Constant</h1>
      <p className={headerStyles.description}>
        Stay consistent with everyday tasks
      </p>
    </div>
  );
};

export default Header;
