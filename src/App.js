import React from 'react';
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import SearchBox from "./component/searchBox"; // Ensure the correct import
import ArticlesDisplay from "./component/ArticlesDisplay"; // Ensure the correct import

function App() {

  const timePeriodMap = {
    1: "Day",
    7: "Week",
    30: "Month"
  };

  const timePeriod = timePeriodMap[parseInt(sessionStorage.getItem("timePeriod"))] || "";
  const searchParam = (sessionStorage.getItem("sortBy") || "").charAt(0).toUpperCase() + (sessionStorage.getItem("sortBy") || "").slice(1);
  const title = 'Most ' + searchParam + ' - ' + timePeriod || "Most Popular Articles";

  return (
    <Container>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <h1>{title}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <SearchBox/>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <ArticlesDisplay/>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
