import { Fragment } from 'react';
import { Row, Col} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitterSquare, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link';

function Footer(){
    return (
        <Row>

            <Col xs={12} md={4}>
                <div>SOCIAL</div>
                <div className="fb-like" data-href="https://web.facebook.com/PataSpare-106357314168691" data-colorscheme="dark" data-width="" data-layout="standard" data-action="like" data-size="small" data-share="true"></div>
                {/* <FontAwesomeIcon icon={faFacebook} /><br/> */}
                <FontAwesomeIcon icon={faTwitterSquare} size='sm'/><br/>
                <FontAwesomeIcon icon={faYoutube} /><br/>
                <FontAwesomeIcon icon={faInstagram} /><br/>
            </Col>

            <Col xs={12} md={4}>
                <div>LEGAL</div>
                <Link style={{
                    color: '#ffffff',
                    textDecoration: 'none'
                }} href={`/privacy`}>
                    Privacy Policy
                </Link><br/>
                <Link style={{
                    color: '#ffffff',
                    textDecoration: 'none'
                }} href={`/terms`}>
                    Terms &amp; Conditions
                </Link>
            </Col>
            
            <Col xs={12} md={4}>
                <div>SUPPORT</div>
                <a style={{
                    color: '#ffffff',
                    textDecoration: 'none'
                }} href={'/contact'}>Contact Us</a>
            </Col>
        </Row>
    )
}
export default Footer;