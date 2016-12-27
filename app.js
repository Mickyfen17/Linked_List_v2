retriveBookmarks();

$("#enter-button").on("click", function() {
  getInputValues();
  clearInputs();
});

$(".bookmark-field").on("click", ".read-button", function() {
  $(this).toggleClass("read");
  $(".bookmark-card").toggleClass("read-bookmark");
  $(".bookmark-content").toggleClass("read-content");
});

$(".bookmark-field").on("click", ".delete-button", function() {
  var id = $(this).closest("article").attr("id");
  localStorage.removeItem(id);
  $(this).closest("article").remove();
});

function getInputValues() {
  var titleValue = $("#bookmark-title-input").val();
  var contentValue = $("#bookmark-content-input").val();
  var uniqueId = Date.now();
  var newBookmark = new Bookmark(uniqueId, titleValue, contentValue);
  stringToLocal(uniqueId, newBookmark);
}

function clearInputs() {
  $("#bookmark-title-input").val("");
  $("#bookmark-content-input").val("");
}

function Bookmark(id, title, content) {
  this.id = id;
  this.title = title;
  this.content = content;
}

function stringToLocal(id, bookmarkObj) {
  var stringBookmark = JSON.stringify(bookmarkObj);
  localStorage.setItem(id, stringBookmark);
  retriveBookmarks();
}

function retriveBookmarks() {
  $(".bookmark-card").remove();
  for(var key in localStorage) {
    var parsedBookmark = JSON.parse(localStorage[key]);
    displayBookmark(parsedBookmark);
  }
}

function displayBookmark(bookmark) {
  $(".bookmark-field").prepend(`
    <article id="${bookmark.id}" class="bookmark-card">
      <h3 class="bookmark-title">${bookmark.title}</h3>
      <h4 class="aTagWrapper">
        <a class="bookmark-content" href="http://${bookmark.content}">${bookmark.content}</a>
      </h4>
      <div class="buttons-wrapper">
        <button class="read-button">Read</button>
        <button class="delete-button">Delete</button>
      </div>
    </article>
  `);
}
