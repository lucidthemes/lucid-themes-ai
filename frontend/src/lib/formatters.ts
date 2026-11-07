export function dateFormat(date: string | Date) {
  const dateFormat = new Date(date);
  const formattedDate = dateFormat.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  return formattedDate;
}

export function dateTimeFormat(dateTime: string | Date) {
  const dateTimeFormat = new Date(dateTime);
  const formattedDate = dateTimeFormat.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = dateTimeFormat.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  const formattedDateTime = `${formattedDate} at ${formattedTime}`;
  return formattedDateTime;
}

export function capitalizeText(text: string) {
  if (!text) return;

  const capitalized = text.charAt(0).toUpperCase() + text.slice(1);

  return capitalized;
}
