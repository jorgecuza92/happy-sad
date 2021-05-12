import React, { Component } from "react";
import axios from "axios";

class Image extends Component {
  state = {
    selectedImage: null,
  };

  imageSelectedHandler = (event) => {
    console.log(event.target.files[0].name)
    this.setState({
      selectedImage: event.target.files[0].name,

    });
  };

  imageUploadHandler = () => {
    const fd = new FormData();
    fd.append('image', this.state.selectedImage, this.state.selectedImage.name)
    axios.post('http://localhost:8080/upload', {

    })
      .then(res => {
        console.log(res)
      })
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.imageSelectedHandler} name='profileImage' />
        <button onClick={this.imageUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default Image;
