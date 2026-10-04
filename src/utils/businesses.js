import { bankColumns, emptyBank, emptyParty, partyTable } from './parties';

// The businesses a user bills from ("Bill From"), each with its own bank details.
const businesses = partyTable('businesses', bankColumns);

export const businessApi = businesses;
export const emptyBusiness = { ...emptyParty, ...emptyBank };
export const fetchBusinesses = businesses.fetchAll;
export const createBusiness = businesses.create;
export const updateBusiness = businesses.update;
export const deleteBusiness = businesses.remove;
