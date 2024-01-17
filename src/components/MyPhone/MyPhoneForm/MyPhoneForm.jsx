import { useState } from "react";
import { nanoid } from "nanoid";

import styles from "./my-phoneForm-module.css";

const INITIAL_STATE = {
    name: "",
    number: "",
};

const MyPhoneForm = ({onSubmit}) => {
    const [state, setState] = useState({...INITIAL_STATE});


    const handleChange = ({target}) => {
        const {name, value} = target;
        setState({
            ...state,
            [name]: value,
        })
    }

    
    const handleSubmit = (e)=> {
        e.preventDefault();
        onSubmit({...state});
        reset();
    }
    const reset = () => {
        setState({...INITIAL_STATE});
    }
    const nameId = nanoid();
    const numberId = nanoid();
    const {name, number} = state;

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


export default MyPhoneForm;