  window.addEventListener('DOMContentLoaded', () => {
    const inputNumber = document.getElementById('inputNumber');
    const rowContainer = document.getElementById('rowContainer');
    const convertButton = document.getElementById('convertButton');
    const clearButton = document.getElementById('clearButton');
    const sumElement = document.getElementById('sum');
    let sum = 0;
    let percentAdd = 1.05;
    let kursas = 4.4;
    let PVM = 1.21;
    let isFirstRow = true;
  
    function createRow() {
      const inputValue = Number(inputNumber.value);
      const outputValue = Number((inputValue * percentAdd / kursas * PVM).toFixed(2));
  
      const row = document.createElement('div');
      row.classList.add('row');
  
      const inputColumn = document.createElement('div');
      inputColumn.classList.add('input-column');
      
      const inputLabel = document.createElement('label');
      inputLabel.textContent = isFirstRow ? 'PLN:' : '';
      inputColumn.appendChild(inputLabel);

      const inputSpan = document.createElement('span');
      inputSpan.textContent = inputValue;
      inputColumn.appendChild(inputSpan);
  
      const outputColumn = document.createElement('div');
      outputColumn.classList.add('output-column');  

      const outputLabel = document.createElement('label');
      outputLabel.textContent = isFirstRow ? 'EUR:' : '';
      outputColumn.appendChild(outputLabel);
  
      const outputSpan = document.createElement('span');
      outputSpan.classList.add('output-value');
      outputSpan.textContent = outputValue;
      outputColumn.appendChild(outputSpan);
  
      row.appendChild(inputColumn);
      row.appendChild(outputColumn);
  
      rowContainer.appendChild(row);
  
      // Update the sum
      sum += outputValue;
      sumElement.textContent = `Suma EUR: ${sum.toFixed(2)}`;
  
      // Clear input field
      inputNumber.value = '';
  
      // Focus on input field
      inputNumber.focus();

      isFirstRow = false;
    }
  
    function handleInputKeyPress(event) {
      if (event.key === 'Enter') {
        createRow();
      }
    }
  
    function clearRows() {
      rowContainer.innerHTML = '';

      inputNumber.value = '';
      inputNumber.focus();

      sum = 0;
      sumElement.textContent = '';

      isFirstRow = true;
    }
  
    convertButton.addEventListener('click', createRow);
    inputNumber.addEventListener('keydown', handleInputKeyPress);
    clearButton.addEventListener('click', clearRows);
  });
  