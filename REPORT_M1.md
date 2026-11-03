# M1: React Milestone Report
**BICS 3301 Cross-Platform Software Development · Individual · Due end of Week 4 · Tag `react-done` · 5% · 5–6 pages excluding this cover table**

| Name | Matric No. | Section | Personal feature |
| :--- | :--- | :--- | :--- |
| **Muhammad Muaz bin Syahmi** | **2410813** | **Section [X]** | **Favourites (Matric digit 3)** |
| **Shop** | **Repository URL and tag** | **Commit hash of the tag** | |
| **Los Pollos Hermanos** | `https://github.com/mmuazs/campuseats-2410813` (tag: `react-done`) | `5be8cbf` (`5be8cbf7938a274061e7fdd3037cc38d77dff08d`) | |
| **Known issues at the tag (anything not working; write “None” if all works)** | | | |
| None | | | |

---

## 1. My Shop

**Shop Name:** Los Pollos Hermanos  
**Location:** Albuquerque, New Mexico (Campus Branch)  
**What the shop sells:** Fast-casual southwestern specialties, iconic breakfast burritos, ranchero platters, tacos, and fresh beverages.

The shop menu features 8 items categorized into 3 distinct food and beverage categories (**Platters**, **Breakfast**, and **Drinks**), offering complete pricing and descriptive ingredient details.

In accordance with course requirements, **Los Pollos Hermanos** is listed first in the vendor directory (`public/api/vendors.json`). The vendor list also includes two peer vendors for campus dining diversity, credited in `README.md`:
* **Rahmat Restaurant** (contributed by student `2414517`)
* **Little Bites Cafe** (contributed by student `2417175`)

### Menu Items

| Item | Category | Price (RM) | Description |
| :--- | :--- | :--- | :--- |
| **Enchilada Rancheros** | Platters | 7.50 | Huevos Rancheros served with two enchiladas and rich homemade salsa. |
| **Pollos Classic Breakfast** | Breakfast | 6.00 | Our basic Pollos burrito (bonus size available) served with choice of coffee or orange juice. |
| **Iced Tea** | Drinks | 2.50 | Freshly brewed iced tea. Great to order before asking any questions. |
| **Taco Rancheros** | Platters | 5.99 | Huevos Rancheros with seasoned ground beef served on warm corn tortillas. |
| **Pollos Breakfast Sandwich** | Breakfast | 4.59 | Two eggs, boneless grilled chicken, roasted green chile, and salsa on our classic bun. |
| **Pollos Breakfast Tacos** | Breakfast | 4.99 | Shredded spiced chicken with scrambled eggs, potatoes, green chile, and salsa. |
| **Bottled Water** | Drinks | 1.09 | Medium-sized plain purified bottled spring water. |
| **Orange Juice** | Drinks | 2.50 | 100% freshly squeezed chilled citrus orange juice. |

---

### Application Screenshots

```
+---------------------------------------------------------------------------------------------------+
| Figure 1.1 Vendor list with your shop first                                                       |
|                                                                                                   |
| [Screenshot: HomePage (/) showing "Today's vendors" grid where "Los Pollos Hermanos"              |
| appears as the premier card with green initial badge 'L', Albuquerque location, and 'Open now']   |
+---------------------------------------------------------------------------------------------------+
```
*(Insert screenshot of `http://localhost:5173/` showing Los Pollos Hermanos as the first vendor card)*

```
+---------------------------------------------------------------------------------------------------+
| Figure 1.2 Your shop’s menu page (/vendor/your-id)                                                |
|                                                                                                   |
| [Screenshot: VendorPage (/vendor/2410813-los-pollos-hermanos) showing title, location,          |
| opening hours, back link, and the 8 menu item cards across Platters, Breakfast, and Drinks]        |
+---------------------------------------------------------------------------------------------------+
```
*(Insert screenshot of `http://localhost:5173/vendor/2410813-los-pollos-hermanos` showing the full menu grid)*

```
+---------------------------------------------------------------------------------------------------+
| Figure 1.3 Cart and checkout with your items                                                      |
|                                                                                                   |
| [Screenshot: CartPage (/cart) displaying Los Pollos Hermanos ordered items, quantity controls,    |
| line totals, overall total in RM, and the interactive CheckoutForm with Mahallah dropdown]         |
+---------------------------------------------------------------------------------------------------+
```
*(Insert screenshot of `http://localhost:5173/cart` displaying items, quantities, totals, and the checkout form)*

