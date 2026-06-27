const generateAccountNumber = () => {
  const prefix = "10";

  const random = Math.floor(
    100000000 + Math.random() * 900000000
  );

  return `${prefix}${random}`;
};

module.exports = {
  generateAccountNumber,
};