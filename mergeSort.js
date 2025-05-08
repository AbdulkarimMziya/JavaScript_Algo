function mergeSort(array) {

    if( array.length === 1) return array;

    const mid = Math.floor(array.length / 2);
    const leftArray = mergeSort(array.slice(0,mid));
    const rightArray = mergeSort(array.slice(mid));

    return merge(leftArray, rightArray);

}

function merge(leftArray,rightArray) {
    const mergeArray = [];
    
    let [i ,l,r] = [0, 0, 0];

    while ( l < leftArray.length && r < rightArray.length) {
        if (leftArray[l] <= rightArray[r]) {
            mergeArray[i++] = leftArray[l++];
        }
        else {
            mergeArray[i++] = rightArray[r++];
        }
    }

    while (l < leftArray.length) {
        mergeArray[i++] = leftArray[l++];
    }

    while (r < rightArray.length) {
        mergeArray[i++] = rightArray[r++];
    }

    return mergeArray;
}

console.log("Merge Sort: " + mergeSort([105, 79, 100, 110]));