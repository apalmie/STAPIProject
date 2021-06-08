import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ReactComponent as ChevronBack } from 'bootstrap-icons/icons/chevron-double-left.svg';
import { ReactComponent as ChevronDown } from 'bootstrap-icons/icons/chevron-down.svg';
import { ReactComponent as ChevronRight } from 'bootstrap-icons/icons/chevron-right.svg';
import { Accordion, Button } from 'react-bootstrap';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import CharacterOrg from './CharacterOrg';
import CharacterEpisodes from './CharacterEpisodes';
import CharacterProfile from './CharacterProfile';
import CharacterPerformer from './CharacterPerformer';
import https from "https";

export default function CharacterBio() {

    const agent = new https.Agent({
        rejectUnauthorized: false
      });

    const baseURL = 'http://stapi.co/api/v1/rest';
    const [characterBio, setCharacterBio] = useState({});
    const { uid } = useParams();

    useEffect(() => {
        fetch(`${baseURL}/character?uid=${uid}`, { agent })
            .then(resp => resp.json())
            .then(characterData => {
                setCharacterBio(characterData.character)
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
            </div>
            <hr />
            <div>
                <h3>{characterBio.name}</h3>
                <Accordion>
                    <CharacterProfile
                        profile={characterBio}
                        species={characterBio.characterSpecies}
                        getChevron={getChevron}
                    />
                    <CharacterOrg
                        org={characterBio.organizations}
                        getChevron={getChevron}
                    />
                    <CharacterEpisodes
                        characterId={characterBio.uid}
                        episodes={characterBio.episodes}
                        getChevron={getChevron}
                    />
                    <CharacterPerformer
                        performers={characterBio.performers}
                        getChevron={getChevron}
                    />
                </Accordion>
            </div>
        </div>
    )
}
