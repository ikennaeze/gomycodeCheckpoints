let sentence = "Hey my name is Ikenna and I suck at time complexity"

console.log("The sentence is " + checkLength(sentence) + " characters long.")
console.log("The sentence has " + wordCount(sentence) + " words")
console.log("The sentence has " + vowelCount(sentence) + " vowels")

function checkLength(sentence){
    return sentence.length
}

function wordCount(sentence){
    let words = sentence.split(" ") //array to contain all words in sentence

    let i = 0 //array index number
    let wordCounter = 0 //word counter

    //while i is less than the highest array index,
    //if a word exists increment the word counter by 1
    //then move onto the next index in the words array
    while(i < words.length){
        if(words[i] != null)
            wordCounter++
        i++
    }

    return wordCounter
}

function vowelCount(sentence){
    let vowels = "aAeEiIoOuU";

    let vowelsCounter = 0;
    let i = 0

    //while the array index is less than the highest index
    //if a vowel exists in the sentence, increment the vowels counter by 1
    // then move onto the next char in the sentence
    while(i < sentence.length) {
        if (vowels.indexOf(sentence[i]) !== -1) {
            vowelsCounter++;
        }
        i++
    }
    return vowelsCounter;
}