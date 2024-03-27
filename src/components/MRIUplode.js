import { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Form, ProgressBar, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Spinner from 'react-bootstrap/Spinner';
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { useHistory, useLocation, useNavigate } from 'react-router-dom';

const MRIUplode = () => {
    const [file, setFile] = useState();
    const [fileSizeKB, setFileSizeKB] = useState(null);
    const [image, setImage] = useState(null);
    const inputRef = useRef();
    const [progressBar, setProgressBar] = useState(0);
    const [fileName, setFileName] = useState("test.jpg");
    const [uplodedImages, setUplodedImages] = useState([]);
    const [currentUplodeStatus, setCurrentUplodeStatus] = useState(false);
    const [currentFileEvent, setCurrentFileEvent] = useState();
    const history = useNavigate();
    const location = useLocation();

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        console.log(location);
        console.log(uplodedImages);

    }, [uplodedImages])

    const handleDrop = (event) => {
        console.log(event.dataTransfer.files[0]);
        setCurrentFileEvent(event.dataTransfer.files[0]);
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
        console.log(event.target.files[0]);
        setCurrentFileEvent(event.target.files[0]);
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
        setFileSizeKB(file.size / 1024)
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
        }, 200);
    };

    const onCancelUplode = () => {
        setCurrentUplodeStatus(false)
        setFile(null);
        setImage(null)
    }

    const onSaveImage = () => {
        console.log(currentFileEvent);
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

        const formDatas = new FormData();
        formDatas.append('image', file);

        for (let [key, value] of formDatas.entries()) {
            console.log(key, value);
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/disease/image/diagnosis', {
                method: 'POST',
                body: formDatas,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            history('/display_image_screen', { state: { from: 'SourceComponent', message: data.diagnosis } });
        } catch (error) {
            console.error('Error submitting form:', error);
        }

    };

    return (
        <div>
            <div className='d-flex justify-content-start'>
                <div>
                    <Card style={{ width: '70rem' }} className='card-custom-border'>
                        <Card.Body>
                            <div className='patient-detail-title pb-3'>
                                Uplode MRI Image
                            </div>
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
                                                <FaCloudUploadAlt size={170} />
                                                <div className='p-2'>
                                                    <b>Drag files to uplode</b>
                                                </div>
                                                <div>--------- or ----------</div>
                                                <div className='select'>
                                                    <Button className='select-btn' type="button" variant="primary" onClick={() => inputRef.current.click()}>
                                                        <b>Select Files</b>
                                                    </Button>
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
                                        {file && (
                                            <div className='after-uplode-btn'>
                                                <div className=''>
                                                    <Button className='reuplode-btn' type="button" variant="primary" onClick={() => {
                                                        onCancelUplode()
                                                    }}>
                                                        <b>Uplode Again</b>
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button className='reuplode-btn' type="button" variant="success" onClick={onSaveImage}>
                                                        <div className='column' style={{ display: 'flex', alignItems: 'center' }}>
                                                            <FaSave size={15} style={{ marginRight: '5px' }} />
                                                            <b>Save</b>
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
                                                                {fileName}{fileSizeKB}
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
                                            <div className={currentUplodeStatus ? 'flex-card' : 'flex-card-expanded'}>
                                                {uplodedImages.map(item => (
                                                    <div className='card-container'>
                                                        <Card className='recent-uploding-card'>
                                                            <div className='d-flex flex-row'>
                                                                <div className='image-uploding'>
                                                                    <img src={URL.createObjectURL(item)} alt="Uploaded" className='current-card-image' />
                                                                </div>
                                                                <div className='d-flex flex-column p-2'>
                                                                    <div className='recent-file-name'>
                                                                        {concatinateFileName(item.name)}
                                                                    </div>
                                                                    <div className='recent-file-size'>
                                                                        Size -{(item.size / 1024).toFixed(2)}KB
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

                            <Col>
                                <div className='form-control-btn'>
                                    <div>
                                        <Button variant="danger" size="mg">
                                            <b className='form-control-btn-text'>Cancel</b>
                                        </Button>
                                    </div>
                                    <div className='proceed-btn'>
                                        <Button variant="primary" size="mg"><b className='form-control-btn-text' onClick={handleSubmit}>Proceed</b></Button>
                                    </div>
                                </div>
                            </Col>
                        </Card.Body>
                    </Card>

                </div>
            </div>

        </div>

    )
};

export default MRIUplode;
