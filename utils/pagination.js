const getPagination = (page = 1, limit = 10) => {
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;
  const offset = (pageNumber - 1) * pageSize;

  return { limit: pageSize, offset, pageNumber, pageSize };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: results } = data;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    pagination: {
      total: totalItems,
      totalPages,
      currentPage: page,
      limit,
    },
    data: results,
  };
};

module.exports = { getPagination, getPagingData };
