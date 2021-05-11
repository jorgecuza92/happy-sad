import React, { Component } from 'react';
import './App.css'







class Feed extends Component {

    constructor(props) {
      super(props);
      this.state = {
        posts: [],
        page: 0
  
      }
    }
  
    fetchData = (pageNum) => {
      let postUrl = 'http://localhost:8080/feed/'+pageNum;
        console.log(postUrl)
      fetch(postUrl)
     .then(res=>res.json())
     .then(data => {
        this.setState({
            posts: [...this.state.posts,...data]
        })
     })
  
    }
  
    componentDidMount = () => {
      window.addEventListener('scroll', this.infiniteScroll);
      this.fetchData(this.state.page);
    }
  
    infiniteScroll = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        let newPage = this.state.page
        newPage++
    
        this.setState({
          page: newPage
        })
    
        this.fetchData(newPage)
      }
    }
    render () {
      return (
        
         
         <div>
           {this.state.posts.map((postdata,idx) => (<Post key={idx} post={postdata} />))}
         </div>
       
      );
    }
    }


class Post extends Component {
  
    render() {
    return (
      <div className="postDiv">
        <div style={{fontSize:'10pt'}}>{this.props.post.title}</div>
        <p style={{fontSize:'10pt'}}>{this.props.post.company}</p>
      </div>
    )
  }
}
export default Feed;