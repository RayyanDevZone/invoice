import { partyTable } from './parties';

// The customers a user bills to ("Bill To"), saved for reuse on later invoices.
const customers = partyTable('customers');

export const customerApi = customers;
export const fetchCustomers = customers.fetchAll;
export const createCustomer = customers.create;
export const updateCustomer = customers.update;
export const deleteCustomer = customers.remove;
