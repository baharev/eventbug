import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import './app.css'

const swallow = (e) => {
  console.log(e.type)
  e.preventDefault()
  e.stopPropagation()
}

class Tile extends PureComponent {

  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
  }

  toggle(e) {
    swallow(e)
    console.log('id: ', this.props.id)
    this.props.dispatch({
      type: 'REMOVE_TOUCHED',
      payload: this.props.id
    })
  }

  render() {
    return (
      <div className={`tile`} id={this.props.id}
        onMouseDown={this.toggle}>
        <div className="box" style={{backgroundColor: this.props.id}}> </div>
      </div>
    )
  }

  componentDidMount() {
    const self = document.getElementById(this.props.id)
    console.log('adding listener to: ', self)
    self.addEventListener('touchstart', this.toggle)
    self.addEventListener('touchend', swallow)
  }

  componentWillUnmount() {
    const self = document.getElementById(this.props.id)
    console.log('removing listner from: ', self)
    self.removeEventListener('touchstart', this.toggle)
    self.removeEventListener('touchend', swallow)
  }
}

const App = ({boxes, dispatch }) => {
  const first  = boxes.indexOf("blue")  !== -1
  const second = boxes.indexOf("green") !== -1
  return (
    <div>
      {first  && <Tile id={"blue"}  dispatch={dispatch} />}
      {second && <Tile id={"green"} dispatch={dispatch} />}
    </div>
  )
}

/*----------------------------------------------------------------------------*/

export const initialState = {
 boxes: ["blue", "green"],
}

export const rootReducer = (state, action) => {
 switch (action.type) {
   case 'REMOVE_TOUCHED':
     const id = action.payload
     return { boxes: state.boxes.filter(e => e !== id)}
   default:
     return state
 }
}

export default connect(state => state)(App)
