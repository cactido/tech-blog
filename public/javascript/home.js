async function newComment(e) {
    e.preventDefault();
    // target will be undefined if the button clicked was not the 'Comment' button, otherwise it will be the article ID
    const target = parseInt(e.target.id.split(':')[1]);
    // retrieve the text from the comment field
    const commentBody = $('#commentText' + target).val();
    // evaluates to true if the button clicked was the 'Comment' button but there was no text in the entry field
    if (target != undefined && commentBody === '') {
        alert('Please enter a comment before submitting.');
        return;
    } 
    // if the 'Comment' button is clicked and there is text in the entry field, POST the comment and
    // reload the dashboard
    else if (target != undefined && commentBody != '') {
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
// button click handler
$('button').on('click', newComment);