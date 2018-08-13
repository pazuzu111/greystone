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


    handleSubmit = (e) => {
        e.preventDefault()

        let expenseSum = 0
        let income = 0

        this.state.expenses.map(i => {
            return expenseSum += parseInt(this[`expense${i}`].value)
        })

        this.state.rentRoll.map((index, el) => {
            return income += parseInt(this[`rentInput${el}0`]['value'])
        })

        const data = {
            income: income * 12, // Annual collected rent (Sum of all rents * 12)
            expenses: expenseSum, // Total expenses value
            rate: 3.22, // cap rate
            noi: this.income - this.expenses, // Net Operating Income (income - expenses)
            address: {
                street: this.street.value,
                city: this.city.value,
                state: this.state.value,
                county: this.county.value,
                zip: this.zip.value
            }
        }

        fetch('https://cors-anywhere.herokuapp.com/https://script.google.com/macros/s/AKfycbwPGz6uQQS9IW33ASPYlcWaEtRMD8eDAK1ONg7lT2dREXpaSUYh/exec', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
            console.log(response)
        })
    }

    addProperty = () => {
        this.setState({
            rentRoll: this.state.rentRoll.concat([[0,1,2,3,4,5,6,7]])
        })

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
