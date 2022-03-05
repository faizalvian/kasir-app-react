import React from "react";
import {Card, Col} from "react-bootstrap";

const Menu = ({menu, masukKeranjang}) => {
  return (
      <Col md={4} xs={6} className="mb-3">  
        <Card className="shadow" onClick={() => masukKeranjang(menu)} style={{cursor:'pointer'}}>
        <Card.Img variant="top" src={"assets/images/"+menu.gambar} />
        <Card.Body>
            <Card.Title>{menu.nama}</Card.Title>
            <Card.Text>
            Rp {menu.harga.toLocaleString("id-ID")}
            </Card.Text>
        </Card.Body>
        </Card>
      </Col>
  );
};

export default Menu;
