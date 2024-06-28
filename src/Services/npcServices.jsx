
export const getAllNpcs = () => {
  return fetch(`http://localhost:8088/npcs`).then((res) => res.json());
};