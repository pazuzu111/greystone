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
         const data = {
            income: 300012, // Annual collected rent (Sum of all rents * 12)
            expenses: 22000, // Total expenses value
            rate: 3.22, // cap rate
            noi: 20000, // Net Operating Income (income - expenses)
            address: {
                street: '1 bacon street',
                city: 'brooklyn',
                state: 'NY',
                county: 'kings county',
                zip: '11216'
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
            console.log(response.terms)
                this.setState({
                terms: response.terms
            })


        })
    }


    handleSubmit = (e) => {
        e.preventDefault()

        let expenseSum = 0
        let income = 0

        this.state.expenses.map(i => {
            return expenseSum += parseInt(this[`${i}`].value)
        })

        this.state.rentRoll.map((index, el) => {
            return income += parseInt(this[`${el}0`]['value'])
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
            this.setState({
                terms: response.terms[0]
            })
        })
    }

    addProperty = () => {
        this.setState({
            rentRoll: this.state.rentRoll.concat([['monthlyRent','unit Number','vacancy','bedrooms','bathrooms','annual-total']])
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
                                    ref={input => {this[`{i}`] = input}}
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
                                        ref={input => {this[`${i}${el}`] = input}}
                                        placeholder={i}
                                     />
                                </div>
                            )
                        })
                    })

    let terms = this.state.terms?
                    this.state.terms.map((x, i) => {
                        if(i < 3)
                        {
                            return (
                                <div key={i}>
                                    <h2> {i+1})</h2>
                                    <h3> Loan amount: ${x['75% LTV Proceeds'].toFixed(2)}</h3>
                                    <h3> Debt Rate: {x['Interest Rate'] * 100}%</h3>
                                    <h3> Value: ${x['Value'].toFixed(2)}</h3>
                                    <br />
                                </div>
                            )
                        }
                    })
                    :
                    null


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
                <br />

            <input name="capRate" />

            <button onClick={this.handleSubmit}> send data </button>

            <h1> TERMS </h1>
            {terms}
        </div>


    )
  }


}
