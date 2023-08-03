
function saveToLocalStorage() {
    const inputElem = document.getElementById('local');
    localStorage.setItem('name', inputElem.value);
}



function saveToSessionStorage() {
    const inputElem = document.getElementById('session');
    sessionStorage.setItem('age', inputElem.value);
}



function readFromLoacalStorage() {
    // const value = localStorage.getItem('name');
    // console.log(value)

    const arr = [
        { name: 'Ari', age: 20 },
        { name: 'gal', age: 26 },
        { name: 'omer', age: 30 }
    ];

    localStorage.setItem('users', JSON.stringify(arr));

    const users = localStorage.getItem('users');
    console.log(JSON.parse(users));
}