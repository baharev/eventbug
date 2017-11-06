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
      type: 'TOUCHED',
      payload: this.props.id
    })
  }

  render() {
    return (
      <div className={`tile`}
        onMouseDown={this.toggle}
        onTouchStart={this.toggle}
        onTouchEnd={swallow}>
        <img src={this.props.image} alt="" />
      </div>
    )
  }
}

const App = ({selected, dispatch }) => {
  const first  = selected.indexOf("Sacher")  !== -1
  const second = selected.indexOf("Hundert") !== -1
  return (
    <div className="panel">
      {first  && <Tile image={"./images/Sacher.JPG"}  id={"Sacher"}  dispatch={dispatch} />}
      {second && <Tile image={"./images/Hundert.JPG"} id={"Hundert"} dispatch={dispatch} />}
    </div>
  )
}

/*----------------------------------------------------------------------------*/

export const initialState = {
 selected: ["Sacher", "Hundert"],
}

export const rootReducer = (state, action) => {
 switch (action.type) {
   case 'TOUCHED':
     const id = action.payload
     return { selected: state.selected.filter(e => e !== id)}
   default:
     return state
 }
}

export default connect(state => state)(App)
