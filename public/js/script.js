const button = document.querySelector('.reg-button');

const registerSuccess = data => {
    console.log(`User has been created ${data}`);
    alert('You are logged in')

}
const failure = err => {
    console.log(`Oops ${err.message}`);
    alert('Try to register again')
}
const sendData = (user, endpoint, callback) => {
    let url = `http://localhost:1111/${endpoint}`;
    let options = {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    fetch(url, options)
        .then(res => res.json())
        .then(content => {
            if ('error' in content) {
                failure(content.error)
            }
            if ('data' in content) {
                callback(content.data)
            }
        })
}
const doReg = event => {
    event.preventDefault();
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#pass').value;
    let user = {
        email: email,
        password: password
    }

    let endpoint = "register";
    sendData(user, endpoint, registerSuccess)

}
button.addEventListener('click', doReg)