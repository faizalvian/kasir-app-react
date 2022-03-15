import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import ModalKeranjang from "./ModalKeranjang";
import TotalBayar from "./TotalBayar";

import { API_URL } from "../utils/constants";
import axios from "axios";
import Swal from "sweetalert2";

export default class Keranjang extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      keranjangDetails: false,
      jumlah: 0,
      keterangan: "",
      totHarga: 0,
    };
  }

  handleShow = (menuKeranjang) => {
    this.setState({
      showModal: true,
      keranjangDetails: menuKeranjang,
      jumlah: menuKeranjang.jumlah,
      keterangan: menuKeranjang.keterangan,
      totHarga: menuKeranjang.total_harga
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah+1,
      totHarga: this.state.keranjangDetails.product.harga*(this.state.jumlah+1)
    })
  }

  kurang = () => {
    if (this.state.jumlah !== 1) {
      this.setState({
        jumlah: this.state.jumlah-1,
        totHarga: this.state.keranjangDetails.product.harga*(this.state.jumlah - 1)
      })
    }
  }

  changeHandler = (event) => {
    this.setState({
      keterangan: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.handleClose()
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totHarga,
      product: this.state.keranjangDetails.product,
      keterangan: this.state.keterangan
    };
    axios.put(API_URL + "/keranjangs/"+this.state.keranjangDetails.id, data).then((res) => {
      Swal.fire("Sip!", "Pesanan diupdate.", "success");
    });
  }

  hapusPesanan = (id) => {
    this.handleClose()
    axios.delete(API_URL + "/keranjangs/"+id).then((res) => {
      Swal.fire("Sip!", "Pesanan " +this.state.keranjangDetails.product.nama+ " dihapus.", "error");
    });
  }

  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Keranjang</strong>
        </h4>
        <hr />
        {keranjangs.map !== 0 && (
          <ListGroup variant="flush">
            {keranjangs.map((menuKeranjang) => (
              <ListGroup.Item
                key={menuKeranjang.id}
                onClick={() => this.handleShow(menuKeranjang)}
                style={{cursor: 'pointer'}}
              >
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill bg="success">
                        {menuKeranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{menuKeranjang.product.nama}</h5>
                    Rp {menuKeranjang.product.harga.toLocaleString("id-ID")}
                  </Col>
                  <Col className="float-right">
                    <strong>
                      Rp {menuKeranjang.total_harga.toLocaleString("id-ID")}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan}/>
          </ListGroup>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props} />
      </Col>
    );
  }
}
