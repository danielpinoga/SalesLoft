import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class PeoplePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: []
    }
  }

  componentDidMount() {
    axios.get('/api/people')
      .then(response => {
        console.log('got it')
        this.setState({ people: response.data })
      })
  }


  render() {
    console.log('render')
    const peopleContent = this.state.people.map(person => {
      return (
        <div key={person.id}>
          Name = {person.first_name}
        </div>
      )
    })

    return (
      <div>
        People PAge
        {peopleContent}
      </div>
    )
  }
}


export default connect(null)(PeoplePage)