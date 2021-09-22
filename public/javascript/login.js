async function login() {
    //retrieve username and password from login form
    const username = $('#username-login').val();
    const password = $('#password-login').val();
    const data = await fetch('/api/user/login', {
        method: 'post',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(data);
    window.location.replace('/');
}

async function register() {
    //retrieve username and password from registration form
    const username = $('#username-register').val();
    const password = $('#password-register').val();
    console.log(username, password);
    const data = await fetch('/api/user/signup', {
        method: 'post',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(data);
    window.location.replace('/');
}
//form submit handlers
$('#login').submit(event => {
    event.preventDefault();
    login();
});
$('#register').submit(event => {
    event.preventDefault();
    register();
})