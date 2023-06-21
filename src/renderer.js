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

 function showPresetWindow(presetIndex) {
    const preset = presets[presetIndex];

    // Open a new window for changing values
    const presetWindow = window.open('', 'Preset Settings', 'width=400,height=450');

    // Create the HTML content for the new window
    const windowContent = `
      <html>
        <head>
          <title>Preset Settings</title>
          <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
    }

    .container {
      width: 400px;
      padding: 20px;
      background-color: #f0f0f0;
      border-radius: 4px;
    }

    h2 {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
    }

    input {
      margin-bottom: 10px;
      width: 50%;
      padding: 5px;
      box-sizing: border-box;
      text-align: center;
      font-weight: bold;
    }

    button {
      padding: 5px 10px;
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
      margin-top: 10px;
      border-radius: 4px;
    }

    button:hover {
      background-color: #45a049;
    }
  </style>
        </head>
        <body>
          <h2>Preset ${presetIndex + 1} Settings</h2>
          <label for="percentAdd">Percent Add:</label>
          <input type="number" id="percentAdd" value="${preset.percentAdd}">
          <br>
          <label for="kursas">Kursas:</label>
          <input type="number" id="kursas" value="${preset.kursas}">
          <br>
          <label for="PVM">PVM:</label>
          <input type="number" id="PVM" value="${preset.PVM}">
          <br>
          <button id="saveButton">Save</button>

          <script>
            const saveButton = document.getElementById('saveButton');
            saveButton.addEventListener('click', () => {
              const percentAddInput = document.getElementById('percentAdd');
              const kursasInput = document.getElementById('kursas');
              const PVMInput = document.getElementById('PVM');

              // Send the updated values back to the parent window
              window.opener.postMessage({
                presetIndex: ${presetIndex},
                percentAdd: parseFloat(percentAddInput.value),
                kursas: parseFloat(kursasInput.value),
                PVM: parseFloat(PVMInput.value)
              }, '*');

              // Close the window
              window.close();
            });
          </script>
        </body>
      </html>
    `; 

    // Set the content of the new window
    presetWindow.document.open();
    presetWindow.document.write(windowContent);
    presetWindow.document.close();
  }  

    
  function applyPreset(index) {
    const preset = presets[index];
    percentAdd = preset.percentAdd;
    kursas = preset.kursas;
    PVM = preset.PVM;

    let newSum = 0;
  
    // Recalculate outputs
    for (let i = 0; i < rowContainer.children.length; i++) {
      const row = rowContainer.children[i];
      const inputSpan = row.querySelector('.input-column span');
      const outputSpan = row.querySelector('.output-column span');
      const inputValue = Number(inputSpan.textContent);
      const outputValue = Number((inputValue * percentAdd / kursas * PVM).toFixed(2));
      outputSpan.textContent = outputValue.toFixed(2);
  
      // Update the sum
      newSum += outputValue;
    }

    // Update the sum element
    sum = newSum;
    sumElement.textContent = `Suma EUR: ${sum.toFixed(2)}`;
  
    // Update active preset button
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

  preset1Button.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    showPresetWindow(0);
  });

  preset2Button.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    showPresetWindow(1);
  });

  preset3Button.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    showPresetWindow(2);
  });

  convertButton.addEventListener('click', createRow);
  inputNumber.addEventListener('keydown', handleInputKeyPress);
  clearButton.addEventListener('click', clearRows);

  // Listen for the message event from the popup window
  window.addEventListener('message', (event) => {
    if (event.data && event.data.presetIndex !== undefined) {
      const { presetIndex, percentAdd, kursas, PVM } = event.data;
      presets[presetIndex].percentAdd = percentAdd;
      presets[presetIndex].kursas = kursas;
      presets[presetIndex].PVM = PVM;
      if (presetIndex === 0) {
        applyPreset(0);
      } else if (presetIndex === 1) {
        applyPreset(1);
      } else if (presetIndex === 2) {
        applyPreset(2);
      }
    }
  });
});

