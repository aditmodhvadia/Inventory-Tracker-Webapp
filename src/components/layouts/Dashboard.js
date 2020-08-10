import React, { Component } from 'react'
import InventoryItems from '../inventoryitems/InventoryItems'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <InventoryItems />
            </div>
        )
    }
}

export default Dashboard