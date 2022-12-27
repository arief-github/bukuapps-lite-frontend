import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import { Redirect } from 'react-router-dom';

const Navigation = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);


    const logOut = () => {
        sessionStorage.clear()
    }

    return (
        <Navbar color="primary" dark expand="lg">
            <NavbarBrand href="/user">User</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <NavItem>
                        <NavLink href="/user/book/all">Books</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/user/profile">Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/login" onClick={logOut}>Logout</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default Navigation;