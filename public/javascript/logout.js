async function logout() {
    await fetch('/api/user/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });
}

$('#logout-link').on('click', logout);