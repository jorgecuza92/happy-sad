import React, { Component } from "react";
import axios from "axios";
import './Image.css'
import { Card } from "@material-ui/core";

class Image extends Component {
  
  state = {
    selectedImage: null,
  };

  imageSelectedHandler = (event) => {
    console.log(event)
    console.log(URL.createObjectURL(event.target.files[0]))
    this.setState({
      selectedImage: event.target.files[0].name,
      file: URL.createObjectURL(event.target.files[0]),
      
      

    });
  };

  imageUploadHandler = (e) => {
      console.log(e)
      console.log('imageUploadHandler fired....')
      const formData = new FormData()
      formData.append(
          "myFile",
          e.target.files[0],
          e.target.files[0].name
      )
      axios.post('http://localhost:8080/upload', formData)
        
          .then(file => {
            console.log(file)
              this.setState({
                  ...this.state,
                  theFileFromServer: file.data.file,
                  spinner: false
              })
          })
  };

  clickSave = () => {
    const id = localStorage.getItem('id')
    fetch('http://localhost:8080/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: id,
        imageUpload: this.state.theFileFromServer
      })
    })
  }

  render() {
    return (
      <div>
        <Card className='fileInputContainer'>
        Upload Profile Image:
        <br />
        <input type="file" onChange={this.imageUploadHandler} name='profileImage' />
        <img src={this.state.theFileFromServer} className='imageUpload'alt="" />
        <button onClick={this.clickSave}>Save</button>
        </Card>
      </div>
    );
  }
}

export default Image;
