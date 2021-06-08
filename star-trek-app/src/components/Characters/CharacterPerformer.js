import React, { useState } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap';
import { isEmpty } from 'lodash';

export default function CharacterPerformer(props) {

    const [isExpanded, setExpanded] = useState(props.isExpanded);

    const getPerformerDetails = () => {

        let performers = [];

        if (!isEmpty(props.performers)) {
            props.performers.forEach(p => {
                performers.push(
                    <div className="col mb-4" key={p.uid}>
                        <Card>
                            <Card.Header as="h4">
                                {p.name}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>UID: <span>{p.uid}</span></Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <Button
                                    variant="light"
                                    id={p.uid}
                                    style={{ float:"right"}}
                                >
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>)
            })
        }

        return performers;
    }

    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} eventKey="3" variant="link" onClick={() => setExpanded(!isExpanded)}>
                    Portrayed By {props.getChevron(isExpanded)}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
                <Card.Body>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                        {getPerformerDetails()}
                    </div>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}
