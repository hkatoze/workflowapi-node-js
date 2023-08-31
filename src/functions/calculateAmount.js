function calculateTotalAmount(requisitionLines) {
    let totalAmount = 0;

 
    for (const line of requisitionLines) {
      const extended = parseFloat(line.EXTENDED);
      totalAmount += extended;
    }

    return totalAmount;
  }


  module.exports=calculateTotalAmount