const textElement = document.querySelectorAll('.colors');
const colors = ['red', 'blue', 'green', 'pink', 'yellow', 'purple', 'nude']; // Array com as cores que serão usadas no gradiente
let colorIndex = 0; // Variável para rastrear o índice atual da cor

setInterval(function() {
    textElement[0].style.color=colors[colorIndex];
    textElement[1].style.color=colors[colorIndex+1];
    colorIndex = (colorIndex + 1) % colors.length; // Altera o índice da cor para a próxima cor no array
  }, 1000); // Altera o gradiente a cada 1000 milissegundos (1 segundo)
  