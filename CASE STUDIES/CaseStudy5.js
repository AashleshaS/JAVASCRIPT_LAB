// ==========================================
// Case Study Array Initialization
// ==========================================
let numbers = [25, 10, 45, 5, 30, 15];
console.log("Initial Case Study Array:", numbers);

// ==========================================
// Case Study Solution: Find Max and Min
// ==========================================
// Using reduce() to find the maximum value
const maxValue = numbers.reduce((max, current) => (current > max ? current : max), numbers[0]);

// Using reduce() to find the minimum value
const minValue = numbers.reduce((min, current) => (current < min ? current : min), numbers[0]);

console.log(`\n--- CASE STUDY RESULTS ---`);
console.log(`Array: [${numbers.join(', ')}]`);
console.log(`Maximum Value: ${maxValue}`);
console.log(`Minimum Value: ${minValue}`);
console.log(`---------------------------\n`);


// ==========================================
// Part A: Create and Manipulate Arrays
// ==========================================
console.log("=== Part A: Array Manipulation ===");

// 1. push(): Add element to the end
numbers.push(50);
console.log("After push(50):", numbers);

// 2. pop(): Remove element from the end
let poppedValue = numbers.pop();
console.log(`After pop() (removed ${poppedValue}):`, numbers);

// 3. shift(): Remove element from the front
let shiftedValue = numbers.shift();
console.log(`After shift() (removed ${shiftedValue}):`, numbers);

// 4. unshift(): Add element to the front
numbers.unshift(99);
console.log("After unshift(99):", numbers);

// 5. splice(): Remove/Replace elements at a specific index
// Removes 2 elements starting at index 1 and inserts 12 and 18 instead
numbers.splice(1, 2, 12, 18);
console.log("After splice(1, 2, 12, 18):", numbers);

// 6. slice(): Extract a shallow copy of a portion of an array
// Extracts elements from index 1 up to (but not including) index 4
let subArray = numbers.slice(1, 4);
console.log("Extracted slice(1, 4):", subArray);
console.log("Original array remains unchanged:", numbers);


// ==========================================
// Part B: Use Advanced Array Methods
// ==========================================
console.log("\n=== Part B: Advanced Array Methods ===");

// 1. map(): Creates a new array by transforming every element (e.g., doubling them)
let doubledNumbers = numbers.map(num => num * 2);
console.log("After map() (doubled values):", doubledNumbers);

// 2. filter(): Creates a new array with elements that pass a test (e.g., numbers > 15)
let filteredNumbers = numbers.filter(num => num > 15);
console.log("After filter() (values > 15):", filteredNumbers);

// 3. reduce(): Accumulates array down to a single value (e.g., calculating sum)
let totalSum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log("After reduce() (Sum of array elements):", totalSum);

// 4. forEach(): Iterates over each element to execute a side effect (e.g., printing formatted text)
console.log("Executing forEach() iteration:");
numbers.forEach((num, index) => {
    console.log(`  Element at index ${index} is: ${num}`);
});