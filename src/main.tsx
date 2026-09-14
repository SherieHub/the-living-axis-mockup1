import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { WhatToExpect } from './pages/WhatToExpect';
import { FindYourTreatment } from './pages/FindYourTreatment';
import { ServiceAreas } from './pages/ServiceAreas';
import { FAQ } from './pages/FAQ';
import { Book } from './pages/Book';
import { Contact } from './pages/Contact';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'services', element: <Services /> },
      { path: 'find-your-treatment', element: <FindYourTreatment /> },
      { path: 'about', element: <About /> },
      { path: 'what-to-expect', element: <WhatToExpect /> },
      { path: 'service-areas', element: <ServiceAreas /> },
      { path: 'faq', element: <FAQ /> },
      { path: 'book', element: <Book /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
