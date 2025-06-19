export const allowEdit = (createdAt: string | Date, maxHours = 4) => {
  const created = new Date(createdAt).getTime();
  return Date.now() - created < maxHours * 60 * 60 * 1000;
};
