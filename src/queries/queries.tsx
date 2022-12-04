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
  before: string,
  days?: number
) => {
  //   let beforeQuery = before === "" ? "" : "/" + encodeURIComponent(before);
  console.log(before);
  let daysQuery = typeof days === "undefined" ? "" : "/" + days;
  const response = await fetch(
    "/api/mintactivities/" +
      updateauthority +
      "/" +
      collectionsymbol +
      "/" +
      before +
      daysQuery
  );
  return response.json();
};

export const getNfts = async (on_chain_collection_key: string) => {
  const response = await fetch("/api/nfts/" + on_chain_collection_key);
  return response.json();
};

export const getTransactions = async (mint_address: string) => {
  const response = await fetch("/api/transactions/" + mint_address);
  return response.json();
};

export const getTransactionDetails = async (tx_id: string) => {
  const response = await fetch("/api/transactiondetails/" + tx_id);
  return response.json();
};
