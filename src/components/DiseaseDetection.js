import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import image1 from '././Images/MRIImage.webp';
import image2 from '././Images/MRI&Text.jpeg';


const DiseaseDetection = () => {
    const history = useNavigate();
    
    const handleSubmit = (value) => {
        if (value == "both") {
            history('/file-upload');
        }
        else {
            history('/mri_uplode');
        }
    };

    return (
        <div className='disease-detection-conatiner'>
            <div className='test'>
                <div className='p-3'>
                    <div className="pb-2 question-container-tilte text-center">
                        Disease Detection
                    </div>
                    <div className='d-flex flex-row disese-detect-card-gap'>
                        <Card style={{ width: '32rem' }} className='card-custom-border'>
                            <Card.Img variant="top" src={image1} style={{ width: '509px', height: '300px' }} />
                            <Card.Body className='card-body-detection-screen'>
                                <Card.Title className='card-body-title'>Disease Detection via MRI & Ptient Data</Card.Title>
                                <Card.Text className='card-body-description'>
                                    Predict the Alzehimz's Disease using both Brain MRI Image and Textual MRI data.                          </Card.Text>
                                <Button variant="primary" className='card-body-btn' onClick={() => { handleSubmit("both") }}>Detect Disease</Button>
                            </Card.Body>
                        </Card>

                        <Card style={{ width: '32rem' }} className='card-custom-border'>
                            <Card.Img variant="top" src={image2} style={{ width: '509px', height: '300px' }} />
                            <Card.Body className='card-body-detection-screen'>
                                <Card.Title className='card-body-title'>Disease Detection via MRI</Card.Title>
                                <Card.Text className='card-body-description'>
                                    Predict the Alzehimz's Disease using Brain MRI Image.
                                </Card.Text>
                                <Button variant="primary" className='card-body-btn' onClick={() => { handleSubmit("one") }}>Detect Disease</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DiseaseDetection;