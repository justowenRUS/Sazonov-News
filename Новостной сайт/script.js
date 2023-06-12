// script.js
function updateSystemTime() {
  var currentTime = new Date();
  var options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  var locale = 'ru-RU';
  var formattedDate = currentTime.toLocaleString(locale, options);

  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  var timeString = hours + ":" + minutes + ":" + seconds;

  var systemTimeElement = document.getElementById("system-time");
  systemTimeElement.textContent = formatDayOfWeek(formattedDate) + " " + timeString;

  setTimeout(updateSystemTime, 1000); // Обновляем время каждую секунду
}

function formatDayOfWeek(dateString) {
  var parts = dateString.split(', ');
  var dayOfWeek = parts[0];
  var restOfDate = parts[1];

  // Приводим первую букву дня недели к верхнему регистру
  dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

  return dayOfWeek + ', ' + restOfDate;
}

updateSystemTime();

window.addEventListener("DOMContentLoaded", function() {
  updateSystemTime();
});

function navigateToCategory(category) {
  var headers = document.getElementsByClassName('header');
  for (var i = 0; i < headers.length; i++) {
    headers[i].classList.remove('active');
  }

  var categories = document.getElementsByClassName('category');
  for (var j = 0; j < categories.length; j++) {
    categories[j].style.display = 'none';
  }

  document.getElementById(category).style.display = 'block';
  document.getElementById(category).previousElementSibling.classList.add('active');
}

function navigateToIndex() {
  window.location.href = "../../index.html#politic";
}


function showAllNews() {
  var categories = document.getElementsByClassName('category');
  for (var i = 0; i < categories.length; i++) {
    if (categories[i].id === 'all') {
      categories[i].style.display = 'block';
    } else {
      categories[i].style.display = 'none';
    }
  }
}

showAllNews();

function redirectToNewsPage() {
  window.location.href = 'news/politic/news.html';
}

function redirectToMilitaryPage() {
  window.location.href = 'news/military/military.html';
}

// Получаем ссылки на необходимые элементы
var submitButton = document.getElementById('submitComment');
var usernameInput = document.getElementById('username');
var commentInput = document.getElementById('comment');
var commentsContainer = document.querySelector('.comments');

// Функция для создания нового комментария
function createComment(username, text) {
  var commentElement = document.createElement('div');
  commentElement.classList.add('comment');
  commentElement.setAttribute('data-username', username);

  var avatarElement = document.createElement('div');
  avatarElement.classList.add('avatar');

  var commentContentElement = document.createElement('div');
  commentContentElement.classList.add('comment-content');

  var usernameElement = document.createElement('p');
  usernameElement.classList.add('username');
  usernameElement.textContent = username;

  var textElement = document.createElement('p');
  textElement.classList.add('text');
  textElement.textContent = text;

  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Удалить';
  deleteButton.addEventListener('click', function() {
    removeComment(commentElement);
  });

  commentContentElement.appendChild(usernameElement);
  commentContentElement.appendChild(textElement);
  commentContentElement.appendChild(deleteButton);

  commentElement.appendChild(avatarElement);
  commentElement.appendChild(commentContentElement);

  return commentElement;
}

// Функция для удаления комментария
function removeComment(commentElement) {
  commentElement.remove();
}

// Обработчик события клика на кнопку "Отправить"
submitButton.addEventListener('click', function() {
  var username = usernameInput.value;
  var commentText = commentInput.value;

  // Проверяем, чтобы поля ввода были заполнены
  if (username && commentText) {
    // Проверяем, не создан ли уже комментарий от данного пользователя
    var existingComment = commentsContainer.querySelector(`.comment[data-username="${username}"]`);
    if (existingComment) {
      alert('Вы уже оставили комментарий');
    } else {
      // Создаем новый комментарий
      var newComment = createComment(username, commentText);

      // Добавляем новый комментарий в разметку HTML
      commentsContainer.insertBefore(newComment, commentsContainer.firstChild);

      // Очищаем поля ввода после добавления комментария
      usernameInput.value = '';
      commentInput.value = '';
    }
  }
});

// Находим кнопку отправки комментария и добавляем обработчик события
var submitButton = document.getElementById('submitComment');
submitButton.addEventListener('click', submitComment);
