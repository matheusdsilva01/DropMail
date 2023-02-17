import Logo from "assets/logo.svg";
const Header = () => {
  const activeNotifications = () => {
    if (window.Notification.permission !== "granted")
      window.Notification.requestPermission(permission => {
        if (permission === "granted") {
          console.log("Notification accept");
        }
      });
  };
  return (
    <header className="w-full bg-slate-600 px-3 py-7 flex justify-between">
      <img src={Logo} alt="logo-website" className="h-14" />
      <button
        className="rounded-md border-black text-white border px-2 hover:shadow-lg hover:bg-slate-700 transition-all"
        onClick={activeNotifications}
        disabled={window.Notification.permission === "granted"}
      >
        Receber notificações
      </button>
    </header>
  );
};

export default Header;
