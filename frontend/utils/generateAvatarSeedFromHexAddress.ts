


const generateAvatarSeedFromHexAddress = (hexAddress: string): number => {
  const address = hexAddress.toLowerCase();
  const seed = address.split('').reduce((seed, char) => {
    return seed + char.charCodeAt(0);
  }, 0);
  return seed;
}


export default generateAvatarSeedFromHexAddress;
