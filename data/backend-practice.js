const img = new XMLHttpRequest;
img.addEventListener('load', () => {
  console.log(img.response);
});
img.open('GET','https:/supersimplebackend.dev/images/apple.jpg');
img.send();


 