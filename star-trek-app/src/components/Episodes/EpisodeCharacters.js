import React, { useState } from 'react'
import { Accordion, Card, Button } from 'react-bootstrap';
import {ReactComponent as Chevron} from 'bootstrap-icons/icons/chevron-double-right.svg';
import {Link} from 'react-router-dom';
import { isEmpty } from 'lodash';

export default function EpisodeCharacters(props) {

    const [isExpanded, setExpanded] = useState(false);

    const getBirthDay = (year, month, day) => {
        if (!year && !month && !day) {
            return 'UNKNOWN'
        } else {
            return new Date(year, month - 1, day).toDateString();
        }
    }

    const setCharacterCards = () => {
        let characters = [];

        if(!isEmpty(props.characters)) {
            props.characters.forEach(character => {
                characters.push(
                    <div className="col mb-4" key={character.uid}>
                        <Card>
                            <Card.Header>{character.name}</Card.Header>
                            <Card.Body>
                            <Card.Text>
                                UID: <span> {character.uid} </span>
                            </Card.Text>
                            <Card.Text>
                                DOB: <span> {getBirthDay(character.yearOfBirth, character.monthOfBirth, character.dayOfBirth)}</span>
                            </Card.Text>
                            <Card.Text>
                                Marital Status: <span> {character.maritalStatus}</span>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                variant="light"
                                id={character.uid}
                                style={{ float: "right" }}
                            >
                                <Link
                                    to={`/character/${character.uid}`}
                                >
                                    Character Profile
                                        <Chevron />
                                </Link>
                            </Button>
                        </Card.Footer>
                        </Card>
                    </div>
                )
            })
        }

        return characters;
    }
    
    return (
        <div>
            <Card>
                <Card.Header>
                    <Accordion.Toggle
                        as={Button}
                        eventKey="5"
                        variant="link"
                        onClick={() => setExpanded(!isExpanded)}
                    >
                        Episode Characters {props.getChevron(isExpanded)}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="5">
                    <Card.Body>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                            {setCharacterCards()}
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </div>
    )
}