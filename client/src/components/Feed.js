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
    }
  }

  fetchData = (pageNum) => {
    let postUrl = 'http://localhost:8080/feed/' + pageNum;
    fetch(postUrl)
      .then(res => res.json())
      .then(data => {
        this.setState({
          posts: [...this.state.posts, ...data]
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
  render() {
    return (
      <div className="postDivContainer">
        {this.state.posts.map((postdata, idx) => (<Post key={idx} post={postdata} />))}
      </div>

    );
  }
}


class Post extends Component {

  likedToggle = () => {
    // console.log('liked')
    if (this.props.likeAll === undefined) {
      this.setState({
        liked: !this.state.liked
      })
      this.props.updateLikes(this.state.liked, this.props.post)
    }
  }

  render() {

    if (this.props.post.rejection) {
      return (


        <div className="postDiv" key={this.props.post.id}>
          <div className="userProfile">
            <Avatar alt="Remy Sharp" src={this.props.post.profileImage} />
            <div className="username"><span >{this.props.post.username} </span> </div>
          </div>
          <div className="userFeed"><label>I was rejected from <strong>{this.props.post.company}</strong> for the <strong>{this.props.post.title}</strong> positon</label></div>

          <EmojiTime post={this.props.post} />

        </div>
      )
    }
    else if (this.props.post.see_title && this.props.post.see_company) {
      return (
        <div className="postDiv" key={this.props.post.id}>
          <div className="userProfile">
            <Avatar alt="Remy Sharp" src={this.props.post.profileImage} />
            <div className="username"><span >{this.props.post.username} </span> </div>
          </div>
          <div className="userFeed"><label>I applied for a job</label></div>

          <EmojiTime post={this.props.post} />

        </div>
      )

    }
    else if (this.props.post.see_title) {
      return (
        <div className="postDiv" key={this.props.post.id}>
          <div className="userProfile">
            <Avatar alt="Remy Sharp" src={this.props.post.profileImage} />
            <div className="username"><span >{this.props.post.username} </span> </div>
          </div>
          <div className='fadedLine'></div>
          <div className="userFeed"> I applied at <strong>{this.props.post.company}</strong></div>

          <EmojiTime post={this.props.post} />

        </div>
      )
    }
    else if (this.props.post.see_company) {
      return (
        <div className="postDiv" key={this.props.post.id}>
          <div className="userProfile">
            <Avatar alt="Remy Sharp" src={this.props.post.profileImage} />
            <div className="username"><span >{this.props.post.username} </span> </div>
          </div>
          <div className="userFeed">I applied for a <strong>{this.props.post.title}</strong> position</div>
          <EmojiTime post={this.props.post} />

        </div>
      )
    }
    else {
      return (
        <div className="postDiv" key={this.props.post.id}>
          <div className="userProfile">
            <Avatar alt="Remy Sharp" src={this.props.post.profileImage} />
            <div className="username"><span >{this.props.post.username} </span> </div>
          </div>
          <div className="userFeed">
            I applied for a <strong>{this.props.post.title}</strong> position at <strong>{this.props.post.company}</strong>
          </div>
          <EmojiTime post={this.props.post} />

        </div>
      )
    }


  }
}


class EmojiTime extends Component {
  
  render() {

    return (
      <div className="emojiContainer">
        <GiveGrinning post={this.props.post} />
        <RaisedHands post={this.props.post} />
        <GiveHeart post={this.props.post} />
        <GiveTada post={this.props.post} />
      </div>
    )
  }
}

class RaisedHands extends Component {
  constructor(props) {
    super(props)
    this.state = {
      raised_hands: 0,
      buttonCLicked: false
    }
  }

  componentDidMount() {
    this.setState({
      raised_hands: this.props.post.raised_hands,
      buttonCLicked: false
    })
  }

  clickRaise = (emojiURL) => {
    fetch(emojiURL)
    this.setState({
      ...this.state,
      raised_hands: this.state.raised_hands + 1,
      buttonCLicked: true

    })

  }

  render() {
    let sender = 1
    let postID = this.props.post.id
    let user = this.props.post.user_id
    let emotion = "raised_hands"
    let url = `http://localhost:8080/emoji/${sender},${user},${postID},${emotion}`

    if (this.state.buttonCLicked) {
      return (
        <div className="emojiBox" style={{ background: 'red' }}>
          <div>
            <img src={raised_hands} alt="" className="emoji" />
          </div>

          <div><h5>{this.state.raised_hands}</h5></div>

        </div>
      )
    } else {
      return (
        <div className="emojiBox" onClick={() => this.clickRaise(url)}>
          <div>
            <img src={raised_hands} alt="" className="emoji" />
          </div>
          <div><h5>{this.state.raised_hands}</h5></div>

        </div>
      )
    }
  }
}

class GiveHeart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      heart: 0,
      buttonCLicked: false
    }
  }

  componentDidMount() {
    this.setState({
      heart: this.props.post.heart,
      buttonCLicked: false
    })
  }

  clickHeart = (emojiURL) => {
    fetch(emojiURL)
    this.setState({
      ...this.state,
      heart: this.state.heart + 1,
      buttonCLicked: true

    })
  }

  render() {
    let sender = 1
    let postID = this.props.post.id
    let user = this.props.post.user_id
    let emotion = "heart"
    let url = `http://localhost:8080/emoji/${sender},${user},${postID},${emotion}`


    if (this.state.buttonCLicked) {
      return (
        <div className="emojiBox" style={{ background: 'red' }}>
          <div>
            <img src={heart} alt="" className="emoji" />
          </div>
          <div><h5>{this.state.heart}</h5></div>
        </div>
      )
    } else {
      return (
        <div className="emojiBox" onClick={() => this.clickHeart(url)}>
          <div>
            <img src={heart} alt="" className="emoji" />
          </div>
          <div><h5>{this.state.heart}</h5></div>
        </div>
      )
    }
  }
}

class GiveTada extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tada: 0,
      buttonCLicked: false
    }
  }

  componentDidMount() {
    this.setState({
      tada: this.props.post.tada,
      buttonCLicked: false
    })
  }

  clickTada = (emojiURL) => {
    fetch(emojiURL)
    this.setState({
      ...this.state,
      tada: this.state.tada + 1,
      buttonCLicked: true

    })
  }

  render() {
    let sender = 1
    let postID = this.props.post.id
    let user = this.props.post.user_id
    let emotion = "tada"
    let url = `http://localhost:8080/emoji/${sender},${user},${postID},${emotion}`


    if (this.state.buttonCLicked) {
      return (
        <div className="emojiBox" style={{ background: 'red' }}>
          <div>
            <img src={tada} alt="" className="emoji" />
          </div>
          <div><h5>{this.state.tada}</h5></div>
        </div>
      )
    } else {
      return (
        <div className="emojiBox" onClick={() => this.clickTada(url)}>
          <div>
            <img src={tada} alt="" className="emoji" />
          </div>
          <div><h5>{this.state.tada}</h5></div>
        </div>
      )
    }
  }
}

class GiveGrinning extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grinning: 0,
      buttonCLicked: false
    }
  }

  componentDidMount() {
    this.setState({
      grinning: this.props.post.grinning,
      buttonCLicked: false
    })
  }

  clickGrin = (emojiURL) => {
    fetch(emojiURL)
    this.setState({
      ...this.state,
      grinning: this.state.grinning + 1,
      buttonCLicked: true

    })
  }

  render() {
    let sender = 1
    let postID = this.props.post.id
    let user = this.props.post.user_id
    let emotion = "grinning"
    let url = `http://localhost:8080/emoji/${sender},${user},${postID},${emotion}`


    if (this.state.buttonCLicked) {
      return (
        <div className="emojiBox" style={{ background: 'red' }}>
          <div>
            <img src={grinning} alt="" className="emoji" />
          </div>
          <div><h5>{this.state.grinning}</h5></div>
        </div>
      )
    } else {
      return (
        <div className="emojiBox" onClick={() => this.clickGrin(url)}>
          <div>
            <img src={grinning} alt="" className="emoji" />
          </div>
          <div><h5>{this.state.grinning}</h5></div>
        </div>
      )
    }
  }
}

export default Feed;