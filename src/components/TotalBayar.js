import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { API_URL } from "../utils/constants";

export default class TotalBayar extends Component {
  submitTotalBayar = (TotalBayar) => {
    const pesanan = {
      total_bayar: TotalBayar,
      menus: this.props.keranjangs,
    };
    axios.post(API_URL + "/pesanans", pesanan).then((res) => {
      this.props.history.push("/sukses")
    });
  };

  render() {
    const TotalBayar = this.props.keranjangs.reduce(function (result, item) {
      return result + item.total_harga;
    }, 0);
    return (
      <div className="fixed-bottom">
        <Row>
          <Col md={{ span: 3, offset: 9 }}>
            <h4>
              Total Harga :
              <strong className="float-right mr-3">
                Rp. {TotalBayar.toLocaleString("id-ID")}
              </strong>
            </h4>
            <Button
              variant="primary"
              className="mb-3 mt-3 mr-3"
              size="lg"
              style={{ width: "95%" }}
              onClick={() => this.submitTotalBayar(TotalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>Bayar</strong>
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
