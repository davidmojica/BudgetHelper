import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Graph from './components/Graph';

export const Home = () => (
    
    <div>
        <h2>Budget Graph</h2>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Please input your desired average monthly expenses</Form.Label>
                <Form.Control type="number" min="0" placeholder="Monthly Budget" />
            </Form.Group>
            <Button variant="primary" type="submit" >Submit</Button>
        </Form>
    </div>
)

Graph(200);