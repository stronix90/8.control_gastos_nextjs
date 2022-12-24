import React from 'react';
import UserWidget from "./user/UserWidget"

const Header = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="#!">
                    GastosApp
                </a>
                <UserWidget />
            </div>
        </nav>

    );
};

export default Header;