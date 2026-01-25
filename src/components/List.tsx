
// interface is used to define the shape of props for a generic List component
interface ListProps<ListItem> {
    // T is a generic type parameter. generics allow the List component to be flexible and work with any data type
    items: ListItem[],
    renderItem: (item: ListItem) => React.ReactNode
    // renderItem function is a prop that takes an item of type T and returns a React node, enabling custom rendering of each list item.
}

// list component definition using generics <T,> is syntax to define a generic component in TypeScript
export const List = <ListItem,>({ items, renderItem }: ListProps<ListItem>) => { 
    return (   
        <ul>
            {items.map((item, index) => (
                <li key={index}>
                    {renderItem(item)}
                </li>  
            ))}
        </ul>
    );
}   

