import React, { Component } from 'react';
import './App.css';
import grinning from '../img/grinning.png';
import heart from '../img/heart.png';
import raised_hands from '../img/raised_hands.png';
import tada from '../img/tada.png';



class Feed extends Component {

    constructor(props) {
      super(props);
      this.state = {
        posts: [],
        page: 0,
        liked: false,
        count: 0
  
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
        
         
         <div className="postDivContainer">
           {this.state.posts.map((postdata,idx) => (<Post key={idx} post={postdata} />))}
         </div>
       
      );
    }
    }


class Post extends Component {

  likedToggle = () => {
    // console.log('liked')
    if(this.props.likeAll===undefined){
    this.setState ({
      liked : !this.state.liked
    })
    this.props.updateLikes(this.state.liked,this.props.post)
  }
  }
  
    render() {
    return (
      <div className="postDiv">
        <div style={{fontSize:'10pt'}}>{this.props.post.title}</div>
        <p style={{fontSize:'10pt'}}>{this.props.post.company}</p>
        <div className="emojiContainer">
          <div className="emojiBox">
            <div><img src={grinning} alt="" className="emoji" onClick={this.likedToggle}/></div>
            <div><h5>{this.props.post.grinning}</h5></div>
            
          </div>
          <div className="emojiBox">
            <div><img src={raised_hands} alt="" className="emoji" onClick={this.likedToggle}/></div>
            <div><h5>{this.props.post.raised_hands}</h5></div>
            
          </div>
          <div className="emojiBox">
            <div><img src={heart} alt="" className="emoji" onClick={this.likedToggle}/></div>
            <div><h5>{this.props.post.heart}</h5></div>
            
          </div>
          <div className="emojiBox">
            <div><img src={tada} alt="" className="emoji" onClick={this.likedToggle}/></div>
            <div><h5>{this.props.post.tada}</h5></div>
            
          </div>
        
        
        
        </div>
      
      </div>
    )
  }
}
export default Feed;