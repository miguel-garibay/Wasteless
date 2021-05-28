import React, { useState, useEffect } from 'react';
import WastedItem from './WastedItem.jsx';

function MoneyWasted(props) {

  const [currState, setState] = useState(props.state);

  useEffect(() => {
      fetch('/api/disposed')
          .then((items) => {
              const data = items.json();
              return data;
          })
          .then((data) => {
            console.log('this is the data' , data)
              const returnedDisposedItems = [];
              const returnedDisposedItemNames = [];
              for (const el of data) {
                  returnedDisposedItems.push(el);
                  returnedDisposedItemNames.push(el.item);
              }

              setState({
                  ...currState,
                  listOfDisposedItems: returnedDisposedItems,
                  listOfDisposedItemNames: returnedDisposedItemNames,
              })
          });
  }, []);


  const wastedListArray = [];
  for (let i = 0; i < currState?.listOfDisposedItemNames.length; i++) {
      console.log('disposed loop occured' + i);
      wastedListArray.push(
          <WastedItem
              itemName={currState?.listOfDisposedItemNames[i]}
              key={i}
              type={currState?.listOfDisposedItems[i].type}
              id={i + 1}
              foodId={currState?.listOfDisposedItemNames[i]}
              setState={setState}
              quantity={currState?.listOfDisposedItems[i].quantity}
              price={currState?.listOfDisposedItems[i].price}
          />
      );
  }

  const totalMoneyWasted = currState?.listOfDisposedItems.reduce((sum, itemObject) => {
    return sum += itemObject.price;
  }, 0);

  return (
    <div className="tableContainer">
    <h2 id="tableTitle">Money Wasted</h2>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Food</th>
          <th>Quantity</th>
          <th>Price</th>          
        </tr>
      </thead>
      <tbody>
        {wastedListArray}
      </tbody>
    </table>
    <h2 id="moneyWasted">Total Money Wasted: ${totalMoneyWasted} </h2>
    </div>
  )
}

export default MoneyWasted;


