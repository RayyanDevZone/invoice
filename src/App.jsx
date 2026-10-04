import React from 'react';
import { InvoiceProvider } from './InvoiceContext'; // Import the context provider
import { AuthProvider } from './AuthContext';
import Routing from './Routing';

function App() {
  return (
    <AuthProvider>
      <InvoiceProvider>
        <Routing />
      </InvoiceProvider>
    </AuthProvider>
  );
}

export default App;
