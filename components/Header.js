import headerStyles from "../styles/Header.module.css";

const Header = () => {
  return (
    <>
      <h1 className={headerStyles.title}>{process.env.NEXT_PUBLIC_TITLE}</h1>
      <p className={headerStyles.description}>
        {process.env.NEXT_PUBLIC_DESCRIPTION}
      </p>
      <hr />
    </>
  );
};

export default Header;
