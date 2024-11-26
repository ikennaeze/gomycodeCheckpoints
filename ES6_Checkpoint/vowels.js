function getVowelsES5(str){
    let vowels = ['a', 'e', 'i', 'o', 'u']; //array of vowel characters
    let strChars = str.split(""); //array of given string characters

    var allVowels = "" //variable to contain all vowels
    let i = 0;

    //find all matches of vowels in string until i is equal to the string length
    while(i < strChars.length){
        let foundVowel = str.match(vowels[i]);

        //dont add any null values to the 'allVowels' variable
        if(foundVowel != null)
            allVowels += foundVowel;
        i++;
    }

    console.log("Finding all vowels in a string using the ES5 way: " + allVowels)
}

const getVowelsES6 = (str) => {
    let vowels = ['a', 'e', 'i', 'o', 'u']; //array of vowel characters
    let strChars = str.split(""); //array of given string characters

    var allVowels = "" //variable to contain all vowels
    let i = 0;

    //find all matches of vowels in string until i is equal to the string length
    while(i < strChars.length){
        let foundVowel = str.match(vowels[i]);

        allVowels = foundVowel != null ? allVowels + foundVowel : allVowels + ""
        i++;
    }

    console.log("Finding all vowels in a string using the ES6 way: " + allVowels)
}

getVowelsES5("heya brotha ikenna")
getVowelsES6("yo yo yo wuz good my guy")