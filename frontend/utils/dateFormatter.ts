const dateFormatter = (date: Date): string => {
  const dateDiff = new Date().getTime() - new Date(date).getTime();
  const seconds = Math.floor(dateDiff / 1000);
  const mins = Math.floor(dateDiff / (1000 * 60));
  const hours = Math.floor(dateDiff / (1000 * 60 * 60));
  const days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 7));
  const months = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 30 * 12));

  switch (true) {
    case years > 0:
      return `${years} years ago`;
    case months > 0:
      return `${months} months ago`;
    case weeks > 0:
      return `${weeks} weeks ago`;
    case days > 0:
      return `${days} days ago`;
    case hours > 0:
      return `${hours} hours ago`;
    case mins > 0:
      return `${mins} minutes ago`;
    case seconds > 0:
      return `${seconds} seconds ago`;
    default:
      return "just now";
  }
};

export default dateFormatter;
