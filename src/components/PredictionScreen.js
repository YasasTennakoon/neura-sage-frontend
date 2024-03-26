import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import React from 'react';
import Chart from 'react-apexcharts';
import { Button, Card, Col, Form, ProgressBar, Row } from 'react-bootstrap';


const PredictionScreen = () => {
    const location = useLocation();
    const [combinedProbabilities, setCombinedProbabilities] = useState([{
        name: 'Diagnosis',
        data: location.state?.message?.combined_probs[0] ? location.state?.message?.combined_probs[0] : []
    }]);

    const [imageProbabilities, setImageProbabilities] = useState(location.state?.message?.combined_probs[0] ? location.state?.message?.combined_probs[0] : []);
    const [textualProbabilities, setTextualProbabilities] = useState(location.state?.message?.text_probs[0] ? location.state?.message?.text_probs[0] : []);


    useEffect(() => {
        console.log(location.state?.message);
    });

    const finalOutputGenerate = (finalDecision) =>{
        switch(finalDecision){
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

    let finalDecision = location.state?.message?.
    final_decision ? finalOutputGenerate(location.state?.message?.
        final_decision):"Error"

    const [options, setOptions] = useState({
        chart: {
            type: 'bar',
            height: 500,
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
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '70%',
                endingShape: 'rounded'
            },
        },
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
        }
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
            <div className="title">Disease Detection</div>
        <Card style={{ width: '70rem' }} className='card-custom-border'>
            <div className="p-2">
                <div className="d-flex flex-row">
                    <div className="px-3">
                        <Card className='card-custom-border'>
                            <Chart options={options} series={combinedProbabilities} type="bar" height={500} width={650} />
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
                <div className="d-flex flex-row">
                    <div className="p-4">
                        <div className="d-flex flex-column">
                            <div className="final-decison-title">
                                Disease Diagnosis
                            </div>
                            <div className="final-decision">
                                {/* Based on the comprehensive analysis conduted for the patient yeilds that the patient yeilds a diagnosis of <span className="fw-bold">{finalDecision}</span> Alzehimz disease. */}
                                After detailed evaluation through advanced imaging and text analysis, the data suggest a pronounced likelihood of <span className="fw-bold">{finalDecision}</span> (AD). The bar graph distinctly shows a high probability of <span className="fw-bold">{Math.max(...location.state?.message?.combined_probs[0])}</span>% for <span>{finalDecision}</span>, indicating a strong diagnostic leaning towards this category.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
        </div>
    );
}

export default PredictionScreen;