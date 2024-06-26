import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import React from 'react';
import Chart from 'react-apexcharts';
import { Button, Card } from 'react-bootstrap';


const ImagePredictionScreen = () => {
    const location = useLocation();
    const highestProbability = location.state?.message?.image_probs[0] ? Math.max(...location.state?.message?.image_probs[0]) : 100
    const [imageProbabilities, setImageProbabilities] = useState([{
        name: 'Diagnosis',
        data: location.state?.message?.image_probs[0] ? location.state?.message?.image_probs[0] : []
    }]);
    const history = useNavigate();
    const finalOutputGenerate = (finalDecision) => {
        switch (finalDecision) {
            case 'Non Demented':
                return "Healthy Brain";
            case 'Mild AD':
                return "Mild Alzehimz Disease";
            case 'Moderate AD':
                return "Moderate Alzehimz Disease";
            case 'Very Mild AD':
                return "Very Mild Alzehimz Disease";
            default:
                return "Error in Prediction";
        }
    }

    const onClickDiagnosis = () => {
        history('/display_detection');
    };

    let finalDecision = location.state?.message?.
        final_decision ? finalOutputGenerate(location.state?.message?.
            final_decision) : "Error"


    const [options, setOptions] = useState({
        chart: {
            type: 'bar',
            height: 500,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '70%',
                endingShape: 'rounded',
                distributed: true,
            },
        },
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Healthy', 'Mild AD', 'Moderate AD', 'Very Mild AD'],
        },
        yaxis: {
            title: {
                text: 'Values'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val + "%";
                }
            }
        },
        title: {
            text: 'Patient Diagnosis Probabilities',
            align: 'center',
            style: {
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#263238'
            }
        },
    });
    return (
        <div className="test">
            <div className="p-2 d-flex flex-colunm">
                <div className="d-flex flex-row">
                    <div className="pe-3">
                        <Card className='card-custom-border'>
                            <Chart options={options} series={imageProbabilities} type="bar" height={500} width={600} />
                        </Card>
                    </div>
                </div>
                <Card className='card-custom-border' style={{ height: '519px', width: '478px' }}>
                    <Card.Header className="text-center result-title">Disease Diagnosis</Card.Header>
                    <div className="p-3">
                        <div className="result-container">
                            <div className="desease-detection-text">
                                After detailed evaluation through advanced imaging and text analysis, the data suggest a pronounced likelihood of <span className="fw-bold">{finalDecision}</span> (AD). The bar graph distinctly shows a high probability of <span className="fw-bold">{highestProbability}</span>% for <span>{finalDecision}</span>, indicating a strong diagnostic leaning towards this category.
                            </div>
                            <div className="result-btn">
                                <Button className="select-btn" onClick={() => onClickDiagnosis()}>Diagnosis</Button>
                                <Button className="select-btn" variant="success">Print Diagnosis Report</Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default ImagePredictionScreen;