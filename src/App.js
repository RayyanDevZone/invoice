import React from 'react';
import { InvoiceProvider } from './InvoiceContext'; // Import the context provider
import Routing from './Routing';

function App() {
  return (
    <InvoiceProvider>
      <div className="min-h-screen h-auto bg-zinc-800 items-center justify-center flex flex-col">
        <Routing />
      </div>
    </InvoiceProvider>
  );
}

export default App;
