$("#enter-button").on("click", function() {
    var titleValue = $("#bookmark-title").val();
    var contentValue = $("#bookmark-content").val();
    var uniqueId = Date.now();
    var newBookmark = new Bookmark(uniqueId, titleValue, contentValue);
    stringToLocal(uniqueId, newBookmark);
    // console.log(newBookmark);
    clearInputs();
});

function clearInputs() {
  $("#bookmark-title").val("");
  $("#bookmark-content").val("");
}

function Bookmark(id, title, content) {
  this.id = id;
  this.title = title;
  this.content = content;
}

function stringToLocal(id, bookmarkObj) {
  var stringBookmark = JSON.stringify(bookmarkObj);
  localStorage.setItem(id, stringBookmark);
  // console.log(stringBookmark);
}
