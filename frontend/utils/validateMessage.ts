const bannedWords: string[] = ["i love nazis"];
const validateMessage = (message: string): boolean => {
  message.toLowerCase();
  message.trim();

  if (message.length === 0) {
    return false;
  } else if (message.length > 1500) {
    return false;
  }

  message.split(" ").forEach((word) => {
    if (bannedWords.includes(word)) {
      return false;
    }
  });

  return true;
};

export default validateMessage;
