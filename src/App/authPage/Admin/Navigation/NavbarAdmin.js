import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

const Navigation = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    const logOut = () => {
        sessionStorage.clear()
    }

    return (
        <Navbar color="success" dark expand="lg">
            <NavbarBrand href="/admin">Admin</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/admin/user/all">Users</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/admin/book/all">Books</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/" onClick={logOut}>Logout</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default Navigation;