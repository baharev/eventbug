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
      type: 'TOGGLE_IMAGE',
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
  const t1 = {image: "./images/Sacher.JPG"}
  const t2 = {image: "./images/Hundert.JPG"}
  const first  = selected.indexOf("Sacher")  !== -1 /* Is t1 selected? */
  const second = selected.indexOf("Hundert") !== -1 /* Is t2 selected? */
  return (
    <div className="topleveldiv">
      <div className="left_panel">
        <Tile image={t1.image} id={"Sacher"}  dispatch={dispatch} />
        <Tile image={t2.image} id={"Hundert"} dispatch={dispatch} />
      </div>
      <div className="right_panel">
        {first  && <Tile image={t1.image} id={"Sacher"}  dispatch={dispatch} />}
        {second && <Tile image={t2.image} id={"Hundert"} dispatch={dispatch} />}
      </div>
    </div>
  )
}

/*----------------------------------------------------------------------------*/

export const initialState = {
 selected: ["Sacher", "Hundert"],
}

export const rootReducer = (state, action) => {
 switch (action.type) {
   case 'TOGGLE_IMAGE':
     const id = action.payload
     const selected = state.selected
     const present = selected.indexOf(id) !== -1
     /* Toggle: If present, we remove it; if not present, we add it. */
     if (present)
       return { selected: selected.filter(e => e !== id)}
     return { selected: [...selected, id]}
   default:
     return state
 }
}

export default connect(state => state)(App)
