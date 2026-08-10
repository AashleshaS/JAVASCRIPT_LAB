const readline = require("readline");

// ==========================================
// 1. CLOSURE & SCOPE EXAMPLE
// Encapsulates a private counter to track checks
// ==========================================
function createTracker() {
    let checkCount = 0; // Enclosed local variable (Lexical Scope)

    return function incrementAndGetCount() {
        checkCount++; // Closure accessing outer variable
        return checkCount;
    };
}
const getCheckCount = createTracker();

// ==========================================
// 2. FUNCTION TYPES & PALINDROME LOGIC
// Arrow function to clean and validate string
// ==========================================
const isPalindrome = (inputString) => {
    // TRY-CATCH FOR ERROR HANDLING
    try {
        // Validation: Throw error if input is empty or invalid
        if (typeof inputString !== "string" || inputString.trim() === "") {
            throw new Error("Input cannot be empty! Please enter a valid string.");
        }

        // Clean string: remove non-alphanumeric characters & convert to lower case
        const cleanedStr = inputString.toLowerCase().replace(/[^a-z0-9]/g, "");

        if (cleanedStr.length === 0) {
            throw new Error("Input must contain at least one letter or number.");
        }

        // Reverse the string and check equality
        const reversedStr = cleanedStr.split("").reverse().join("");
        const result = cleanedStr === reversedStr;

        return {
            success: true,
            original: inputString,
            cleaned: cleanedStr,
            isPalindrome: result
        };
    } catch (error) {
        // Return caught error message
        return {
            success: false,
            message: error.message
        };
    }
};

// ==========================================
// 3. TERMINAL I/O (Readline Interface)
// ==========================================
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("=== PALINDROME CHECKER (VS Code Terminal) ===");

// Function Expression to handle user prompts recursively
const askQuestion = function () {
    rl.question("\nEnter a word/phrase (or type 'exit' to quit): ", (userInput) => {
        
        // Exit condition
        if (userInput.trim().toLowerCase() === "exit") {
            console.log("\nExiting program. Goodbye!");
            rl.close();
            return;
        }

        // Execute Palindrome Checker (uses try-catch internally)
        const checkResult = isPalindrome(userInput);

        if (!checkResult.success) {
            console.log(`❌ Error: ${checkResult.message}`);
        } else {
            const currentCount = getCheckCount(); // Invoking Closure
            
            console.log(`\n--- Check #${currentCount} Result ---`);
            console.log(`Original Input : "${checkResult.original}"`);
            console.log(`Cleaned String : "${checkResult.cleaned}"`);
            
            if (checkResult.isPalindrome) {
                console.log(`Result         : ✅ YES, it is a Palindrome!`);
            } else {
                console.log(`Result         : ❌ NO, it is not a Palindrome.`);
            }
        }

        // Prompt again for continuous terminal input
        askQuestion();
    });
};

// Start the terminal loop
askQuestion();