```
+---------------------------------------------------------------------------------------------------+
| Figure 1.4 Orders page                                                                            |
|                                                                                                   |
| [Screenshot: OrdersPage (/orders) displaying placed orders with unique 5-digit ID tags,          |
| itemized breakdown of Los Pollos Hermanos items, and calculated monetary totals]                  |
+---------------------------------------------------------------------------------------------------+
```
*(Insert screenshot of `http://localhost:5173/orders` showing submitted orders)*

---

## 2. Design

### 2.1 Component Tree

The application is structured around a centralized layout managed by React Router (`react-router` v8) and an application-wide Context Provider (`CartProvider`).

```
App
└── BrowserRouter
    └── CartProvider
        └── Routes
            └── Route (path="/" element={<Layout />})
                ├── Header [Reused across all routes]
                │   └── NavLink (x4: Vendors, Favourites, Orders, Cart [badge])
                ├── <main className="container"><Outlet /></main>
                │   │
                │   ├── HomePage (Route: index, "/")
                │   │   ├── Loading [Reused] / ErrorMessage [Reused]
                │   │   └── VendorCard [Reused per vendor]
                │   │
                │   ├── VendorPage (Route: "vendor/:id")
                │   │   ├── Loading [Reused] / ErrorMessage [Reused]
                │   │   └── MenuList
                │   │       └── MenuItemCard [Reused per item] (*)
                │   │           └── Heart Toggle Button (*)
                │   │
                │   ├── CartPage (Route: "cart")
                │   │   ├── CartItem [Reused per cart line]
                │   │   └── CheckoutForm
                │   │
                │   ├── OrdersPage (Route: "orders")
                │   │   └── Order Cards
                │   │
                │   ├── FavouritesPage (Route: "favourites") (*) [Personal Feature Page]
                │   │   ├── Loading [Reused] / ErrorMessage [Reused]
                │   │   └── MenuItemCard [Reused from VendorPage] (*)
                │   │       └── Heart Toggle Button (*)
                │   │
                │   └── NotFoundPage (Route: "*")
                │
                └── Footer [Reused across all routes]

Legend:
  [Reused]           Component reused across multiple views or mapped arrays
  (*)                Component / feature element belonging to Personal Feature (Favourites)
```

```
+---------------------------------------------------------------------------------------------------+
| Figure 2.1 Component tree                                                                         |
|                                                                                                   |
| [Diagram showing the hierarchy from App through CartProvider, Layout, routed page views,         |
| reusable presentation components, and personal feature integration nodes]                         |
+---------------------------------------------------------------------------------------------------+
```

#### Reused Components:
* `Layout`, `Header`, and `Footer`: Defined once as the parent route shell; automatically wrapping every active route view through `<Outlet />`.
* `MenuItemCard`: Highly modular presentation card reused in both `MenuList` on `VendorPage` and directly in the grid of `FavouritesPage`.
* `Loading` and `ErrorMessage` (from `src/components/Status.jsx`): Reused uniformly across `HomePage`, `VendorPage`, and `FavouritesPage` to handle asynchronous fetch lifecycle states.
* `CartItem`: Reused for every line entry rendered inside `CartPage`.

#### Personal Feature Components:
* `FavouritesPage.jsx`: The dedicated routing destination (`/favourites`) displaying all saved dishes across vendors.
* `MenuItemCard.jsx` (Heart Button): Houses the interactive `♥`/`♡` toggle invoking `toggleFavourite(item.id)`.
* `CartProvider.jsx` (`favourites` state & handlers): Houses the state array and toggle actions shared via `CartContext`.
* `Header.jsx` (`<NavLink to="/favourites">`): Global navigation hook routing to the Favourites page.

---

### 2.2 Where State Lives

