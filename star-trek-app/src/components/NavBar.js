import { Link } from 'react-router-dom';
import { Navbar, Nav, Col } from 'react-bootstrap';
import banner from '../images/banner_logo.png';
import Image from 'react-bootstrap/Image';


function NavBar() {
    return (
      <Navbar className="justify-content-between">
        <Navbar.Brand href="/">
          <Col xs={6} md={4}>
            <Image src={banner} alt="https://www.iconspng.com/image/146613/star-trek-logo" />
          </Col>
        </Navbar.Brand>
        <Nav
          justify
          variant="tabs"
        >
          <Link to='/series'> Series</Link>{' '}
        </Nav>
      </Navbar>
    )
  }

  export default NavBar;