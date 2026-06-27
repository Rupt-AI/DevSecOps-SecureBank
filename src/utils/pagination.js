const paginate = (
  page = 1,
  limit = 10
) => {
  page = Number(page);

  limit = Number(limit);

  const skip =
    (page - 1) * limit;

  return {
    skip,
    take: limit,
  };
};

module.exports = paginate;