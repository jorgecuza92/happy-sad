import React, { Component } from 'react';
import './App.css';
import grinning from '../img/grinning.png';
import heart from '../img/heart.png';
import raised_hands from '../img/raised_hands.png';
import tada from '../img/tada.png';
import Avatar from '@material-ui/core/Avatar';



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
 
      


      if(this.props.post.rejection) {
        return (

         
          <div className="postDiv">
            <div className="userProfile">
              <Avatar alt="Remy Sharp" src={this.props.post.profileImage} />
              <div className="username"><span >{this.props.post.username} </span> </div> 
            </div>
            <div className="userFeed"><label>was rejected from <strong>{this.props.post.company}</strong> for the <strong>{this.props.post.title}</strong> possiton</label></div>
            
            <EmojiTime post={this.props.post} />
          
          </div>
        )
      }
      else if (this.props.post.see_title && this.props.post.see_company) {
        return (
          <div className="postDiv">
            <div className="userProfile">
              <Avatar alt="Remy Sharp" src={this.props.post.profileImage} />
              <div className="username"><span >{this.props.post.username} </span> </div>
            </div>
              <div className="userFeed"><label><strong>Applied for a job</strong></label></div>
          
            <EmojiTime post={this.props.post} />
          
          </div>
        )
 
      } 
      else if (this.props.post.see_title) {
        return (
          <div className="postDiv">
            <div className="userProfile">
              <Avatar alt="Remy Sharp" src={this.props.post.profileImage} />
              <div className="username"><span >{this.props.post.username} </span> </div>
            </div>
            <div className="userFeed"> Applied at <strong>{this.props.post.company}</strong> company</div>
    
            <EmojiTime post={this.props.post} />
          
          </div>
        )
      } 
      else if (this.props.post.see_company) {
        return (
          <div className="postDiv">
            <div className="userProfile">
              <Avatar alt="Remy Sharp" src={this.props.post.profileImage} />
              <div className="username"><span >{this.props.post.username} </span> </div>
            </div>
            <div className="userFeed">Applied for <strong>{this.props.post.title}</strong> possition</div>
            <EmojiTime post={this.props.post} />
          
          </div>
        )
      } 
      else {
        return (
          <div className="postDiv">
            <div className="userProfile">
              <Avatar alt="Remy Sharp" src={this.props.post.profileImage} />
              <div className="username"><span >{this.props.post.username} </span> </div>
            </div>
            <div className="userFeed"><strong>{this.props.post.title}</strong>
            <p><strong>{this.props.post.company}</strong></p>
            </div>
            <EmojiTime post={this.props.post} />
          
          </div>
        )
      }

  
  }
}


class EmojiTime extends Component {

  constructor  (props) {
     super(props)
     this.state = {
       grinning: this.props.post.grinning,
       tada:this.props.post.tada,
       heart: this.props.post.heart,
       raised_hands: this.props.post.raised_hands
     }
  }
  

  clickGrin = (emojiURL) => {
    fetch(emojiURL)
    this.setState ({
      ...this.state,
      grinning: this.state.grinning + 1
      
    })

  }

  clickHeart = (emojiURL) => {
    fetch(emojiURL)
    this.setState ({
      ...this.state,
      heart: this.state.heart + 1
      
    })

  }
  clickTada = (emojiURL) => {
    fetch(emojiURL)
    this.setState ({
      ...this.state,
      tada: this.state.tada + 1
      
    })

  }
  clickRaise = (emojiURL) => {
    fetch(emojiURL)
    this.setState ({
      ...this.state,
      raised_hands: this.state.raised_hands + 1
      
    })

  }

  render () {
  let url = "http://localhost:8080/emoji/" + "1," + `${this.props.post.user_id}` + "," + `${this.props.post.id}` + "," 
      let eg = url + "grinning"
      let erh = url + "raised_hands"
      let eh = url + "heart"
      let et = url + "tada"
    
      return (


<div className="emojiContainer">
              <div className="emojiBox">
                <div>
                 
                  <img src={grinning} alt="" className="emoji" onClick={() => this.clickGrin(eg)}/>
             
              </div>
                <div><h5>{this.state.grinning}</h5></div>
                
              </div>
              <div className="emojiBox">
                <div>
               
                  <img src={raised_hands} alt="" className="emoji" onClick={() => this.clickRaise(erh)}/>
 
                </div>
                <div><h5>{this.props.post.raised_hands}</h5></div>
                
              </div>
              <div className="emojiBox">
                <div>
               
                  <img src={heart} alt="" className="emoji" onClick={() => this.clickHeart(eh)}/>
               
                  </div>
                <div><h5>{this.props.post.heart}</h5></div>
                
              </div>
              <div className="emojiBox">
               
                <div>
                  <img src={tada} alt="" className="emoji" onClick={() => this.clickTada(et)}/>
                </div>
               
                <div><h5>{this.props.post.tada}</h5></div>
                
              </div>
            
            
            
            </div>
      )
}}


export default Feed;