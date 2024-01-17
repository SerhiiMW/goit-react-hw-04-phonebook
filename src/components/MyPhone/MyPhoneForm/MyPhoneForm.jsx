import { Component } from "react";
import { nanoid } from "nanoid";

import styles from "./my-phoneForm-module.css";

const INITIAL_STATE = {
    name: "",
    number: "",
};

class MyPhoneForm extends Component {
    nameId = nanoid();
    numberId = nanoid();

    state = {...INITIAL_STATE}

    handleChange = ({target}) => {
        const {name, value} = target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e)=> {
        e.preventDefault();
        this.props.onSubmit({...this.state});
        this.reset();
    }

    reset() {
        this.setState({...INITIAL_STATE});
    }

    render() {
        const {nameId, numberId, handleSubmit, handleChange} = this;
        const {name, number} = this.state;
        
        return (
            <form onSubmit={handleSubmit} className={styles.formPhone}>
                <div className={styles.formGroup}>  
                    <label className={styles.phoneLabel} htmlFor={nameId}>Name</label>
                    <input value={name} type="text" name="name" required onChange={handleChange} id={nameId} placeholder="" />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.phoneLabel} htmlFor={numberId}>Number</label>
                    <input value={number} type="tel" name="number" required onChange={handleChange} id={numberId} placeholder="" />
                </div>
                <button className={styles.btnSubmit} type="submit">Add contact</button>
            </form>
        )
    }
}

export default MyPhoneForm;