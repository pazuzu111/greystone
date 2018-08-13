import React, { Component } from 'react';


export default class Form extends Component {
  constructor() {
    super();

    this.state = {
      address: ['street','city','state','county','zip'],
      rentRoll: [['monthlyRent','unit Number','vacancy','bedrooms','bathrooms','annual total']],
      expenses: ['marketing','taxes','insurance','repairs','administration','payroll','utility','management'],
      capRate: 3.22
    }
  }


  render() {
    let address = this.state.address.map((x,i) => {
                    return (
                        <div key={i}>
                            <input
                                ref={input => {this[`${x}`] = input}}
                                placeholder={x}
                             />
                        </div>
                    )
                })

    let expenses = this.state.expenses.map(i => {
                        return (
                            <div key={i}>
                                <input
                                    ref={input => {this[`expense${i}`] = input}}
                                    placeholder={i}
                                 />
                            </div>
                        )
                    })

    let rentRoll = this.state.rentRoll.map((index, el) => {
                        return index.map(i => {
                            return (
                                <div key={i}>
                                    <input
                                        ref={input => {this[`rentInput${el}${i}`] = input}}
                                        placeholder={i}
                                     />
                                </div>
                            )
                        })
                    })
    return (
         <div>
            <label>Enter address</label>

            {address}


            <label>Enter rent roll</label>
            {rentRoll}
            <button onClick={this.addProperty}> add property </button>
           <br />

            <label>Enter expenses</label>
            {expenses}
           <br />

            <label>Enter cap rate</label>
                       <br />

            <input name="capRate" />

            <button onClick={this.handleSubmit}> send data </button>

        </div>


    )
  }


}
