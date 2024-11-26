import React, { Component } from 'react'

class personLifecycle extends Component {
  constructor(props) {
    super(props)
  
    this.state = {}

    console.log(this.state + 'constructed person')
  }

  componentDidMount(){
    setInterval(() => {console.log('the person was mounted on' + Date())}, 10000)
  }

  showProfile = () => {
    this.setState({...this.state, name: 'Ikenna', bio: 'broke', imgSrc: 'who fckn cares', profession: 'being broke'})
  }

  render() {
    console.log('person rendered')
    return (
        <>
        <div>
        <h1>Show my profile</h1>
        <p>Name: {this.state.name}</p>
        <p>Bio: {this.state.bio} </p>
        <p>ImgSrc: {this.state.imgSrc} </p>
        <p>Profession: {this.state.profession}</p>
        <button onClick={this.showProfile}>Show Profile</button>
        </div>
        </>
    )
  }
}

export default personLifecycle