import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalKeranjang = ({
  showModal,
  handleClose,
  keranjangDetails,
  jumlah,
  keterangan,
  tambah,
  kurang,
  changeHandler,
  handleSubmit
}) => {
  if (keranjangDetails) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {keranjangDetails.product.nama}{" "}
            <strong>
              (Rp. {keranjangDetails.product.harga.toLocaleString("id-ID")})
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1" className="mb-3">
              <Form.Label>Total Harga: </Form.Label>
              <p>
                <strong>
                  Rp. {keranjangDetails.total_harga.toLocaleString("id-ID")}
                </strong>
              </p>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlInput1" className="mb-3">
              <Form.Label>Jumlah :</Form.Label>
              <br />
              <Button
                variant="primary"
                size="sm"
                className="mr-2"
                onClick={() => kurang()}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>{" "}
              <strong>{jumlah}</strong>{" "}
              <Button
                variant="primary"
                size="sm"
                className="ml-2"
                onClick={() => tambah()}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Keterangan :</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Pedas"
                value={keterangan}
                onChange={(event) => changeHandler(event)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            <FontAwesomeIcon icon={faTrash} /> Hapus Pesanan
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Simpan Perubahan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default ModalKeranjang;
