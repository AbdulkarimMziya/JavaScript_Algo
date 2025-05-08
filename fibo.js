function fibs(num) {
    const array = [0, 1];

    let i = array.length;
    while(i < num) {
        const [a,b] = array.slice(-2);
        array.push(a + b);

        i++;
    }

    return array;
}

const fib8 = fibs(10);
console.log("Fibo: " +fib8);

function fibsRec(num) {
    if(num === 0) {
        return 0;
    }

    if(num === 1) {
        return 1;
    }

    return Array.push(fibsRec(num - 1) + fibsRec(num - 2));
}

const fibR8 = fibs(10);
console.log("Fibo recurssive: " + fibR8);