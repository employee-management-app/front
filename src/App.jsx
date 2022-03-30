import React from 'react';
import { BrowserRouter, Routes, Route }  from 'react-router-dom';

import { Header } from './components/Header';
import { Inbox } from './pages/inbox';
import { Scheduler } from './pages/scheduler';
import { Completed } from './pages/completed';
import { Error } from './pages/error';

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path='/' element={<Inbox />} />
        <Route path='/scheduler' element={<Scheduler />} />
        <Route path='/completed' element={<Completed />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
