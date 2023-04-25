import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
export default function Success() {
  return (
    <div>
        <Container className="small-container">
            <Card>
                <Card.Body>
                    <h2>Order is placed</h2>
                </Card.Body>
                <Card.Body>
                    <h2>Thank you for shopping</h2>
                </Card.Body>
            </Card>
        </Container>
    </div>
  );
}
