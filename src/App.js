import './App.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ProgressBar } from './components/ProgressBar'

function App() {

  const [progress, setProgress] = useState(0)
  const [files, setFiles] = useState([])
  const [uploadComplteted, setUploadCompleted] = useState(false)

  let intervalId;

  useEffect(() => {
    console.log(progress)
  }, [progress])

  const options = {
    strokeWidth: 2
  };

  const containerStyle = {
    width: '200px',
    height: '200px'
  };


  const startUpdatingProgressIndicator = () => {
    if (!intervalId) {
      intervalId = setInterval(() => {
        axios.get("http://localhost:5162/FileUpload/progress")
          .then(r => {
            if (r.data > 0) {
              setProgress(r.data)
            }
          })
          .catch(e => { console.log(e) })
      }, 50)
    }
  }


  const stopUpdatingProgressIndicator = () => {
    clearInterval(intervalId)
  }

  const formSubmited = (event) => {
    event.preventDefault()

    var formData = new FormData();

    files.forEach(file => {
      formData.append("Files", file)
    });

    startUpdatingProgressIndicator();

    axios.post("http://localhost:5162/FileUpload", formData)
      .then(r => {
        stopUpdatingProgressIndicator()
        setProgress(100)
        setUploadCompleted(true)
        console.log("recive response")
      })
      .catch(e => {
        stopUpdatingProgressIndicator()
        console.log(e)
      })

  }

  const filesChangedHandler = (event) => {
    setProgress(0)
    event.preventDefault()
    const filesJson = event.target.files
    const filesArray = []
    for (var key in Object.keys(filesJson)) {
      filesArray.push(filesJson[key])
    }
    setFiles(prev => [...prev, ...filesArray])
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: '60%', margin: 'auto' }}>

          <form onSubmit={formSubmited}>
            <input type="file" multiple onChange={filesChangedHandler} />
            <button type='submit'>Send files</button>
          </form>

          <ProgressBar percentage={progress}>
            <div></div>
          </ProgressBar>
          {uploadComplteted &&
            <div style={{ color: "#53a653", fontSize: '0.7em' }}>
              Upload completed!</div>}
        </div>
      </header>
    </div>
  );
}

export default App;
