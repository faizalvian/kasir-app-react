import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";

import ListCategories from "../components/ListCategories";
import Keranjang from "../components/Keranjang";
import Menu from "../components/Menu";

import { API_URL } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

export default class Home extends Component {

  // buat constructor untuk inisialisasi
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoryYangDiPilih: "Makanan",
      keranjangs: [],
    };
  }

  // axios untuk get API produk
  componentDidMount() {
    axios
      .get(
        API_URL + "/products?category.nama=" + this.state.categoryYangDiPilih
      )
      .then((res) => {
        const menus = res.data;
        this.setState({ menus });
      });
    axios.get(API_URL + "/keranjangs").then((res) => {
      const keranjangs = res.data;
      this.setState({ keranjangs });
    });
  }

  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios.get(API_URL + "/keranjangs").then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      });
    }
  }

  // Method pindah menu
  changeCategory = (value) => {
    this.setState({
      categoryYangDiPilih: value,
      menus: [],
    });

    axios.get(API_URL + "/products?category.nama=" + value).then((res) => {
      const menus = res.data;
      this.setState({ menus });
    });
  };

  // Method simpan keranjang
  masukKeranjang = (value) => {
    axios.get(API_URL + "/keranjangs?product.id=" + value.id).then((res) => {
      // cek jika produk dalam keranjang belum ada
      if (res.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };
        axios.post(API_URL + "/keranjangs", keranjang).then((res) => {
        //   Swal.fire("Sip!", "Udah masuk keranjang.", "success");
        });
      } else {
        const keranjang = {
          jumlah: res.data[0].jumlah + 1,
          total_harga: res.data[0].total_harga + value.harga,
          product: value,
        };
        axios
          .put(API_URL + "/keranjangs/" + res.data[0].id, keranjang)
          .then((res) => {
            // Swal.fire("Sip!", "Udah masuk keranjang.", "success");
          });
      }
    });
  };

  render() {
    const { menus, categoryYangDiPilih, keranjangs } = this.state;
    return (
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories
                changeCategory={this.changeCategory}
                categoryYangDiPilih={categoryYangDiPilih}
              />
              <Col>
                <h4>
                  <strong> Daftar Produk </strong>
                </h4>
                <hr />
                <Row>
                  {/* mapping/looping data dari API */}
                  {menus &&
                    menus.map((menu) => (
                      <Menu
                        key={menu.id}
                        menu={menu}
                        masukKeranjang={this.masukKeranjang}
                      ></Menu>
                    ))}
                </Row>
              </Col>
              <Keranjang keranjangs={keranjangs} {...this.props}/>
            </Row>
          </Container>
        </div>
    );
  }
}
