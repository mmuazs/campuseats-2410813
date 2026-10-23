import MenuItemCard from './MenuItemCard';

function MenuList({ items, onAdd, favourites = [], onToggleFavourite }) {
    if (items.length === 0) {
        return <p className="muted">No items on this menu yet</p>
    }

    return (
        <div className="grid">
            {items.map((item) => (
                <MenuItemCard 
                    key={item.id} 
                    item={item} 
                    onAdd={onAdd} 
                    isFavourite={favourites.includes(item.id)}
                    onToggleFavourite={onToggleFavourite}
                />
            ))}
        </div>
    )
}

export default MenuList