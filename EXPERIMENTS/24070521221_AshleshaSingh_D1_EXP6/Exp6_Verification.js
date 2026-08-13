let text="Contact us at aashlesha21@example.com or support@gmail.com. Welcome to our website!";

//1.Email validation
let email="student@example.com";
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log("Valid Email:",emailRegex.test(email));

//2.Data extraction - extract all emails
let emails=text.match(/[^\s@]+@[^\s@]+\.[^\s@]+/g);
console.log("Extracted Emails:",emails);

//3.String functions
console.log("Uppercase:",text.toUpperCase());
console.log("Lowercase:",text.toLowerCase());
console.log("Contains 'Welcome':",text.includes("Welcome"));
console.log("Text Length:",text.length);

//4.Text analysis
let words=text.split(/\s+/);
console.log("Number of words:",words.length);

//count occurrences of "email"
let count =(text.match(/email/gi) || []).length;
console.log("Occurrences of 'email':",count);