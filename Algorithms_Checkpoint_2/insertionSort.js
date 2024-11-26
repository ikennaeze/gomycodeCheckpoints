let unSorted = [23, 4, 5, 9, 7, 32, 15, 22, 8, 17]

console.log("The array before it was sorted: " + unSorted)
console.log("The array after it was sorted: " + insertionSort(unSorted))

function insertionSort(array){
    for (let i = 1; i < array.length; i++) {
        let currentVal = array[i];
        let prevIndex = i - 1;

        //O(n) time complexity
        while (prevIndex >= 0 && array[prevIndex] > currentVal) {
            array[prevIndex + 1] = array[prevIndex]; //make item to the right of current value the new left value
            prevIndex--
        }
        array[prevIndex + 1] = currentVal; //put the current value one position ahead of their current position
    }
    return array
}