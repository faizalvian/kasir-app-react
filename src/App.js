import React, { Component } from 'react'
import NavbarComponent from "./components/NavbarComponent"
import { Col, Row, Container } from "react-bootstrap"
import ListCategories from "./components/ListCategories"
import Keranjang from "./components/Keranjang"
import {API_URL} from "./utils/constants"
import axios from 'axios'
import Menu from "./components/Menu"

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus:[],
    }
  }

  componentDidMount() {
    axios.get(API_URL+`/products`)
    .then(res => {
      const menus = res.data;
      this.setState({ menus });
    })
  }

  render() {
    const {menus} = this.state
    return (
      <div className="App">
      <NavbarComponent />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories />
            <Col>
              <h4>
                <strong> Daftar Produk </strong>
              </h4>
              <hr />
              <Row>
                {menus && menus.map((menu) => (
                  <Menu
                    key={menu.id}
                    menu={menu}>
                  </Menu>
                ))}
              </Row>
            </Col>
            <Keranjang />
          </Row>
        </Container>
      </div>
    </div>
    )
  }
}

