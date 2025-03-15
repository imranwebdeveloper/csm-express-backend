const formatJoiErrors = (error) => {
  if (!error || !error.details) return { status: 400, errors: {} };

  const errors = {};
  error.details.forEach((err) => {
    const propertyName = err.path.join(".");
    errors[propertyName] = err.message.replace(/"/g, ""); // Remove extra quotes
  });

  return errors;
};

module.exports = { formatJoiErrors };
