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

   const presets = [
      { percentAdd: 1.05, kursas: 4.4, PVM: 1.21 },
      { percentAdd: 1.20, kursas: 4.4, PVM: 1.21 },
      { percentAdd: 1.50, kursas: 4.4, PVM: 1.21 }
    ]; 
  
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

    function applyPreset(index) {
      const preset = presets[index];
      percentAdd = preset.percentAdd;
      kursas = preset.kursas;
      PVM = preset.PVM;
      isFirstRow = true;
      clearRows();

      for (let i = 1; i <= presets.length; i++) {
        const presetButton = document.getElementById(`preset${i}Button`);
        presetButton.classList.remove('active');
      }
      
      const activePresetButton = document.getElementById(`preset${index + 1}Button`);
      activePresetButton.classList.add('active');      
    }
  
    const preset1Button = document.getElementById('preset1Button');
    const preset2Button = document.getElementById('preset2Button');
    const preset3Button = document.getElementById('preset3Button');

    preset1Button.addEventListener('click', () => {
      applyPreset(0);
    });
  
    preset2Button.addEventListener('click', () => {
      applyPreset(1);
    });
  
    preset3Button.addEventListener('click', () => {
      applyPreset(2);
    }); 
  
    convertButton.addEventListener('click', createRow);
    inputNumber.addEventListener('keydown', handleInputKeyPress);
    clearButton.addEventListener('click', clearRows);
  });
  