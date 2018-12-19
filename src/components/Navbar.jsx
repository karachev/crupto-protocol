import React from 'react';
import ReactDom from 'react-dom';
import { Navbar, NavbarBrand } from 'reactstrap';
import '../App.css';

export default class NavbarComponent extends React.PureComponent {

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">RC4 шифрование с распределением ключей по схеме Блома</NavbarBrand>
      </Navbar>
    );
  }
}