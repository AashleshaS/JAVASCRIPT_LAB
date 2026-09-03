function reverseString(str) {
    // 1. split('') converts string into array of characters
    // 2. reverse() reverses array in-place
    // 3. join('') combines array elements back into a string
    return str.split('').reverse().join('');
}

// Test
const inputStr = "Hello World";
console.log("Original:", inputStr);
console.log("Reversed:", reverseString(inputStr)); 
// Output: "dlroW olleH"