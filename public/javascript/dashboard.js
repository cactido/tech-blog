function buttonClickHandler(e) {
    e.preventDefault;
    console.log(e.target.id);
    if (e.target.id === 'article-submit') { newPost() };
    const clicked = e.target.id.split(':');
    console.log(clicked);
    console.log(e.target.type);
    const action = clicked[0];
    const target = clicked[1];
    console.log(`action: ${action} | target: ${target}`);

    switch (action) {
        case 'delete':
            deletePost(target);
            break;
        case 'update':
            updatePost(target);
            break;
    }
};

async function deletePost(target) {
    const confirmDelete = confirm('Really delete this post?');
    if (confirmDelete) {
        await fetch('/api/post/' + target, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        });
    }
    window.location.replace('/dashboard');
}

async function updatePost(target) {
    const newTitle = $('#update-title' + target).val();
    const newBody = $('#update-body' + target).val();
    // create a new object to hold only the data to be updated
    // (allows users to update just the title, just the content, or both)
    var update = {};
    if (newTitle && newBody) {
        update = {
            title: newTitle,
            content: newBody
        }
    } else if (newTitle) { update = { title: newTitle } }
    else if (newBody) { update = { content: newBody } }
    else return;
    console.log(`target: ${target}`);
    await fetch('/api/post/' + target, {
        method: 'put',
        body: JSON.stringify(update),
        headers: { 'Content-Type': 'application/json' }
    })
    window.location.replace('/dashboard');
}

async function newPost(e) {
    const title = $('#article-title').val();
    const content = $('#article-body').val();
    console.log(`title: ${title} | content: ${content}`);
    await fetch('/api/post', {
        method: 'post',
        body: JSON.stringify({
            title: title,
            content: content
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    window.location.replace('/dashboard');
}

// button listener
$('button').on('click', buttonClickHandler);