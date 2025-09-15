import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CartState } from "../context/Context";
import SingleProducts from "./SingleProducts";
import Filter from "./Filter";
import "./Home.css";
import "./style.css";

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <Container fluid className="mt-3">
      <Row>
        {/* Filters Column */}
        <Col xs={12} md={3} lg={2} className="mb-3">
          <Filter />
        </Col>

        {/* Products Column */}
        <Col xs={12} md={9} lg={10}>
          <Row className="g-3">
            {transformProducts().map((prod) => (
              <Col key={prod.id} xs={12} sm={6} md={4} lg={3}>
                <SingleProducts prod={prod} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
