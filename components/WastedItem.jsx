import React from 'react'

function WastedItem(props) {
  return (
    <tr>
      <td>{props.type}</td>
      <td>{props.itemName}</td>
      <td>{props.quantity}</td>
      <td>{props.price}</td>          
    </tr>
  )
}

export default WastedItem;