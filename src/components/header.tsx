import Logo from "assets/logo.svg";
const Header = () => {
  return (
    <header className="w-full bg-slate-600 px-3 py-7">
      <img src={Logo} alt="logo-website" className="h-14" />
    </header>
  );
};

export default Header;
