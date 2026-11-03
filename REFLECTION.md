# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
plain DOM code requires writing step-by-step instructions on how to build and update screen. React on the other hand, lets you describe what UI should look like based on current state.

2. Why must a component name start with a capital letter?
lowercase tag components are for html elements while capital letter tag is for custom tag

3. What does a fragment <>...</> do, and why not just use a <div>?
fragment group multiple elements without extra node.<div> add an unnecessary wrapper for HTML, which bloat DOM.

4. Name one benefit of splitting the UI into small components.
Modularity. The components can be reused multiple times. It is easier to maintain and test

## Week 6

1. Explain, step by step, what happens from the moment you click Place order until the new order appears on your Orders page. Name the functions in your own code that run, and say why you never call setOrders yourself.
When you click "Place order", handlePlaceOrder in CartPage runs with the checkout form details. It calls placeOrders in services/orders.js, which groups cart items by vendor and creates a Firestore writeBatch. For each vendor, it stages a new order document with status 'Received', customer details, item snapshots, total, and serverTimestamp(). After batch.commit() finishes writing to Firestore, clearCart() resets the cart and navigate('/orders') redirects the user to the orders page. On OrdersPage, the useMyOrders hook calls subscribeToMyOrders, which listens to Firestore using onSnapshot with where('studentUid', '==', uid). Once Firestore receives the new orders, onSnapshot detects the changes and automatically passes the updated orders list to the component. We never call setOrders manually because Firestore is our single source of truth; the real-time listener updates the screen automatically.

2. Why is orders a top-level collection, and why does each order copy vendorName and each item's name and price instead of storing only IDs?
orders is a top-level collection so that both students and vendors can query it directly without digging into subcollections. Students can query their orders using studentUid, while vendors can query incoming orders using vendorId. Each order copies vendorName and the item names and prices instead of just storing IDs to keep an accurate historical snapshot. If a vendor changes a price or deletes an item later, past orders will still show the correct details and total that was originally paid. It also avoids having to make multiple extra database reads just to display a simple order list.

3. Your personal feature: which Firestore path and fields hold its data, and which line of your code reads it? Paste that line.
My personal feature (Favourite items) stores data in the Firestore document path favourites/{uid}, where uid is the user's ID. Inside this document, an items array stores the IDs of the favorited menu items using arrayUnion and arrayRemove. The document is created and updated using setDoc with { merge: true }. The line of code that reads this data live is in src/services/favourites.js:
`return onSnapshot(doc(db, 'favourites', uid), (snap) => { onData(snap.exists() ? snap.data().items || [] : []) }, onError)`
This function is called in CartProvider.jsx inside a useEffect so that the heart state stays synced in real time across different browser windows.
