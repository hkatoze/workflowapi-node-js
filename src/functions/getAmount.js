function getStartAmount(grades, amountMax) {
  let startAmount = 0;
  
  for (const grade of grades) {
    const maxAmount = parseFloat(grade.maxAmount);
    if (maxAmount < amountMax && maxAmount > startAmount) {
      startAmount = maxAmount;
    }
  }

  return parseFloat(startAmount);
}

module.exports = getStartAmount;
