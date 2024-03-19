import { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Form, ProgressBar, Row } from 'react-bootstrap';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Spinner from 'react-bootstrap/Spinner';
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const inputRef = useRef();
    const [progressBar, setProgressBar] = useState(0);
    const [fileName, setFileName] = useState("test.jpg");
    const [uplodedImages, setUplodedImages] = useState([]);
    const [currentUplodeStatus, setCurrentUplodeStatus] = useState(false);
    const [currentFileEvent, setCurrentFileEvent] = useState();
    const [formData, setFormData] = useState({
        mf: '',
        age: '',
        ses: '',
        mmse: '',
        etiv: '',
        nwbv: '',
        asf: ''
    });

    const onformHandleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        console.log(uplodedImages);

    }, [uplodedImages])

    const handleDrop = (event) => {
        setCurrentFileEvent(event);
        setCurrentUplodeStatus(true);
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFileName(droppedFile.name)
        if (droppedFile) {
            setFile(droppedFile);
            setImage(URL.createObjectURL(droppedFile));
            setProgressBar(0);
            simulateUpload(droppedFile);
        }
    };

    const handleChange = (event) => {
        setCurrentFileEvent(event);
        setCurrentUplodeStatus(true);
        const selectedFile = event.target.files[0];
        setFileName(selectedFile.name)
        if (selectedFile) {
            setFile(selectedFile);
            setImage(URL.createObjectURL(selectedFile));
            setProgressBar(0);
            simulateUpload(selectedFile);
        }
    };

    const simulateUpload = (file) => {
        const fileSize = file.size;
        let progress = 0;
        const interval = setInterval(() => {
            progress += fileSize / 10000000;
            setProgressBar((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + 10;
            });
        }, 100);
    };

    const onCancelUplode = () => {
        setCurrentUplodeStatus(false)
        setFile(null);
        setImage(null)
    }

    const onSaveImage = () => {
        setUplodedImages(prevArray => [...prevArray, currentFileEvent]);
    }

    const concatinateFileName = (name) => {
        const numberOfCharacters = 5;
        const concatenated = name.slice(0, numberOfCharacters);
        const additionalString = "...jpg";
        const concatenatedWithExtra = concatenated + additionalString;

        return concatenatedWithExtra
    }

    const onDeleteItem = (itemToDelete) => {
        setUplodedImages(currentImages =>
            currentImages.filter(item => item !== itemToDelete)
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const outputData = {
            "M/F": [parseInt(formData.mf)],
            "Age": [parseInt(formData.age)],
            "SES": [parseInt(formData.ses)],
            "MMSE": [parseInt(formData.mmse)],
            "eTIV": [parseInt(formData.etiv)],
            "nWBV": [parseFloat(formData.nwbv)],
            "ASF": [parseFloat(formData.asf)]
        };

        const formDatas = new FormData();
        formDatas.append('image', file);
        formDatas.append('patient', JSON.stringify(outputData));

        for (let [key, value] of formDatas.entries()) {
            console.log(key, value);
        }

        // try {
        //   const response = await fetch('http://127.0.0.1:5000/disease/diagnose', {
        //     method: 'POST',
        //     body: formDatas,
        //   });

        //   if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        //   }

        //   const data = await response.json();
        //   console.log(data);
        // } catch (error) {
        //   console.error('Error submitting form:', error); // Handle error
        // }

    };

    return (
        <div className='d-flex justify-content-start'>
            {/* <div className='title'>
                Uplode MRI Image
            </div> */}
            <div>
                <Card style={{ width: '50rem' }} className='card-custom-border'>
                    <Card.Body>
                        <div className="d-flex flex-row">
                            <div className='d-flex  flex-column'>
                                <div
                                    className='dropzone'
                                >
                                    {!file ? (
                                        <div
                                            onDragOver={handleDragOver}
                                            onDrop={handleDrop}
                                            className="d-flex flex-column align-items-center justify-content-center h-100"
                                        >
                                            <FaCloudUploadAlt size={230} />
                                            <div>
                                                Drag files to uplode
                                            </div>

                                            <input
                                                type="file"
                                                onChange={handleChange}
                                                hidden
                                                ref={inputRef}
                                            />
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center' }}>
                                            {progressBar == 100 ? (
                                                <div>
                                                    <img src={image} alt="Uploaded" className='image' />
                                                </div>
                                            ) : (
                                                <div>
                                                    <Spinner animation="border" variant="primary" size='lg' />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {!file ? (
                                        <div className='select'>
                                            <Button className='select-btn' type="button" variant="primary" onClick={() => inputRef.current.click()}>
                                                Select Files
                                            </Button>
                                        </div>

                                    ) : (
                                        <div className='after-uplode-btn'>
                                            <div className=''>
                                                <Button className='reuplode-btn' type="button" variant="primary" onClick={() => {
                                                    onCancelUplode()
                                                }}>
                                                    Uplode Again
                                                </Button>
                                            </div>
                                            <div>
                                                {/* <FaSave size={25} onClick={() => {
                                        onSaveImage()
                                    }} /> */}
                                                <Button className='reuplode-btn' type="button" variant="success" onClick={onSaveImage}>
                                                    <div className='column' style={{ display: 'flex', alignItems: 'center' }}>
                                                        <FaSave size={15} style={{ marginRight: '5px' }} />
                                                        Save
                                                    </div>
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>
                            <div className='file'>
                                <div className='d-flex align-items-start flex-column content'>
                                    {currentUplodeStatus && (
                                        <div className='d-flex align-items-start flex-column content'>
                                            <div className='card-title'>
                                                Uploding File
                                            </div>
                                            <Card className='uploding-card'>
                                                <div className='d-flex flex-row'>
                                                    <div>
                                                        <img src={image} alt="Uploaded" className='current-card-image' />
                                                    </div>
                                                    <div className='file-content'>
                                                        <div className='file-name'>
                                                            {fileName}
                                                        </div>
                                                        <div className='d-flex flex-row'>
                                                            <div className='progress-bar'>
                                                                {progressBar != 100 ? (
                                                                    <ProgressBar animated now={progressBar} label={`${progressBar}%`} />
                                                                ) : (
                                                                    <ProgressBar animated now={100} striped variant="success" label={"Uplode Completed"} />
                                                                )}
                                                            </div>
                                                            <div className='pb-1'>
                                                                <MdCancel onClick={() => onCancelUplode()} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    )}

                                    <div className='card-title'>
                                        Recent Uplodes
                                    </div>
                                    {uplodedImages.length == 0 ? (
                                        <div className='card-msg'>
                                            There are no current images
                                        </div>
                                    ) : (
                                        <div className={currentUplodeStatus ? 'recent-uplode-container' : 'recent-uplode-container-expanded'}>
                                            {uplodedImages.map(item => (
                                                <div className='pb-2'>
                                                    <Card className='recent-uploding-card'>
                                                        <div className='d-flex flex-row'>
                                                            <div className='image-uploding'>
                                                                <img src={URL.createObjectURL(item.target.files[0])} alt="Uploaded" className='current-card-image' />
                                                            </div>
                                                            <div className='d-flex flex-column p-2'>
                                                                <div className='recent-file-name'>
                                                                    {/* {item.target.files[0].name} */}
                                                                    {concatinateFileName(item.target.files[0].name)}
                                                                </div>
                                                                <div className='recent-file-size'>
                                                                    Size -{(item.target.files[0].size / 1024).toFixed(2)}KB
                                                                </div>
                                                            </div>

                                                            <div className='delete-bin'>
                                                                <MdDelete size={25} onClick={() => onDeleteItem(item)} />
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>


            {/* <div className='title'>
                Enter patient Information
            </div> */}
            <div className='px-3'>
                <Card className='card-custom-patient-deta '>
                    <div>
                        <Form>
                            <div className='patient-detail-title'>
                                Patient Personal Details
                            </div>
                            <Row className='pt-2'>
                                <Col>
                                    <Form.Group controlId="formGender">
                                        <Form.Label className='form-lables'>Gender</Form.Label>
                                        <Form.Control
                                            className='small-input'
                                            as="select"
                                            name="mf"
                                            value={formData.mf}
                                            onChange={onformHandleChange}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Enter patient gender</option>
                                            <option value="1">Male</option>
                                            <option value="0">Female</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group controlId="formGridFirstName">
                                        <Form.Label className='form-lables'>Age</Form.Label>
                                        <Form.Control
                                            className='small-input'
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={onformHandleChange}
                                            placeholder="Enter patient age"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <div className='pt-3 patient-detail-title'>
                                Clinical Information
                            </div>
                            <Row className='pt-2'>
                                <Col>
                                    <Form.Group controlId="formGridFirstName">
                                        <Form.Label className='form-lables'>Socioecomic Status</Form.Label>
                                        <Form.Control
                                            className='small-input'
                                            type="number"
                                            name="ses"
                                            value={formData.ses}
                                            onChange={onformHandleChange}
                                            placeholder="SES"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formGridFirstName">
                                        <Form.Label className='form-lables'>Mini-Mental State Examination</Form.Label>
                                        <Form.Control
                                            className='small-input'
                                            type="number"
                                            name="mmse"
                                            value={formData.mmse}
                                            onChange={onformHandleChange}
                                            placeholder="MMSES"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='pt-2'>
                                <Col>
                                    <Form.Group controlId="formGridFirstName">
                                        <Form.Label className='form-lables'>Estimated Total Intracranial Volume</Form.Label>
                                        <Form.Control
                                            className='small-input'
                                            type="number"
                                            name="etiv"
                                            value={formData.etiv}
                                            onChange={onformHandleChange}
                                            placeholder="eTIV"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formGridFirstName">
                                        <Form.Label className='form-lables'>Normalized Whole Brain Volume</Form.Label>
                                        <Form.Control
                                            className='small-input'
                                            type="number"
                                            name="nwbv"
                                            value={formData.nwbv}
                                            onChange={onformHandleChange}
                                            placeholder="NWBV"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row style={{ width: '280px' }} className='pt-2'>
                                <Col >
                                    <Form.Group controlId="formGridFirstName">
                                        <Form.Label className='form-lables'>Atlas Scaling Factor</Form.Label>
                                        <Form.Control
                                            className='small-input'
                                            type="number"
                                            name="asf"
                                            value={formData.asf}
                                            onChange={onformHandleChange}
                                            placeholder="ASF"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </Card>
                <Button onClick={handleSubmit}>
                    predict
                </Button>
            </div>

        </div>

    )
};

export default FileUpload;
