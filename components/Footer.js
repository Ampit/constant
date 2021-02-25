const Footer = () => {
  return (
    <footer className="footer bg-white pb-3 fixed-bottom">
      <hr className="mt-0" />
      <div className="row">
        <div className="col-sm-6 mx-auto text-center">
          {new Date().getFullYear()}&nbsp;&nbsp;
          {process.env.NEXT_PUBLIC_TITLE}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
