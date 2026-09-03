// A. Basics of Strings
let text = "JavaScript Programming";

console.log(text.length);       // 22 (Property: returns total characters)
console.log(text.charAt(0));     // "J" (Gets character at specified index)
console.log(text.toLowerCase());// "javascript programming"
console.log(text.toUpperCase());// "JAVASCRIPT PROGRAMMING"

// B. Core String Methods
// 1. substring(start, end) - Extracts characters between start and end (excluding end)
let sub = text.substring(0, 10); 
console.log(sub); // "JavaScript"

// 2. indexOf(searchValue) - Returns first index of matching substring (-1 if not found)
let position = text.indexOf("Prog"); 
console.log(position); // 11

// 3. split(separator) - Splits string into an array of substrings
let words = text.split(" "); 
console.log(words); // ["JavaScript", "Programming"]

// 4. replace(searchValue, newValue) - Replaces the first matching value
let newText = text.replace("JavaScript", "JS"); 
console.log(newText); // "JS Programming"