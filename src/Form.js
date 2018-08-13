import React, { Component } from 'react';


export default class Form extends Component {
    constructor() {
        super();

        this.state = {
            address: ['street','city','state','county','zip'],
            rentRoll: [['monthlyRent','unit Number','vacancy','bedrooms','bathrooms','annual-total']],
            expenses: ['marketing','taxes','insurance','repairs','administration','payroll','utility','management'],
            terms: null,
        }
    }

    componentDidMount() {
        console.log(this)
    }

    //submit property info
    handleSubmit = (e) => {
        e.preventDefault()

        let expenseSum = 0
        let income = 0

        //get the sum of expenses
        this.state.expenses.map(i => {
            return expenseSum += parseInt(this[`${i}`].value)
        })

        //get the income
        this.state.rentRoll.map((index, el) => {
            return income += parseInt(this[`monthlyRent${el}`]['value'])
        })

        const data = {
            income: income * 12, // Annual collected rent (Sum of all rents * 12)
            expenses: expenseSum, // Total expenses value
            rate: this.capRate.value, // cap rate
            noi: this.income - this.expenses, // Net Operating Income (income - expenses)
            address: {
                street: this.street.value,
                city: this.city.value,
                state: this.state.value,
                county: this.county.value,
                zip: this.zip.value
            }
        }

        //make post request
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
            this.setState({
                terms: response.terms
            })
        })
    }

    //add another set of property inputs
    addProperty = () => {
        this.setState({
            rentRoll: this.state.rentRoll.concat([['monthlyRent','unit Number','vacancy','bedrooms','bathrooms','annual-total']])
        })
    }

  render() {

    //render address inputs
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

    //render expenses inputs
    let expenses = this.state.expenses.map((x, i) => {
                        return (
                            <div key={i}>
                                <input
                                    ref={input => {this[`${x}`] = input}}
                                    placeholder={x}
                                />
                            </div>
                        )
                    })

    //render rent roll inputs
    let rentRoll = this.state.rentRoll.map((index, el) => {
                        return index.map(i => {
                            return (
                                <div key={i}>
                                    <input
                                        ref={input => {this[`${i}${el}`] = input}}
                                        placeholder={i}
                                     />
                                </div>
                            )
                        })
                    })

    //render terms output
    let terms = this.state.terms?
                    this.state.terms.map((x, i) => {
                        if(i < 3)
                        {
                            return (
                                <div key={i}>
                                    <h2> {i+1}.</h2>
                                    <h3> Agency: {x['Agency']}</h3>
                                    <h3> Loan amount: ${x['75% LTV Proceeds'].toFixed(2)}</h3>
                                    <h3> Debt Rate: {x['Interest Rate'] * 100}%</h3>
                                    <h3> Value: ${x['Value'].toFixed(2)}</h3>
                                    <br />
                                </div>
                            )
                        }
                    })
                    :
                    <h3>waiting for property info...</h3>


    return (
         <div>
            <label> Enter Address </label>
                {address}

            <label> Enter Property Details</label>
                {rentRoll}
                <button onClick={this.addProperty}> add property </button>
                <br />

            <label> Enter Expenses </label>
                {expenses}
                <br />

            <label> Enter Cap Rate </label>
                <input
                    ref={input => {this.capRate = input}}
                    placeholder={'%'}
                />
                <br />

            <button onClick={this.handleSubmit}> send data </button>

            <h1> TERMS </h1>
                {terms}
        </div>
    )
  }
}
