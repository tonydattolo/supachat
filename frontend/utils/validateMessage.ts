const validateMessage = (message: string): boolean => {
  if (message.length === 0) {
    return false;
  }
  return true;
}

export default validateMessage;