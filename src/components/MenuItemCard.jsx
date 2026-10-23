function MenuItemCard({ item, onAdd, isFavourite, onToggleFavourite }) {
    return (
        <article className="card menu-card">
            <div className="thumb" aria-hidden="true">{item.name.charAt(0)}</div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{item.name}</h3>
                {onToggleFavourite && (
                    <button 
                        type="button" 
                        className="link" 
                        onClick={() => onToggleFavourite(item.id)}
                        style={{ 
                            fontSize: '1.5rem', 
                            color: isFavourite ? '#f59e0b' : '#c5cbd3',
                            cursor: 'pointer',
                            padding: '0 0.5rem'
                        }}
                        title={isFavourite ? "Remove from favourites" : "Add to favourites"}
                    >
                        {isFavourite ? '★' : '☆'}
                    </button>
                )}
            </div>
            
            <p className="muted">{item.description}</p>
            <p className="price">RM {item.price.toFixed(2)}</p>
            <button className="btn" disabled={!item.available} onClick={() => onAdd(item)}>
                {item.available ? 'Add to Cart' : 'Sold Out'}
            </button>
        </article>
    )
}

export default MenuItemCard