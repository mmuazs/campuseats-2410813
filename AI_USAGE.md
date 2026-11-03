# AI usage log

Using AI never costs marks; a vague or missing log does.
Add a new section every week, before you tag. Did not use AI? Write "None" under Tool(s).

## Week 1
- Tool(s):
- None

## Week 2
- Tool(s):
- None

## Week 3
- Tool(s): Gemini
- What I asked: I asked for help debugging a `ReferenceError` for my vendors array, transitioning from importing a local file to fetching a JSON file from the `public` folder, and implementing the Week 3 lab requirements (cart state, form validation, and my Digit 3 Favourites feature).
- What I kept or changed: I kept the logic for `useEffect` fetching, the `AbortController`, and the `CheckoutForm` validation rules. I had to change and provide my own `MenuList` and `MenuItemCard` component code because the AI didn't know my exact layout, so I guided it to adapt the Favourites feature into my existing file structure.
- One thing the AI got wrong and how I fixed it: When I first moved `vendors.json` to the public folder, the AI initially told me to use an `import` statement. This caused a Vite `import-analysis` error. I fixed it by prompting the AI with the exact error message, which led to replacing the `import` with a `useEffect` fetch call. The AI also guessed my `MenuItemCard` structure incorrectly, which I fixed by providing my actual component code so it could integrate the Favourites button properly.

## Week 4
- Tool(s): Gemini
- What I asked for:Explanations on how `CartProvider` shares state, help writing `useLocalStorage` with a `try/catch` block, and logic for integrating my Matric 3 "Favourites" feature.
- What I kept, changed or rejected, and why: I kept the `useLocalStorage` hook for safe JSON parsing. I rejected the AI's `App.jsx` code and typed the `<BrowserRouter>` and `<Routes>` setup myself to ensure I understood how `Layout` and `Outlet` work. For Favourites, I used the AI's context logic but built the `/favourites` UI and toggle button completely on my own.
- One thing the AI got wrong and how I fixed it: The AI's new Context code crashed my app because it expected a nested cart format (`{ item, qty }`), clashing with my old Week 3 `localStorage` data. I fixed this by manually clearing my browser's local storage in DevTools, and then I independently added optional chaining (`?.`) to `CartProvider` to prevent similar crashes in the future.

## Week 5
- Tool(s): Gemini
- What I asked: I asked for guidance on handling dynamic user keys in `useLocalStorage` for my Digit 3 Favourites feature and preserving location state (`location.state?.from`) when guests click "Log in to save favourites".
- What I kept or changed: I implemented the Firebase authentication setup, `AuthProvider`, and `ProtectedRoute` myself following the lab sheet instructions. I kept the suggestion for synchronizing state in `useLocalStorage` when the user ID key changes upon sign-in and sign-out. I modified the `MenuItemCard` rendering to preserve my existing inline layout and heart button styling rather than using the AI's suggested wrapper.
- One thing the AI got wrong and how I fixed it: The AI initially suggested wrapping the `useLocalStorage` call in an `if (user)` block, which breaks React's Rules of Hooks. I caught this and fixed it by keeping the hook at the top level with a dynamic key (`user ? 'ce-favs-' + user.uid : null`), then updating `useLocalStorage` to return the default empty array and skip writes whenever the key is null.
