
const buildPasswordResetToken = (): string => {
  let randInt = (x: number) => Math.floor(Math.random() * x);

  return `${randInt(10)}${randInt(10)}${randInt(10)}${randInt(10)}${randInt(10)}${randInt(10)}${randInt(10)}`;
};
export default buildPasswordResetToken