import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import FileUplode from "./components/FileUplode";
 
const DetectionScreen = () => {
    const [file, setFile] = useState();
    const[image,setImage] =useState();
    const[prediction,setPrediction]=useState();
    
    const [formData,setFormData] = useState({
      mf: '',
      age: '',
      ses: '',
      mmse: '',
      etiv: '',
      nwbv: '',
      asf: ''
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // First, create the object in the format you need
    const outputData = {
      "M/F": [parseInt(formData.mf)],
      "Age": [parseInt(formData.age)],
      "SES": [parseInt(formData.ses)],
      "MMSE": [parseInt(formData.mmse)],
      "eTIV": [parseInt(formData.etiv)],
      "nWBV": [parseFloat(formData.nwbv)],
      "ASF": [parseFloat(formData.asf)]
    };
  
    // Then, create a FormData object and append the file and the stringified object
    const formDatas = new FormData();
    formDatas.append('image', file); // Assuming 'file' is the state holding the file to be uploaded
    formDatas.append('patient', JSON.stringify(outputData)); // Stringify the object
  
    // To log the FormData content, you need to use entries() and loop through
    for (let [key, value] of formDatas.entries()) {
      console.log(key, value);
    }

    try {
      // Adjust the URL to your backend endpoint
      const response = await fetch('http://127.0.0.1:5000/disease/diagnose', {
        method: 'POST',
        body: formDatas,
        // Don't set Content-Type header when using FormData,
        // Fetch will set it automatically including the boundary parameter
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json(); // Assuming your server responds with JSON
      console.log(data);
      setPrediction(data.diagnosis)// Handle success
    } catch (error) {
      console.error('Error submitting form:', error); // Handle error
    }
  
    // Here you would typically send `formDatas` to your backend API with fetch or axios
  };
  

    const handleChanges = (e) => {
        console.log(e.target.files);
        setFile(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]));
    }


    // return (
    //     <div className="App">
    //       <div>
    //       <h2>Add Image:</h2>
    //         <input type="file" onChange={handleChanges} />
    //       </div>
    //       <img src={image} />
    //       <div>
    //       <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>M/F:</label>
    //     <input type="number" name="mf" value={formData.mf} onChange={handleChange} />
    //   </div>
    //   <div>
    //     <label>Age:</label>
    //     <input type="number" name="age" value={formData.age} onChange={handleChange} />
    //   </div>
    //   <div>
    //     <label>SES:</label>
    //     <input type="number" name="ses" value={formData.ses} onChange={handleChange} />
    //   </div>
    //   <div>
    //     <label>MMSE:</label>
    //     <input type="number" name="mmse" value={formData.mmse} onChange={handleChange} />
    //   </div>
    //   <div>
    //     <label>eTIV:</label>
    //     <input type="number" name="etiv" value={formData.etiv} onChange={handleChange} />
    //   </div>
    //   <div>
    //     <label>nWBV:</label>
    //     <input type="text" name="nwbv" value={formData.nwbv} onChange={handleChange} />
    //   </div>
    //   <div>
    //     <label>ASF:</label>
    //     <input type="text" name="asf" value={formData.asf} onChange={handleChange} />
    //   </div>
    //   <Button type="submit" variant="primary">Submit</Button>
    // </form>
    // <div>
    //   <label>
    //     {prediction}
    //   </label>
    // </div>
    //       </div>
    //     </div>
    // );
    return(
      <div>
        < FileUplode />
      </div>
    );
}
 
export default DetectionScreen;