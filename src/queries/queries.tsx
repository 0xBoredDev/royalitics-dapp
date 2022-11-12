// Define functions for UI to make API calls

export const getCollections = async () => {
   const response = await fetch("/api/collections");
   return response.json();   
}