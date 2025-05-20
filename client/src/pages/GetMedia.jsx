import axios from 'axios';
import React, { useEffect, useState } from 'react'

const GetMedia = () => {
  
  const [files, setFiles] = useState([]);

  const fetchFiles = async() => {
    try {
      const response = await axios.get(`http://localhost:2000/get-files`);
      console.log(response);  
      setFiles(response.data);  
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchFiles();
  }, [])
  return (
    <>
      {files.map((file) => (
        <div>
          <img src={`http://localhost:2000/uploads/${file.Image}`} alt="" />
        </div>
        ))}
    </>
  )
}

export default GetMedia
