import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center p-4 gap-4">
      <Link to="/">Home</Link>
      <Link to="/tictactoe">Tic Tac Toe</Link>
    </nav>
  );
}