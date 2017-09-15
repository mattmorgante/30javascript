function sum (...numbers) {
    return numbers.reduce(function (prev, current) {
        return prev + current;
    })
}

sum(1,2,3);