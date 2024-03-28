import { Card, Button } from "react-bootstrap";
import image from './homeOne.jpeg';
import image2 from './homeTwo.png';
import image3 from './homeThree.jpeg';
import image4 from './imageFour.jpeg';
import veryMild from './veryMild.png'
import mild from './mild.png';
import moderate from './moderate.png';
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from "react";

const fadeInOut = keyframes`
  0% { opacity: 0; }
  70% { opacity: 1; }
  100% { opacity: 0; }
`;

const FadingImage = styled.img`
  animation: ${fadeInOut} 6s linear infinite; /* Adjust animation duration as needed */
`;

const Home = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [image, image2, image3, image4];


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    return (
        <div className="home-container">
            <div className="home-content-conatiner">
                <div className="home-description">
                    <div className="home-text">
                        ALZEHIMZ'S DISEASE MAY BEGIN DECADES BEFORE THE FIRST SYMTOMS APPERAR
                    </div>
                    <div className="learn-more">
                        LEARN MORE
                    </div>
                </div>
                <FadingImage src={images[currentImageIndex]} alt="Slideshow" className="img-styling" />
            </div>
            <div className="about-disease-conatiner">
                <div className="about-title">Alzehim'z Disease</div>
                <div className="pb-3">
                    Alzheimer's disease is a progressive neurological disorder that primarily affects memory and cognitive functions. It is the most common cause of dementia among older adults,
                    leading to a gradual decline in the ability to perform everyday activities. The disease is characterized by the accumulation of amyloid plaques and tau tangles in the brain,
                    which disrupt cell function and communication. Symptoms typically begin with mild memory loss and confusion but eventually progress to severe impairment of reasoning, speaking,
                    and understanding, as well as changes in personality and behavior. There is currently no cure for Alzheimer's disease, but treatments are available that can help manage symptoms
                    and improve quality of life. Early diagnosis systems, such as the proposed system, should be used to identify the disease at an early stage and conduct the appropriate treatments
                    for the disease.
                </div>
                <div className="about-title">Disease Stages</div>
                <div className="pb-3">
                    As Alzheimer's disease progresses through its stages, starting from very mild to moderate, distinct changes mark the evolving impact on cognition and daily life. Initially, in very
                    mild stages, subtle memory lapses and minor cognitive hurdles emerge, often unnoticed but hinting at underlying brain changes. Progressing to mild stages, memory deficits become more pronounced,
                    affecting tasks, conversations, and planning abilities. Eventually, in moderate stages, significant cognitive decline manifests, impacting self-care, communication, and behavior, requiring increased
                    support and specialized care. Throughout these stages, the ongoing accumulation of amyloid plaques and tau tangles disrupts brain function, highlighting the importance of early detection and comprehensive
                    care strategies for individuals and their families.
                </div>
                <div className="d-flex justify-content-between">
                    <Card style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={veryMild} style={{ height: '244px' }} />
                        <Card.Body>
                            <div className="disease-stage">Very Mild Alzehimz's</div>
                            <Card.Text>
                                Disease begins in Medical Temporal Lobe.Symptoms: Short term Memory Lost.
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={mild} />
                        <Card.Body>
                            <div className="disease-stage">Mild Alzehimz's</div>
                            <Card.Text>
                                Disease spreads to lateral temporal and pariel lobes.Symptoms: Reading Problem,Poor object recognition, Poor direct sence.
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card style={{ width: '20rem' }}>
                        <Card.Img variant="top" src={moderate} />
                        <Card.Body>
                            <div className="disease-stage">Moderate Alzehimz's</div>
                            <Card.Text>
                                Disease spreads to frontal lobe.Symptoms: Reading Problem, Poor object recognition, Poor direct sence.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Home;