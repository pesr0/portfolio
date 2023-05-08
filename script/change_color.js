const textElement = document.querySelectorAll('.colors');
const colors = ['red', 'blue', 'green', 'pink', 'yellow', 'purple', 'nude']; // Array com as cores que serão usadas no gradiente
let colorIndex = 0; // Variável para rastrear o índice atual da cor

function changeColor() {
    setTimeout(() => {
        textElement.forEach(element => {
            element.style.color=colors[colorIndex];
        });
        colorIndex = (colorIndex + 1) % colors.length; // Altera o índice da cor para a próxima cor no array
        changeColor();

    }, 1000);
  };
  
  changeColor();