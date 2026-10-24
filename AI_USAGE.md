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