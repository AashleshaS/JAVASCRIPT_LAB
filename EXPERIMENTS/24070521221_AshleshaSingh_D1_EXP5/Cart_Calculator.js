const readline = require("readline");

// Sample catalog
const catalog = {
  1: { name: "Wireless Mouse", price: 25.00 },
  2: { name: "Mechanical Keyboard", price: 80.00 },
  3: { name: "Notebook", price: 5.00 },
  4: { name: "USB-C Cable", price: 12.00 }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const userCart = [];

function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

// Function to calculate discount tier based on subtotal amount
function getDiscountRate(subtotal) {
  if (subtotal >= 200) {
    return 0.20; // 20% discount for orders $200+
  } else if (subtotal >= 100) {
    return 0.10; // 10% discount for orders $100+
  } else if (subtotal >= 50) {
    return 0.05; // 5% discount for orders $50+
  }
  return 0.00;   // No discount below $50
}

function calculateTotal(cartItems) {
  // Array.prototype.reduce() to calculate raw subtotal using object properties
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Automatic discount logic based on subtotal amount
  const discountRate = getDiscountRate(subtotal);
  const discountAmount = subtotal * discountRate;
  
  const tax = (subtotal - discountAmount) * 0.08; // 8% tax
  const total = subtotal - discountAmount + tax;

  return {
    subtotal: subtotal.toFixed(2),
    discountRate: (discountRate * 100).toFixed(0),
    discount: discountAmount.toFixed(2),
    tax: tax.toFixed(2),
    total: total.toFixed(2)
  };
}

async function startShoppingSession() {
  console.log("\n--- AVAILABLE PRODUCTS ---");
  Object.entries(catalog).forEach(([id, item]) => {
    console.log(`${id}. ${item.name} - $${item.price.toFixed(2)}`);
  });

  // Loop to collect item inputs from the user
  let addingItems = true;
  while (addingItems) {
    const choice = await askQuestion("\nEnter Product ID to add to cart (or press Enter to finish): ");
    
    if (!choice.trim()) {
      addingItems = false;
      break;
    }

    if (!catalog[choice]) {
      console.log("Invalid ID. Please try again.");
      continue;
    }

    const qtyInput = await askQuestion(`Enter quantity for ${catalog[choice].name}: `);
    const quantity = parseInt(qtyInput, 10);

    if (isNaN(quantity) || quantity <= 0) {
      console.log("Invalid quantity. Skipping item.");
      continue;
    }

    // Add object to cart array
    userCart.push({
      ...catalog[choice], // Spread object properties (id, name, price)
      quantity
    });

    console.log(`Added ${quantity} x ${catalog[choice].name} to cart.`);
  }

  if (userCart.length === 0) {
    console.log("\nCart is empty. Exiting.");
    rl.close();
    return;
  }

  // Generate calculations automatically based on cart amount
  const summary = calculateTotal(userCart);

  // Print Receipt directly to console
  console.log("\n================ RECEIPT ================");
  userCart.forEach(({ name, price, quantity }) => { // Object destructuring
    console.log(`${name} x${quantity} @ $${price.toFixed(2)} = $${(price * quantity).toFixed(2)}`);
  });
  console.log("-----------------------------------------");
  console.log(`Subtotal:      $${summary.subtotal}`);
  console.log(`Discount (${summary.discountRate}%): -$${summary.discount}`);
  console.log(`Tax (8%):      $${summary.tax}`);
  console.log(`TOTAL:         $${summary.total}`);
  console.log("=========================================\n");

  rl.close();
}

startShoppingSession();