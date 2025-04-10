import { useNavigate } from "react-router-dom";

const Header = () => {
  //
 const navigate = useNavigate();

 const handleClick = () => {
  /*IsLoggedIn to be able to make headerLogo
    render the page I want depending och logged
    in or not*/
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const destination = isLoggedIn ? "/dashboard" : "/";
  navigate(destination);
 }

  return (
    <header className="bg-gradient-to-b from-[#b97989] to-[#f3ece7] p-7 text-center shadow-xl">
      <h1 className="text-7xl font-bold tracking-wide text-[#562f39] drop-shadow-lg font-[Studydesk]">
        <button
          onClick={handleClick}
          className="transition-all duration-300 hover:text-[#8f5060] hover:scale-105 inline-block">
          FrienDate
        </button>
      </h1>
    </header>
  );
};

export default Header;
