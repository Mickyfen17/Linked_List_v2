$(document).ready(function() {
  retriveBookmarks();
  calcBookmarks(".bookmark-card", ".total-bookmarks");
  calcBookmarks(".read-bookmark", ".read-count");
  calcUnreadBookmarks();
});

$("#enter-button").on("click", function() {
  getInputValues();
  clearInputs();
  testEmptyInputs();
  calcBookmarks(".bookmark-card", ".total-bookmarks");
  calcUnreadBookmarks();
});

$("#clear-all-button").on("click", function() {
  removeAllReadFromLS();
  $(".read-bookmark").remove();
  calcBookmarks(".bookmark-card", ".total-bookmarks");
  calcBookmarks(".read-bookmark", ".read-count");
});

function removeAllReadFromLS() {
  var readBookmarks = $(".read-bookmark");
  readBookmarks.each(function(i, bookmark) {
    var id = $(bookmark).attr("id");
    localStorage.removeItem(id);
  });
}

$("#bookmark-title-input, #bookmark-content-input").on("keyup", function() {
  testEmptyInputs();
});

$(".bookmark-field").on("click", ".read-button", function() {
  $(this).toggleClass("read");
  $(this).closest(".bookmark-card").toggleClass("read-bookmark");
  alterReadClassInLS(this);
  calcBookmarks(".read-bookmark", ".read-count");
  calcUnreadBookmarks();
});

$(".bookmark-field").on("click", ".delete-button", function() {
  var id = $(this).closest("article").attr("id");
  localStorage.removeItem(id);
  $(this).closest("article").remove();
  calcBookmarks(".bookmark-card", ".total-bookmarks");
  calcBookmarks(".read-bookmark", ".read-count");
  calcUnreadBookmarks();
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

function testEmptyInputs() {
  var titleValue = $("#bookmark-title-input").val();
  var contentValue = $("#bookmark-content-input").val();
  if(titleValue.length > 2 && contentValue.length > 2) {
    $("#enter-button").prop("disabled", false);
  } else {
    $("#enter-button").prop("disabled", true);
  }
}

function calcBookmarks(bookmarkClassType, counterToChange) {
  var bookmarksOnPage = $(bookmarkClassType).length;
  $(counterToChange + " span").text(bookmarksOnPage);
}

function calcUnreadBookmarks() {
  var readBookmarks = $(".read-bookmark").length;
  var bookmarksOnPage = $(".bookmark-card").length;
  $(".unread-count span").text(bookmarksOnPage - readBookmarks);
}

function alterReadClassInLS(bookmarkCard) {
  var id = $(bookmarkCard).closest(".bookmark-card").attr("id");
  var parsedBookmark = JSON.parse(localStorage.getItem(id));
  if($(bookmarkCard).hasClass("read")) {
    parsedBookmark.readBookmark = "read-bookmark";
    parsedBookmark.readButton = "read";
  } else {
    parsedBookmark.readBookmark = "";
    parsedBookmark.readButton = "";
  }
  localStorage.setItem(id, JSON.stringify(parsedBookmark));
}

function Bookmark(id, title, content) {
  this.id = id;
  this.title = title;
  this.content = content;
  this.readButton = "";
  this.readBookmark = "";
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
    <article id="${bookmark.id}" class="bookmark-card ${bookmark.readBookmark}">
      <h3 class="bookmark-title">${bookmark.title}</h3>
      <h4 class="aTagWrapper">
        <a class="bookmark-content" href="http://${bookmark.content}">${bookmark.content}</a>
      </h4>
      <div class="buttons-wrapper">
        <button class="read-button ${bookmark.readButton}">Read</button>
        <button class="delete-button">Delete</button>
      </div>
    </article>
  `);
}
