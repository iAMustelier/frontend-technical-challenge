import { Link } from 'react-router-dom';
import { ReactComponent as XrplLogo } from 'assets/xrpl-logo.svg';
import { SearchBar } from 'components/SearchBar';
import './NavBar.css';

export const NavBar = () => (
    <nav className="navbar">
        <div>
            <Link to="/" className="navbar-logo">
                <XrplLogo />
            </Link>
        </div>
        <div>
            <SearchBar
                placeholder="Search by Address, Ledger or Txn"
                className="navbar-searchbar"
            />
        </div>
        <div />
    </nav>
);
