export class Collection {
  collectionSymbol: string;
  name: string;
  description: string;
  image: string;
  onChainCollectionAddress: string;
  mintAddress: string;
  value: string;
  updateAuthortity: string;
  constructor(
    collectionSymbol: string,
    name: string,
    description: string,
    image: string,
    onChainCollectionAddress: string,
    mintAddress: string,
    value: string,
    updateAuthortity: string
  ) {
    collectionSymbol = collectionSymbol;
    name = name;
    description = description;
    image = image;
    onChainCollectionAddress = onChainCollectionAddress;
    mintAddress = mintAddress;
    value = value;
    updateAuthortity = updateAuthortity;
  }
}
