import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Accordion, Card, Button } from 'react-bootstrap';
import {ReactComponent as Chevron} from 'bootstrap-icons/icons/chevron-double-right.svg';
import { isEmpty } from 'lodash';

export default function CharacterEpisodes(props) {

    const [isExpanded, setExpanded] = useState(props.isExpanded);

    const getEpisodeDetails = () => {

        let episodes = [];

        if (!isEmpty(props.episodes)) {
            props.episodes.forEach(e => {
                episodes.push(
                    <div className="col mb-4" key={e.uid}>
                        <Card>
                            <Card.Header>
                                {e.title}
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>UID: <span>{e.uid}</span></Card.Text>
                                <Card.Text>Series: <span>{e.series.title}</span></Card.Text>
                                <Card.Text>Season: <span>{e.seasonNumber}</span></Card.Text>
                                <Card.Text>Episode: <span>{e.episodeNumber}</span></Card.Text>
                                <Card.Text>Air Date: <span>{e.usAirDate}</span></Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <Button
                                    variant="light"
                                    id={e.uid}
                                    style={{ float:"right"}}
                                >
                                    <Link to={`/${props.characterId}/episode/${e.uid}`} >
                                        Episode Details
                                        <Chevron />
                                    </Link>
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>)
            })
        }

        return episodes;
    }

    return (
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} eventKey="2" variant="link" onClick={() => setExpanded(!isExpanded)}>
                    Appeared In {props.getChevron(isExpanded)}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
                <Card.Body>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
                        {getEpisodeDetails()}
                    </div>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}
