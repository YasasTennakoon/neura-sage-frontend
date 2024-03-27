import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const DiseaseDetection = () => {

    const [selectedOption, setSelectedOption] = useState('both');
    const history = useNavigate();

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = () => {
        if (selectedOption == "both") {
            history('/file-upload');
        }
        else {
            history('/mri_uplode');
        }
    };

    return (
        <div>
            <Card style={{ width: '70rem', height: '23rem' }} className='card-custom-border'>
                <div className="pb-2 question-container-tilte text-center">
                    Disease Detection
                </div>
                <div className="p-2 text-justify desease-detection-text">
                    Alzheimer's disease is a progressive neurological disorder that primarily affects memory and cognitive functions. It is the most common cause of dementia among older adults,
                    leading to a gradual decline in the ability to perform everyday activities. The disease is characterized by the accumulation of amyloid plaques and tau tangles in the brain,
                    which disrupt cell function and communication. Symptoms typically begin with mild memory loss and confusion but eventually progress to severe impairment of reasoning, speaking,
                    and understanding, as well as changes in personality and behavior. There is currently no cure for Alzheimer's disease, but treatments are available that can help manage symptoms
                    and improve quality of life. Early diagnosis systems, such as the proposed system, should be used to identify the disease at an early stage and conduct the appropriate treatments
                    for the disease.
                </div>
                <div className="p-2 text-justify desease-detection-text">
                    The proposed system allows the user to predict the  Alzheimer's disease using both<b> Brain MRI Images </b> and <b> Patient Information </b> and also only using <b> Brain MRI Images </b>.
                </div>
                <Form className="p-2">
                    <Form.Check
                        type="radio"
                        label="Predict the disease using both MRI brain images and patient information."
                        name="diseasePredictionOption"
                        value="both"
                        checked={selectedOption === 'both'}
                        onChange={handleOptionChange}
                        className='desease-detection-text'
                    />
                    <Form.Check
                        type="radio"
                        label="Predict the disease using only brain MRI images."
                        name="diseasePredictionOption"
                        value="mri"
                        checked={selectedOption === 'mri'}
                        onChange={handleOptionChange}
                        className='desease-detection-text'
                    />
                </Form>

                <div className="d-flex justify-content-center mt-3">
                    <Button onClick={handleSubmit} className='select-btn'>Get Started</Button>
                </div>
            </Card>

        </div>
    )

}

export default DiseaseDetection;