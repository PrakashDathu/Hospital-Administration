
export function updateObject(oldObject, newValues) {
    // Encapsulate the idea of passing a new object as the first parameter
    // to Object.assign to ensure we correctly copy data instead of mutating
    return Object.assign({}, oldObject, newValues)
}

export function updateItemInArray(array, itemId,prop, updateItemCallback) {
    const updatedItems = array.map(item => {
        if (item[prop].toString() !== itemId.toString()) {
            // Since we only want to update one item, preserve all others as they are now
            return item
        }
        // Use the provided callback to create an updated item
        const updatedItem = updateItemCallback(item);
        console.log("updateItem "+updatedItem);
        return updatedItem
    });

    return updatedItems
}

export function deleteItemInArray(array, itemId, prop){
    return array.filter(function(el){
        return el[prop]!==itemId;
    });
}

export const changeStoreState = (type, data) => {
    return {
        type: type,
        payload: data
    };
};

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export function formatDate(d){
    const date = new Date(d);
    return monthNames[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear();
}