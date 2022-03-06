import React, { Component } from "react";
import { Badge, Col, ListGroup, Row } from "react-bootstrap";
import TotalBayar from "./TotalBayar";

export default class Keranjang extends Component {
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
            {keranjangs.map((menuKeranjang) =>(
            <ListGroup.Item key={menuKeranjang.id}>
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
                <strong>Rp {menuKeranjang.total_harga.toLocaleString("id-ID")}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        <TotalBayar keranjangs={keranjangs} {...this.props}/>
      </Col>
    );
  }
}
