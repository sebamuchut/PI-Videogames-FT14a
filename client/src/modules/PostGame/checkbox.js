import React from 'react'

export function CheckBox (props) {
    return (
      <li>
       <input key={this.post.id} onClick={props.handleCheck} type="checkbox" checked={this.post.isChecked} value={this.post.value} /> {this.post.value}
      </li>
    )
}

export default CheckBox