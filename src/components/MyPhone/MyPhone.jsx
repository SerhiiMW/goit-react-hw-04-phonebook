import { Component } from "react";
import { nanoid } from "nanoid";

import MyPhoneForm from "./MyPhoneForm/MyPhoneForm";
import MyPhoneList from "./MyPhoneList/MyPhoneList";

import styles from "./my-phone.module.css";

class MyPhone extends Component {
    state = {
        contacts: [
            {
                id: nanoid(),
                name: 'Rosie Simpson',
                number: '459-12-56'
            },
        ],
        filter: ""
    }

    componentDidMount() {
        const contacts = JSON.parse(localStorage.getItem("contacts"));
        if (contacts?.length) {
            this.setState({
                contacts,
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { contacts } = this.state;
        if (prevState.contacts.length !== contacts.length) {
            localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
        }
    }


    isDublicate({name}) {
        const {contacts} = this.state;
        const normalizedName = name.toLowerCase();
        
        const dublicate = contacts.find(item => {
            const normalizedCurrentName = item.name.toLowerCase();
            return (normalizedCurrentName === normalizedName);
        })

        return Boolean(dublicate);
    }

    addContact = (data) => {        
        if(this.isDublicate(data)) {
           return alert(`${data.name} is already in contacts`);
        }

        this.setState(({contacts}) => {
            const newContact = {
                id: nanoid(),
                ...data,
            }

            return {
                contacts: [...contacts, newContact]
            }
        })
    }

    deleteContact = (id)=> {
        this.setState(({contacts}) => {
            const newContact = contacts.filter(item => item.id !== id);

            return {
                contacts: newContact,
            }
        })
    }

    changeFitler = ({target})=> {
        this.setState({
            filter: target.value
        })
    }

    getFilteredContacts() {
        const {filter, contacts} = this.state;
        if(!filter) {
            return contacts;
        }

        const normalizedFilter = filter.toLowerCase();

        const filteredContacts = contacts.filter(({name}) => {
            const normalizedName = name.toLowerCase();

            return (normalizedName.includes(normalizedFilter))
        });

        return filteredContacts;
    }

    render() {
        const {addContact, deleteContact, changeFitler} = this;
        const contacts = this.getFilteredContacts();

        return (
            <div className={styles.wrapper}>
                <h1>Phonebook</h1>
                <MyPhoneForm className={styles.phoneForm} onSubmit={addContact} />
                <div className={styles.listWrapper}>
                    <h1>Contacts</h1>
                    <p>Find contacts by name</p>
                    <input className={styles.filter} onChange={changeFitler} name="filter" placeholder="" />
                    <MyPhoneList items={contacts} deleteContact={deleteContact} />
                </div>
            </div>
        )
    }
}

export default MyPhone;