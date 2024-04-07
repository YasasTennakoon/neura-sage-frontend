import { Card, Button } from "react-bootstrap";
import image2 from '././Images/homeOne.jpeg';
import firstCardImgae from '././Images/firstCard.jpg';
import secondCardImgae from '././Images/secondCard.jpg';
import thirdCardImgae from '././Images/thridImgae.png';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-content-conatiner">
                <div className="home-description">
                    <div className="home-text">
                        ALZHEIMER'S DISEASE MAY BEGIN DECADES BEFORE THE FIRST SYMTOMS APPERAR
                    </div>
                    <div className="learn-more">
                        LEARN MORE
                    </div>
                </div>
                <img src={image2} alt="Slideshow" className="img-styling" />
            </div>
            <div className="about-disease-">
                <div className="d-flex flex-row justify-content-center home-gap">
                    <Card style={{ width: '22rem' }} className='card-custom-border'>
                        <Card.Img variant="top" src={firstCardImgae} style={{ height: '14rem' }} />
                        <Card.Body className='card-body-home-screen'>
                            <Card.Title className='card-body-title'>Alzehimz's Disease Detection</Card.Title>
                            <Card.Text className='card-body-description'>

                                Alzheimer's disease is a progressive neurological disorder marked by memory loss and cognitive decline, severely impacting daily living and independent function.
                            </Card.Text>
                            <Button variant="primary" className='card-body-btn'>Learn More</Button>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '22rem' }} className='card-custom-border'>
                        <Card.Img variant="top" src={secondCardImgae} style={{ height: '14rem' }} />
                        <Card.Body className='card-body-home-screen'>
                            <Card.Title className='card-body-title'>Disease Stages</Card.Title>
                            <Card.Text className='card-body-description'>
                                Alzheimer's disease stages range from preclinical, with no symptoms, to mild, moderate, and severe, reflecting escalating impairments to enhance life quality to enhance life quality.
                            </Card.Text>
                            <Button variant="primary" className='card-body-btn'>Learn More</Button>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '22rem' }} className='card-custom-border'>
                        <Card.Img variant="top" src={thirdCardImgae} style={{ height: '14rem' }} />
                        <Card.Body className='card-body-home-screen'>
                            <Card.Title className='card-body-title'>Treatments</Card.Title>
                            <Card.Text className='card-body-description'>
                                Treatment for Alzheimer's disease involves managing symptoms through medication, cognitive support, lifestyle changes, and care strategies to enhance life quality.
                            </Card.Text>
                            <Button variant="primary" className='card-body-btn'>Learn More</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Home;