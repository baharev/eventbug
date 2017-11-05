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
    console.log('pos: ', this.props.pos)
    this.props.dispatch({
      type: 'TOGGLE_IMAGE',
      payload: this.props.pos
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
  const t1 = {image: "./images/CIMG0531.JPG"}
  const t2 = {image: "./images/CIMG0924.JPG"}
  const first  = selected.indexOf(0) !== -1 /* Is t1 selected? */
  const second = selected.indexOf(1) !== -1 /* Is t2 selected? */
  return (
    <div className="topleveldiv">
      <div className="left_panel">
        <Tile key={"A"} image={t1.image} pos={0} dispatch={dispatch} />
        <Tile key={"B"} image={t2.image} pos={1} dispatch={dispatch} />
      </div>
      <div className="right_panel">
        {first  && <Tile key={"one"} image={t1.image} pos={0} dispatch={dispatch} />}
        {second && <Tile key={"two"} image={t2.image} pos={1} dispatch={dispatch} />}
      </div>
    </div>
  )
}

/*----------------------------------------------------------------------------*/

export const initialState = {
 selected: [],
}

export const rootReducer = (state, action) => {
 switch (action.type) {
   case 'TOGGLE_IMAGE':
     const pos = action.payload
     const selected = state.selected
     const present = selected.indexOf(pos) !== -1
     if (present)
       /* If present, we remove it */
       return { selected: selected.filter(e => e !== pos)}
     /* If not present, we add it */
     return { selected: [...selected, pos]}
   default:
     return state
 }
}

export default connect(state => state)(App)
