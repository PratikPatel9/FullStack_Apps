import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    await axios
      .post("http://localhost:3001/upload", formData)
      .then((res) => console.log(res))
      .catch((error) => console.error(error));
  };

  // need to use UseEffect Hook that fetch the data from data
  useEffect(() => {
    axios
      .get("http://localhost:3001/getImage")
      // .then((res) => console.log(res.data))
      .then((res) => setImage(res.data[6].image))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <h2>How to upload image and retrive image from backedn Database to UI</h2>
      <div className="form-control">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
        <br />
        <br/>
        <img src={`http://localhost:3001/images/${image}`} alt="image" />
        {/* {image && (
          <img src={`http://localhost:3001/images/${image}`} alt="image" />
        )} */}
      </div>
    </>
  );
}

export default App;
