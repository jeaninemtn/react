import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { RouterProvider } from 'react-router-dom';
import router from './router/index.tsx';

import "./assets/css/index.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

/* `createRoot` 

1. A built-in function that is used to create a root node for a React application.
2. This function takes one argument, an HTML element.
*/

/* `render`
Defines what to render in the HTML container.
*/

/* 程式最簡化後的樣子 
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <h1>Hello React!</h1>
) 
*/