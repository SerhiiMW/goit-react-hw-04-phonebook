import styles from "./my-phoneList-module.css";

const MyPhoneList = ({ items, deleteContact }) => {
    const elements = items.map(({id, name, number})=> 
        <li key={id}>{name}: {number} <button className={styles.btn} onClick={()=> deleteContact(id)} type="button">Delete</button></li>)
    
        return (
            <ul className={styles.list}>
                {elements}
            </ul>
    )
}

export default MyPhoneList;