import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import FormConfig from './FormConfig';


class ContactData extends Component {


    state = {
        orderForm: {
            name: new FormConfig('input')
                .setValidation({ required: true, desc: 'Name must not be empty' })
                .setPlaceHolder('Your Name').build(),
            street: new FormConfig('input')
                .setValidation({ required: true, desc: 'Street must not e empty' })
                .setPlaceHolder('Street').build(),
            zipCode: new FormConfig('input')
                .setValidation({
                    required: true,
                    desc: 'Zip must have minimim 5 to maxium 10 digits',
                    minLength: 5, maxLength: 10
                })
                .setPlaceHolder('Zip').build(),
            country: new FormConfig('input')
                .setValidation({ required: true, desc: 'Country must not be empty' })
                .setPlaceHolder('Country').build(),
            email: new FormConfig('input', 'email')
                .setValidation({ required: true, desc: 'email must not be empty' })
                .setPlaceHolder('Your Email').build(),
            deliveryMethod: new FormConfig('select')
                .setValid(true)
                .setValue('fastest')
                .setOptions([
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]).build()
        },
        loading: false,
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        console.log(formData);
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentfier) => {

        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = { ...updatedOrderForm[inputIdentfier] };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentfier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentfier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentfier].valid && formIsValid
        }
        console.log(formIsValid);
        this.setState({ orderForm: updatedOrderForm, formIsValid });
    }

    render() {

        let formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {/* <Input elementType="..." elementConfig="..." value="..." /> */}
                {formElementArray.map((formElement) => {
                    return <Input
                        touched={formElement.config.touched}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                    />
                })}
                <Button
                    btnType="Success"
                    disabled={!this.state.formIsValid}>
                    ORDER
                    </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;