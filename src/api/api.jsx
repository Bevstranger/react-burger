export const getData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