| State | Owner | Why here |
| :--- | :--- | :--- |
| **`cart`** | `CartProvider`<br>(`src/context/CartProvider.jsx` via `useLocalStorage`) | Needed globally across different tree branches: `Header` requires `count` for the live badge; `MenuItemCard` (on `VendorPage` and `FavouritesPage`) calls `addToCart`; and `CartPage` displays line items, alters quantities (`changeQty`), and removes items (`removeFromCart`). Housing it in `CartProvider` avoids prop drilling and keeps it in sync across all pages. |
| **`orders`** | `CartProvider`<br>(`src/context/CartProvider.jsx` via `useLocalStorage`) | Written on `CartPage` when a customer completes checkout via `placeOrder(details)`, but read and displayed on a separate route within `OrdersPage`. Storing it in `CartProvider` guarantees cross-route availability and persistence across page reloads. |
| **`vendors`** | `useVendors` hook<br>(`src/hooks/useVendors.js`) | Multiple pages need vendor catalog data independently: `HomePage` renders the vendor directory, `VendorPage` looks up the specific vendor by URL parameter `id`, and `FavouritesPage` cross-references all vendor menus to resolve favorited items. Encapsulating this in a custom hook keeps network lifecycle and cached data cleanly decoupled from presentation. |
| **`loading` and `error`** | `useVendors` hook<br>(`src/hooks/useVendors.js`) | These transient states represent the lifecycle of fetching `public/api/vendors.json`. They are co-located with the `fetch` and `AbortController` calls so consuming views (`HomePage`, `VendorPage`, `FavouritesPage`) can conditionally render `<Loading />` or `<ErrorMessage onRetry={reload} />`. |
| **`checkout form`**<br>(`values`, `errors`) | `CheckoutForm`<br>(`src/components/CheckoutForm.jsx`) | Strictly local to the form. No other component (like `Header` or `VendorPage`) needs to monitor ephemeral keystrokes. Keeping inputs (`name`, `mahallah`, `pickupTime`) and inline validation errors local prevents unnecessary app re-renders, passing finalized data upwards via `onPlaceOrder` only upon successful submission. |
| **`favourites`**<br>(Personal Feature) | `CartProvider`<br>(`src/context/CartProvider.jsx` via `useLocalStorage`) | Favourites are toggled directly inside `MenuItemCard` (rendered on both `VendorPage` and `FavouritesPage`), and read globally by `FavouritesPage` to filter matching menu items. Global context ensures immediate synchronization between the card's heart icon and the `/favourites` gallery. |

#### Where the selected vendor lives now (Hint):
In Week 2, the selected vendor was held in local component state via `useState(selectedVendorId)`. In Week 4, **the selected vendor is no longer stored in component state**. Instead, it lives in the **URL route parameter** (`/vendor/:id`).  
The `VendorPage` component accesses it dynamically using React Router's `useParams()` hook (`const { id } = useParams()`). Storing this in the URL gives substantial advantages: it allows **deep linking** directly to a shop, preserves selection across page refreshes, and integrates natively with browser history (back/forward buttons).

---

### 2.3 One Action Traced: "Add to Cart"

When a user clicks the **"Add to cart"** button on an item card within Los Pollos Hermanos (`/vendor/2410813-los-pollos-hermanos`), the action propagates through the following sequence:

1. **User Click (`src/components/MenuItemCard.jsx`)**:  
   The user clicks `<button className="btn" onClick={onAdd}>Add to cart</button>`. This invokes the `onAdd` callback passed in by its parent.
2. **Prop Delegation (`src/components/MenuList.jsx`)**:  
   `MenuList` rendered the item with `<MenuItemCard key={item.id} item={item} onAdd={() => addToCart(item)} />`. The click triggers `addToCart(item)`.
3. **Context Dispatch Hook (`src/hooks/useCart.js`)**:  
   The `addToCart` function was acquired via `const { addToCart } = useCart()`, which calls `useContext(CartContext)` to interface with the active provider.
4. **State Transition in Provider (`src/context/CartProvider.jsx`)**:  
   `addToCart(item)` triggers `setCart((prev) => ...)`:
   * It inspects `prev` for an existing entry where `line.item.id === item.id`.
   * If not found, it returns `[...prev, { item, qty: 1 }]`.
   * If found, it increments `qty`: `prev.map(line => line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line)`.
5. **Persistence via Custom Hook (`src/hooks/useLocalStorage.js`)**:  
   `setCart` invokes the state setter in `useLocalStorage`. Its `useEffect` detects the updated array and executes:
   ```javascript
   localStorage.setItem('campuseats-cart', JSON.stringify(value))
   ```
