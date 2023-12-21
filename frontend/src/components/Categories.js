import React, { Component } from 'react'

export class Categories extends Component {
    constructor(props) {
        super(props)
        this.state = { categories: [] }
    }

    componentDidMount() {
      fetch('http://localhost:3001/api/category')
        .then((response) => {
          return response.json();
        })
        .then(data => this.setState({ categories: data }));
      }

  render() {
    return (
      <div className='categories'>
        {this.state.categories.map(el => (
            <div key={el.key} onClick={() => this.props.chooseCategory(el.key)}>{el.name}</div>
        ))}
      </div>
    )
  }
}

export default Categories