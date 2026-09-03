function countVowels(paragraph) {
    const vowels = "aeiouAEIOU";
    let count = 0;

    for (let char of paragraph) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}

// Test
const para = "JavaScript is a versatile programming language used for web development.";
console.log("Total Vowels:", countVowels(para)); 
// Output: 24