6. **Derived Calculation & Context Broadcasting (`src/context/CartProvider.jsx`)**:  
   `CartProvider` recomputes its derived values:
   ```javascript
   const count = cart.reduce((sum, line) => sum + (line?.qty || 0), 0)
   const total = cart.reduce((sum, line) => sum + ((line?.item?.price || 0) * (line?.qty || 0)), 0)
   ```
   The updated `value` object containing the new `cart`, `count`, and `total` is broadcast through `<CartContext.Provider value={{ ... }}>`.
7. **Screen Re-Render (`src/components/Header.jsx`)**:  
   `Header` consumes `const { count } = useCart()`. React re-renders `Header`, instantly updating the cart badge `<span className="badge">{count}</span>` in the navigation bar from `0` to `1` without reloading the page.

---

## 3. My Personal Feature

* **Matric Number:** 2410813 (Last digit: **3**)  
* **Assigned Personal Feature:** **Favourites**

### How It Works

1. **Item-Level Bookmarking:** Every `MenuItemCard` displays a toggle button in the upper-right corner reflecting `♥` (if the item ID is present in the `favourites` array) or `♡` (if not). Clicking it calls `toggleFavourite(item.id)`.
2. **Global & Persistent State:** The `favourites` array is managed in `CartProvider` using the custom `useLocalStorage('campuseats-favourites', [])` hook. This ensures saved favourites persist across browser restarts.
3. **Dedicated Route View (`/favourites`):** Accessible from the top navigation bar, `FavouritesPage` retrieves the full vendor catalog via `useVendors()` and flattens all menus (`vendors.flatMap(v => v.menu)`). It filters for items matching stored favourite IDs and renders them with full interactive controls.
4. **Instant Cart Integration:** Users can add dishes to their cart directly from `/favourites` using the reused `MenuItemCard` and `addToCart` handler.

### Code Excerpt

```javascript
// File: src/pages/FavouritesPage.jsx (Lines 13-33)
const allItems = vendors.flatMap((v) => v.menu)
const favouriteItems = allItems.filter((item) => favourites.includes(item.id))

if (favouriteItems.length === 0) {
  return (
    <section>
      <h2 className="section-title">My Favourites</h2>
      <p className="muted">You haven't added any favourites yet.</p>
    </section>
  )
}

return (
  <section>
    <h2 className="section-title">My Favourites</h2>
    <div className="grid">
      {favouriteItems.map((item) => (
        <MenuItemCard 
          key={item.id} 
          item={item} 
          onAdd={() => addToCart(item)} 
        />
      ))}
    </div>
  </section>
)
```

### Explanation of the Code

The excerpt demonstrates clean declarative composition and component reuse. The component flattens the nested vendor-to-menu data structure into a single collection (`allItems`) using `flatMap()`. It then derives `favouriteItems` by filtering for IDs stored in the `favourites` array obtained from `useCart()`. If no items are favorited, a clean fallback state is displayed. Otherwise, it maps over the filtered list to render the identical `MenuItemCard` component used across vendor pages, attaching `addToCart` directly so users can order their favorite dishes in a single click.

```
+---------------------------------------------------------------------------------------------------+
| Figure 3.1 Personal feature                                                                       |
|                                                                                                   |
| [Screenshot: FavouritesPage (/favourites) displaying favorited Los Pollos Hermanos items with      |
| filled heart indicators (♥), price tags, and enabled "Add to cart" buttons]                       |
+---------------------------------------------------------------------------------------------------+
```
*(Insert screenshot of `http://localhost:5173/favourites` showing bookmarked Los Pollos Hermanos items)*

---

## 4. Testing and Reflection

### 4.1 What I Checked

