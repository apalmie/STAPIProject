import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { ReactComponent as ChevronBack } from 'bootstrap-icons/icons/chevron-double-left.svg';
import { ReactComponent as ChevronDown } from 'bootstrap-icons/icons/chevron-down.svg';
import { ReactComponent as ChevronRight } from 'bootstrap-icons/icons/chevron-right.svg';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Accordion, Card } from 'react-bootstrap';
import EpisodeCharacters from './EpisodeCharacters';
import https from 'https';

export default function EpisodeData() {

    const baseURL = 'http://stapi.co/api/v1/rest';
    const [episodeDetails, setEpisodeDetails] = useState({});
    const [isExpanded, setExpanded] = useState(false);
    const {charId, uid } = useParams();

    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    useEffect(() => {
        console.log(`${baseURL}/episode?uid=${uid}`, { agent });
        fetch(`${baseURL}/episode?uid=${uid}`)
            .then(resp => resp.json())
            .then(e => {
                console.log(e);
                setEpisodeDetails(e.episode);
            })
            .catch(() => 'Error')
    }, [uid])

    const getChevron = (expanded) => {

        return expanded ? <ChevronRight /> : <ChevronDown />
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Returning to Search will clear previous values
        </Tooltip>
      );

    return (
        <div>
            <div>
                <br />
                <Link to={`/series`}>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 250 }}
                        overlay={renderTooltip}
                    >
                        <Button variant="outline-dark" size="sm">
                            <ChevronBack /> Return to Search
                        </Button>
                    </OverlayTrigger>
                </Link>
                <br />
                <Link to={`/character/${charId}`}>
                    <Button variant="outline-dark" size="sm">
                        <ChevronBack /> Return to Character Profile
                    </Button>
                </Link>
            </div>
            <hr />
            <div>
                <h3>{episodeDetails.title}</h3>
                <Accordion>
                <div>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle
                                as={Button}
                                eventKey="6"
                                variant="link"
                                onClick={() => setExpanded(!isExpanded)}
                            >
                                Episode Details {getChevron(isExpanded)}
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="6">
                            <Card.Body>
                                <Card.Text>
                                    UID: <span>{episodeDetails.uid}</span>
                                </Card.Text>
                                <Card.Text>
                                    Episode: <span>#{episodeDetails.episodeNumber}</span>
                                </Card.Text>
                                <Card.Text>
                                    US Air Date: <span>{episodeDetails.usAirDate}</span>
                                </Card.Text>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </div>
                    <EpisodeCharacters
                        characters={episodeDetails.characters}
                        getChevron={getChevron}
                    />
                </Accordion>
            </div>
        </div>
    )
}
