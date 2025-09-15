import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
  Container,
  Card,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [cart]);

  return (
    <Container className="mt-3">
      <Row>
        {/* Left Column: Cart Items */}
        <Col xs={12} md={8}>
          <ListGroup>
            {cart.map((prod) => (
              <ListGroup.Item key={prod.id}>
                <Row className="align-items-center">
                  <Col xs={12} sm={4} md={2} className="mb-2">
                    <Image src={prod.image} alt={prod.name} fluid rounded />
                  </Col>
                  <Col xs={12} sm={8} md={3}>
                    <span>{prod.name}</span>
                  </Col>
                  <Col xs={6} md={2}>₹ {prod.price}</Col>
                  <Col xs={6} md={2}>
                    <Rating rating={prod.ratings} />
                  </Col>
                  <Col xs={6} md={2}>
                    <Form.Control
                      as="select"
                      value={prod.qty}
                      onChange={(e) =>
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: {
                            id: prod.id,
                            qty: e.target.value,
                          },
                        })
                      }
                    >
                      {[...Array(prod.inStock).keys()].map((x) => (
                        <option key={x + 1}>{x + 1}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col xs={6} md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: prod,
                        })
                      }
                    >
                      <AiFillDelete fontSize="20px" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Right Column: Summary */}
        <Col xs={12} md={4} className="mt-3 mt-md-0">
          <Card className="p-3">
            <span className="title">
              Subtotal ({cart.length}) items
            </span>
            <span style={{ fontWeight: 700, fontSize: 20 }}>
              Total: ₹ {total}
            </span>
            <Button type="button" disabled={cart.length === 0} className="mt-3">
              Proceed to Checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
