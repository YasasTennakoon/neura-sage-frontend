import { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, ProgressBar } from 'react-bootstrap';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const inputRef = useRef();
    const [progressBar, setProgressBar] = useState(0);
    const [fileName,setFileName] = useState("test.jpg")

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        setFileName(droppedFile.name)
        if (droppedFile) {
            setFile(droppedFile);
            setImage(URL.createObjectURL(droppedFile));
            setProgressBar(0); // Reset progress for new upload
            simulateUpload(droppedFile);
        }
    };

    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        setFileName(selectedFile.name)
        if (selectedFile) {
            setFile(selectedFile);
            setImage(URL.createObjectURL(selectedFile));
            setProgressBar(0); // Reset progress for new upload
            simulateUpload(selectedFile);
        }
    };

    const simulateUpload = (file) => {
        const fileSize = file.size;
        let progress = 0;
        const interval = setInterval(() => {
            progress += fileSize / 1000000; // Simulate progress
            setProgressBar((prevProgress) => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prevProgress + 10;
            });
        }, 100); // Update progress every 100ms
    };

    return (
        <Card style={{ width: '50rem' }}>
            <Card.Body>
                <div className="d-flex flex-row">
                    <div className='d-flex align-items-start flex-column'>
                        <div 
                        className='dropzone'
                        >
                            {!file ? (
                        <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}>
                      Drag and Drop or Select Files
                      <input
                           type="file"
                            onChange={handleChange}
                            hidden
                           ref={inputRef}
                        />
                       </div>
                            ):(
                    <div style={{ textAlign: 'center' }}>
                        <img src={image} alt="Uploaded" className='image' />
                    </div>
                            )}
                        </div>
                        <div className='select' style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            {!file ?(
                           <Button type="button" variant="primary" onClick={() => inputRef.current.click()}>
                           Select Files
                       </Button>
                            ):(
                                <Button type="button" variant="primary" onClick={() => setFile(null)}>
                                Re-Uplode
                            </Button>
                            )}
                        </div>

                    </div>
                    <div className='file-content'>
                        <div className='d-flex align-items-start flex-column content'>
                            <div>
                                Current Uploding File
                            </div>
                            <Card className='uploding-card'>
                            <div>
                            {fileName}
                            <div className='progress-bar'>
                                {progressBar != 100 ? (
                                    <ProgressBar animated now={progressBar} label={`${progressBar}%`}   /> 
                                ):(
                                    <ProgressBar striped variant="success" label={"Uplode Completed"}  /> 
                                )}
                            </div>
                            </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )

    // return (
    //     <div  class="d-flex flex-row">
    //     <div className='container'>
    //         <div className='dropzone'>
    //             {!file ? (
    //                 <div
    //                     onDragOver={handleDragOver}
    //                     onDrop={handleDrop}
    //                 >
    //                     Drag and Drop or Select Files
    //                     <input
    //                         type="file"
    //                         onChange={handleChange}
    //                         hidden
    //                         ref={inputRef}
    //                     />
    //                 </div>
    //             ) : (
    //                 <div style={{ textAlign: 'center' }}>
    //                     <img src={image} alt="Uploaded" className='image' />
    //                 </div>
    //             )}
    //         </div>

    //         <Button type="button" variant="primary" onClick={() => inputRef.current.click()}>
    //             Select Files
    //         </Button>
    //         {/* <ProgressBar now={progressBar} label={`${progressBar}%`} /> */}
    //     </div>

    //     <div>
    //         Uplode status
    //     </div>
    //     </div>

    // );
};

export default FileUpload;
