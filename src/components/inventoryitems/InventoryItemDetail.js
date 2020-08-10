import React from 'react'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux';
import LoadingSpinner from '../layouts/LoadingSpinner';

const InventoryItemDetail = (props) => {
    const firestore = useFirestore()
    const { auth } = useSelector((state) => state.firebase);

    console.log(props);

    useFirestoreConnect([
        {
            collection: `users/${auth.uid}/inventoryItems`,
            storeAs: 'item',
            doc: props.match.params.id.toString()
        }
    ])

    const item = useSelector(state => state.firestore.ordered.item && state.firestore.ordered.item[0])

    if (item) {
        console.log(item);
        return (
            <div>

                <h1>Item Detail</h1>
                <p>{item.itemName}</p>
            </div>
        )
    }

    return (
        <LoadingSpinner />
    )
}

export default InventoryItemDetail
