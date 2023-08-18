import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './App';
import Login from './compornents/Login'; // タイポを修正

const root = document.getElementById('root');
const app = createRoot(root);
app.render(
  <BrowserRouter>
    <CookiesProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profiles" element={<App />} />
      </Routes>
    </CookiesProvider>
  </BrowserRouter>
);
