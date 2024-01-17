import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import MyPhoneForm from './MyPhoneForm/MyPhoneForm';
import MyPhoneList from './MyPhoneList/MyPhoneList';

import styles from './my-phone.module.css';

const MyPhone = () => {
    const [contacts, setContacts] = useState(()=> {
        const data = JSON.parse(localStorage.getItem("contacts"));
        return data || [];
    });

    const [filter, setFilter] = useState("");

    const firstRender = useRef(true);

    useEffect(()=> {
        if(!firstRender.current) {
            localStorage.setItem("contacts", JSON.stringify(contacts));
        }
    }, [contacts]);

    useEffect(()=> {
        firstRender.current = false;
    }, [])

    const isDublicate = ({ name }) => {
        const normalizedName = name.toLowerCase();

        const dublicate = contacts.find(item => {
            const normalizedCurrentName = item.name.toLowerCase();
            return (normalizedCurrentName === normalizedName);
        })

        return Boolean(dublicate);
    }

    const addContact= (data) => {
        if (isDublicate(data)) {
            return alert(`${data.name} is already in contacts`);
        }

        setContacts(prevContacts=> {
            const newContact = {
                id: nanoid(),
                ...data,
            };

            return [...prevContacts, newContact];
        })
    }

    const deleteContact = (id) => {
        setContacts(prevContacts => prevContacts.filter(item => item.id !== id))
    }

    const changeFitler = ({ target }) => setFilter(target.value);

    const getFilteredContacts = () => {
        if (!filter) {
            return contacts;
        }

        const normalizedFilter = filter.toLowerCase();

        const filteredContacts = contacts.filter(({ name }) => {
            const normalizedName = name.toLowerCase();

            return (normalizedName.includes(normalizedFilter))
        });

        return filteredContacts;
    }

    const items = getFilteredContacts();

  return (
    <div className={styles.wrapper}>
        <h1>Phonebook</h1>
        <MyPhoneForm className={styles.phoneForm} onSubmit={addContact} />
        <div className={styles.listWrapper}>
            <h1>Contacts</h1>
            <p>Find contacts by name</p>
            <input className={styles.filter} onChange={changeFitler} name="filter" placeholder="" />
            <MyPhoneList items={items} deleteContact={deleteContact} />
        </div>
    </div>
)
};

export default MyPhone;
