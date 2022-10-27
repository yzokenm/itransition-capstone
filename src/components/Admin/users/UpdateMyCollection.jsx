import { Button, Form, Modal } from "react-bootstrap";
import { ImCancelCircle } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";

export const UpdateMyCollection = ({
  showModal,
  handleCloseModal,
  singleCollection,
  setSingleCollection,
}) => {
  const token = window.localStorage.getItem("token");

  console.log("singleCollection", singleCollection);
  const updateSingleCollection = async (id) => {
    const response = await fetch(`${window.remote_url}/collections/${id}`, {
      method: "PUT",
      body: JSON.stringify({ ...singleCollection }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) {
      const updatedCollection = await response.json();
      //   setSingleCollection(updatedCollection)
      alert("Updated");
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header>
        <Modal.Title>
          <GrUpdate className="text-info" /> Update collection
        </Modal.Title>
        <ImCancelCircle
          onClick={handleCloseModal}
          className="ml-auto text-danger mt-2"
          style={{ fontSize: "25px" }}
        />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              className="rounded-pill"
              placeholder="Name"
              value={singleCollection.name}
              onChange={(e) =>
                setSingleCollection({
                  ...singleCollection,
                  name: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="textarea"
              className="rounded-pill"
              placeholder="Description"
              value={singleCollection.description}
              onChange={(e) =>
                setSingleCollection({
                  ...singleCollection,
                  description: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Topic</Form.Label>
            <Form.Control
              type="text"
              className="rounded-pill"
              placeholder="Topic"
              value={singleCollection.topic}
              onChange={(e) =>
                setSingleCollection({
                  ...singleCollection,
                  topic: e.target.value,
                })
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="rounded-pill"
          onClick={() => {
            updateSingleCollection(singleCollection._id);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};