import React from 'react';
import { BrowserRouter, Routes, Route }  from 'react-router-dom';

import { Header } from './components/Header';
import { Inbox } from './pages/inbox';
import { Schedular } from './pages/schedular';
import { Completed } from './pages/completed';
import { Error } from './pages/error';

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path='/' element={<Inbox />} />
        <Route path='/schedular' element={<Schedular />} />
        <Route path='/completed' element={<Completed />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
