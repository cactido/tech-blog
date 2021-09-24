async function newComment(e) {
    e.preventDefault();
    // target will be undefined if the button clicked was not the 'Comment' button, otherwise it will be the article ID
    const target = parseInt(e.target.id.split(':')[1]);
    const commentBody = $('#commentText' + target).val();
    if (target != undefined) {
        if (commentBody === '') {
            alert('Please enter a comment before submitting.');
            return;
        }
    } else {
        const response = await fetch('/api/comment/', {
            method: 'post',
            body: JSON.stringify({
                text: commentBody,
                post_id: target
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        window.location.replace('/home');
    }
}

$('button').on('click', newComment);