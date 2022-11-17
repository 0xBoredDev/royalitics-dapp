// Define functions for UI to make API calls

export const getCollections = async () => {
   const response = await fetch("/api/collections");
   return response.json();   
}

export const getCreator = async (mint_address: string) => {   
   const response = await fetch("/api/creator/" + mint_address);
   return response.json();   
}

export const getMintActivities = async (updateauthority: string, collectionsymbol: string) => {   
   const response = await fetch("/api/mintactivities/" + updateauthority + "/" +collectionsymbol);
   return response.json();
}