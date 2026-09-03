const readline = require("readline");

// ==========================================
// 1. CLOSURE & SCOPE EXAMPLE
// Encapsulates a private counter for attempt tracking
// ==========================================
function createAttemptTracker() {
  let attemptCount = 0; // Enclosed variable (Lexical Scope)

  return function () {
    attemptCount++; // Closure accessing outer variable
    return attemptCount;
  };
}
const getAttemptCount = createAttemptTracker();

// ==========================================
// 2. FUNCTION TYPES & PIN VERIFICATION LOGIC
// ==========================================

// Function Declaration: To reverse the entered PIN
function reversePin(pinStr) {
  return pinStr.split("").reverse().join("");
}

// Arrow Function: Main verification with try-catch validation
const checkPinPalindrome = (pin) => {
  try {
    // Validation: PIN must be present and numeric
    if (!pin || pin.trim() === "") {
      throw new Error("PIN input cannot be empty!");
    }

    const cleanPin = pin.trim();

    if (!/^\d+$/.test(cleanPin)) {
      throw new Error("Invalid PIN! Only numeric digits are allowed.");
    }

    // Call function to reverse PIN
    const reversed = reversePin(cleanPin);
    const isPalindrome = cleanPin === reversed;

    return {
      success: true,
      pin: cleanPin,
      reversed: reversed,
      isPalindrome: isPalindrome,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// ==========================================
// 3. TERMINAL I/O SETUP
// ==========================================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("=== ATM CARD PIN VERIFICATION SYSTEM ===");

// Function Expression: To handle interactive terminal input recursively
const processAtmPin = function () {
  rl.question(
    "\nEnter Customer PIN (or type 'exit' to quit): ",
    (userPin) => {
      // Exit condition
      if (userPin.trim().toLowerCase() === "exit") {
        console.log("\nThank you for using the ATM System. Session closed.");
        rl.close();
        return;
      }

      // Execute PIN verification logic
      const result = checkPinPalindrome(userPin);

      if (!result.success) {
        console.log(`❌ Error: ${result.message}`);
      } else {
        const attempt = getAttemptCount(); // Invoking closure

        console.log(`\n--- Transaction Attempt #${attempt} ---`);
        console.log(`Entered PIN : ${result.pin}`);
        console.log(`Reversed PIN: ${result.reversed}`);

        if (result.isPalindrome) {
          console.log(
            `Status      : ✅ SPECIAL SECURITY NOTICE: Symmetrical PIN pattern detected! Access Granted.`
          );
        } else {
          console.log(
            `Status      : 🔒 Standard PIN verified successfully. Access Granted.`
          );
        }
      }

      // Prompt for next transaction
      processAtmPin();
    }
  );
};

// Start the terminal program
processAtmPin();