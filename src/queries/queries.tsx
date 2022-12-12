// Define functions for UI to make API calls

export const getCollections = async () => {
  const response = await fetch("/api/collections");
  return response.json();
};

export const getCreator = async (mint_address: string) => {
  const response = await fetch("/api/creator/" + mint_address);
  return response.json();
};

export const getMintActivities = async (
  updateauthority: string,
  collectionsymbol: string,
  before: string
) => {
  const response = await fetch(
    "/api/mintactivities/" +
      updateauthority +
      "/" +
      collectionsymbol +
      "/" +
      before
  );
  return response.json();
};

export const getNfts = async (on_chain_collection_key: string) => {
  const response = await fetch("/api/nfts/" + on_chain_collection_key);
  return response.json();
};

export const getTransactionsByAccount = async (account: string) => {
  const response = await fetch("/api/transactionsByAccount/" + account);
  return response.json();
};

export const getTransactionsByNft = async (mint_address: string) => {
  const response = await fetch("/api/transactionsByNft/" + mint_address);
  return response.json();
};

export const getTransactionDetails = async (tx_id: string) => {
  const response = await fetch("/api/transactiondetails/" + tx_id);
  return response.json();
};

export const getAllSales = async (
  updateauthority: string,
  collectionsymbol: string
) => {
  const response = await fetch(
    "/api/allsales/" + updateauthority + "/" + collectionsymbol
  );
  return response.json();
};
