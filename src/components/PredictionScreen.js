import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import React from 'react';
import Chart from 'react-apexcharts';
import { Button, Card, Col, Form, ProgressBar, Row } from 'react-bootstrap';


const PredictionScreen = () => {
    const location = useLocation();
    const [combinedProbabilities, setCombinedProbabilities] = useState([{
        name: 'Diagnosis',
        data: location.state?.message?.combined_probs[0] ? location.state?.message?.combined_probs[0] : []
    }]);
    const [imageProbabilities, setImageProbabilities] = useState(location.state?.message?.image_probs
    [0] ? location.state?.message?.image_probs[0] : []);
    const [textualProbabilities, setTextualProbabilities] = useState(location.state?.message?.text_probs[0] ? location.state?.message?.text_probs[0] : []);
    const highestProbability = location.state?.message?.combined_probs[0] ? Math.max(...location.state?.message?.combined_probs[0]) : 100;
    const history = useNavigate();


    useEffect(() => {
        console.log(location.state?.message);
    });

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


    const [pieImageOptions, setPieImageOptions] = useState({
        chart: {
            type: 'donut',
        },
        title: {
            text: 'Image Probabilities',
            align: 'center',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#263238'
            }
        },
        labels: ['Healthy', 'Mild AD', 'Moderate AD', 'Very Mild AD'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        plotOptions: {
            pie: {
                donut: {
                    size: '50%',
                }
            }
        },
    });

    const [pieTextOptions, setPieTextOptions] = useState({
        chart: {
            type: 'donut',
        },
        title: {
            text: 'Textual Probabilities',
            align: 'center',
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#263238'
            }
        },
        labels: ['Healthy', 'Mild AD', 'Moderate AD', 'Very Mild AD'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        plotOptions: {
            pie: {
                donut: {
                    size: '50%',
                }
            }
        },
    });

    return (
        <div>
            <div className="p-2">
                <div className="d-flex flex-row">
                    <div className="pe-3">
                        <Card className='card-custom-border'>
                            <Chart options={options} series={combinedProbabilities} type="bar" height={500} width={687} />
                        </Card>
                    </div>

                    <div className="d-flex flex-column">
                        <div className="pie-chart">
                            <Card className='card-custom-border'>
                                <Chart options={pieImageOptions} series={imageProbabilities} type="donut" width={390} />
                            </Card>
                        </div>

                        <Card className='card-custom-border'>
                            <Chart options={pieTextOptions} series={textualProbabilities} type="donut" width={390} />
                        </Card>
                    </div>
                </div>
                <div className="pt-3">
                    <Card className='card-custom-border' style={{ height: '11.5rem' }}>
                        <Card.Header className="text-center result-title">Disease Diagnosis</Card.Header>
                        <div className="p-3">
                            <div className="result-container-both">
                                <div className="desease-detection-text">
                                    After detailed evaluation through advanced imaging and text analysis, the data suggest a pronounced likelihood of <span className="fw-bold">{finalDecision}</span> (AD). The bar graph distinctly shows a high probability of <span className="fw-bold">{highestProbability}</span>% for <span>{finalDecision}</span>, indicating a strong diagnostic leaning towards this category.
                                </div>
                                <div className="result-btn">
                                    <Button className="select-btn" onClick={()=>onClickDiagnosis()}>Diagnosis</Button>
                                    <Button className="select-btn" variant="success">Print Diagnosis Report</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default PredictionScreen;