| Check | Expected | Result |
| :--- | :--- | :--- |
| **Deep link to `/vendor/2410813-los-pollos-hermanos`** | Directly loads Los Pollos Hermanos menu, showing vendor name, Albuquerque location, opening hours, and all 8 menu cards. | **Pass.** URL parameter is parsed by `useParams()`; correct vendor data is retrieved and rendered. |
| **Cart survives refresh** | Adding items to the cart and pressing `F5` / reloading preserves all items, quantities, and header badge count. | **Pass.** State rehydrates from `localStorage.getItem('campuseats-cart')` without data loss. |
| **Checkout validation** | Submitting empty form, name under 3 chars, or invalid time displays red validation warnings and blocks checkout. | **Pass.** Validation stops execution; errors for `name`, `mahallah`, and `pickupTime` render inline. |
| **`/vendor/zzz` shows “Vendor not found”** | Entering an unlisted vendor identifier displays a dedicated error box with a return link to home. | **Pass.** `vendors.find()` yields `undefined`; fallback `<div className="box"><h2>Vendor not found</h2>...</div>` renders. |
| **`/nothing` shows the 404 page** | Navigating to an invalid or unknown route displays the custom 404 page with a return home link. | **Pass.** Caught by the wildcard `<Route path="*" element={<NotFoundPage />} />`. |
| **Place an order: goes to `/orders`, cart is empty** | Submitting valid checkout creates an order record in `orders`, clears `cart` to `[]`, and redirects to `/orders`. | **Pass.** Navigated to `/orders` via `useNavigate()`; new order appears with badge resetting to `0`. |
| **Favourites persistence across sessions** | Clicking `♡` turns heart to `♥`, adds item to `/favourites`, and persists across browser tab closure. | **Pass.** `toggleFavourite` synchronizes IDs with `localStorage`; `/favourites` renders saved items. |
| **Async error handling & retry** | If `/api/vendors.json` fails to load, an error box appears with a functional "Try again" retry trigger. | **Pass.** Failed fetch renders `ErrorMessage`; clicking button increments `reloadKey` and re-executes fetch. |

---

### 4.2 One Bug I Fixed

* **What happened:** When upgrading the cart architecture in Week 4 from local component state to `CartProvider` and `useLocalStorage`, the application crashed with a runtime error (`TypeError: Cannot read properties of undefined (reading 'price')`) whenever the cart or header rendered.
* **How I found the cause:** By inspecting the browser console and checking `DevTools > Application > Local Storage`, I discovered that legacy test data from Week 3 was stored under the key `campuseats-cart` with a flat schema (`{ id, name, price }`), whereas the new Week 4 context expected a nested line structure (`{ item: { id, name, price }, qty }`). When `CartProvider` attempted to reduce the cart (`line.item.price * line.qty`), `line.item` evaluated to `undefined`.
* **What I changed:** I cleared the old key in DevTools to unblock execution, and then implemented defensive coding in the source. In `CartProvider.jsx`, I incorporated optional chaining and default values (`line?.item?.price || 0` and `line?.qty || 0`). In `CartPage.jsx`, I introduced a defensive filter (`const validCart = cart.filter((line) => line && line.item)`) so corrupted or legacy entries are ignored gracefully rather than crashing the user's view.

---

### 4.3 One Decision I Would Change

A design decision from Weeks 1–4 that I would implement differently now is **handling vendor data loading at the individual page level with `useVendors()` instead of lifting it into a shared `VendorProvider` Context**.

Currently, `HomePage`, `VendorPage`, and `FavouritesPage` each independently invoke `useVendors()`. Whenever the user switches between the vendor list, an individual store, and the favourites screen, a new `useEffect` runs, initiating a redundant HTTP fetch request to `/api/vendors.json` and triggering brief flashes of `<Loading />`. 

If refactoring this architecture, I would lift the vendor catalog into a global `VendorProvider` that wraps the router (similar to `CartProvider`). The catalog would fetch once upon application load and remain cached in React context memory. All child pages would consume the cached vendors instantly with zero network latency, eliminating redundant requests and delivering an instantaneous, smoother user experience.

---

## AI Use Statement

During Weeks 3 and 4, I utilized Google Gemini as an interactive development assistant for debugging asynchronous fetch routines, designing the custom `useLocalStorage` hook with resilient JSON parsing, and scaffolding the initial context architecture for my assigned Favourites feature (Digit 3). I critically reviewed and tested all AI-suggested code: I verified component lifecycles against official React 19 documentation, rejected auto-generated routing setups in favor of handwriting `<BrowserRouter>`, `<Routes>`, and `<Outlet>` configurations myself, and independently authored the `/favourites` page UI and menu item toggle integration. When an AI-generated context implementation clashed with legacy local storage data, I diagnosed the issue using browser DevTools and wrote defensive optional-chaining safeguards myself. Detailed interaction logs, prompts, and corrections are recorded in [AI_USAGE.md](AI_USAGE.md).

---

## Declaration

I declare that this report and the code at the stated tag are my own work, and that I can explain every part of them. AI use is disclosed above and in AI_USAGE.md.

**Signature:** Muhammad Muaz bin Syahmi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Date:** 1 November 2026
