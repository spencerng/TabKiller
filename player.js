chrome.runtime.onMessage.addListener(function(msg) {
  var audio = new Audio("https://www.fesliyanstudios.com/soundeffects-download.php?id=7251");
  audio.play();
});