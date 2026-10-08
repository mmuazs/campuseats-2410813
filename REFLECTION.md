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