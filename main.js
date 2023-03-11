const form = document.querySelector('#comment-form'),
    commentName = form.querySelector('#comment-name'),
    commentText = form.querySelector('#comment-text'),
    commentDate = form.querySelector('#comment-date'),
    commentsList = document.querySelector('#comments-list');

form.addEventListener('submit', addComment);

function addComment(event) {
    event.preventDefault();

    const name = commentName.value.trim();
    const text = commentText.value.trim();
    const date = commentDate.valueAsNumber || new Date();

    
    const li = document.createElement('li');

    li.innerHTML = `
    <span class="comment-author">${name}</span>
    <em class="comment-date">${formatDate(date)}</em>
    <button class="comment-del">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px"
             height="30px">
               <path
               d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" />
         </svg>
    </button>
    <p class="comment-text">${text}</p>
    <button class="comment-like">
        <svg fill="#000000" width="32px" height="32px" viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M26.996 12.898c-.064-2.207-1.084-4.021-2.527-5.13-1.856-1.428-4.415-1.69-6.542-.132-.702.516-1.359 1.23-1.927 2.168-.568-.938-1.224-1.652-1.927-2.167-2.127-1.559-4.685-1.297-6.542.132-1.444 1.109-2.463 2.923-2.527 5.13-.035 1.172.145 2.48.788 3.803 1.01 2.077 5.755 6.695 10.171 10.683l.035.038.002-.002.002.002.036-.038c4.415-3.987 9.159-8.605 10.17-10.683.644-1.323.822-2.632.788-3.804z" />
        </svg>
    </button>
    `;

    commentsList.appendChild(li);

    commentName.value = '';
    commentText.value = '';
    commentDate.value = '';
}

function formatDate(milliseconds) {
    const now = new Date();
    const date = new Date(milliseconds);
    if (date.toDateString() === now.toDateString()) {
        return `сегодня, ${date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' })}`;
    } else if (date.toDateString() === new Date(now - 86400000).toDateString()) {
        return `вчера, ${date.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' })}`;
    } else {
        return date.toLocaleDateString('ru-RU');
    }
}

//Удаление комментария и добавление лайка

commentsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('comment-del')) {
        event.target.closest('li').remove();
    } else if (event.target.classList.contains('comment-like')) {
        event.target.classList.toggle('comment-like-active');
    }
});

