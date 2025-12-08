import { Link } from "react-router-dom";

import { useDarkMode } from "../hooks/useDarkMode";

export default function Navbar() {

  const { theme, toggleTheme } = useDarkMode();

  return (
    <nav className="flex justify-between items-center p-4">

      <div className="flex items-center gap-4">

        <Link to="/">
          <i className="fa-solid fa-home"></i>
        </Link>
        <Link to="/tictactoe">Tic Tac Toe</Link>
      </div>

      <button className="cursor-pointer" onClick={toggleTheme}>
        <i className={theme == 'light' ? 'fa-solid fa-moon text-(--text)' : 'fa-solid fa-cloud-sun text-(--text)'}></i>
      </button>
    </nav>
  );
}