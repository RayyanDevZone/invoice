import React from 'react';
import { InvoiceProvider } from './InvoiceContext'; // Import the context provider
import Routing from './Routing';

function App() {
  return (
    <InvoiceProvider>
      <Routing />
    </InvoiceProvider>
  );
}

export default App;
