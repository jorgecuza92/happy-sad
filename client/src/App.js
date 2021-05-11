import logo from './logo.svg';
import './components/App.css';
import Application from './components/Application';
import Register from './components/Registration';
import Login from './components/Login';
import React, { Component } from 'react';

class Post extends Component {
  
  render() {
  return (
     <div className="postDiv">
    <div style={{fontSize:'10pt'}}>{this.props.post.title}</div>
    
    </div>
  )
}
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      page: 0

    }
  }

  fetchData = (pageNum) => {
    let postUrl = 'https://localhost8080/feed/'+pageNum;

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
    if (
      window.innerHeight + document.documentElement.scrollTop
      === document.documentElement.offsetHeight
    ) 
    {
      let newPage = this.state.page;
      newPage++;
      this.setState({
        page: newPage
      });
      
      this.fetchData(newPage);
    }
  }


  render () {
    return (
      <div className="App">
       <h1>Succeed At Failing</h1>
       <Application />
       
       <Register />
       <div>
         {this.state.posts.map((postdata,idx) => (<Post key={idx} post={postdata} />))}
       </div>
      </div>
    );
  }
  }

  

export default App;
