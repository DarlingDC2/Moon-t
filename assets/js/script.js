// Magic 8 Ball API
const magic8BallAPI = 'https://example.com/magic8ball';

// CoinAPI
const coinAPI = 'https://rest.coinapi.io/v1/exchangerate/USD?apikey=7b72ea8e-06cd-478c-a3bb-db22a10da94c&invert=true&output_form';

// Node As Service API
const nodeAsServiceAPI = 'wss://ws.coinapi.io/v1/f742dc80-ee75-4715-b022-220e5d9ed028';

// EMS API
const emsAPI = ' https://ems-mgmt.coinapi.io/accounts?apikey=d8952a6c-b2a2-4f79-81c7-0bc3922a67e5';

// Function to fetch cryptocurrency data
async function fetchCryptoData() {
  try {
    const response = await fetch(coinAPI);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching cryptocurrency data:', error);
  }
}

// Function to display cryptocurrency data graph
function displayCryptoDataGraph(crypto) {
  // Display the selected cryptocurrency in the 8 Ball
  const ball = document.getElementById('ball');
  const cryptoName = document.createElement('div');
  cryptoName.classList.add('crypto-name');
  cryptoName.textContent = crypto.name;
  ball.appendChild(cryptoName);

  // Display the market data of the selected cryptocurrency
  const cryptoMarketData = document.createElement('div');
  cryptoMarketData.classList.add('crypto-market-data');
  cryptoMarketData.textContent = `Price: ${crypto.price}, Market Cap: ${crypto.marketCap}`;
  ball.appendChild(cryptoMarketData);

  // Save the selected cryptocurrency to the side dropdown menu and local storage
  const dropdownMenu = document.getElementById('dropdown-menu');
  const dropdownOption = document.createElement('option');
  dropdownOption.textContent = crypto.name;
  dropdownMenu.appendChild(dropdownOption);

  saveCryptoToLocalstorage(crypto.name);
}

// Function to handle Magic 8 Ball shake event
function handleMagic8BallShake() {
  // Perform Magic 8 Ball operations
  // ...

  // Fetch cryptocurrency data
  fetchCryptoData()
    .then(data => {
      // Randomly select a cryptocurrency from the top 100
      const randomIndex = Math.floor(Math.random() * 100);
      const selectedCrypto = data[randomIndex];

      // Display the selected cryptocurrency and its market data
      displayCryptoDataGraph(selectedCrypto);
    })
    .catch(error => {
      console.log('Error retrieving cryptocurrency data:', error);
    });
}

// Function to handle saving selected cryptocurrency to the dropdown menu and local storage
function saveCryptoToLocalstorage(cryptoName) {
  const savedCryptos = JSON.parse(localStorage.getItem('savedCryptos')) || [];
  savedCryptos.push(cryptoName);
  localStorage.setItem('savedCryptos', JSON.stringify(savedCryptos));
}

// Function to load saved cryptocurrencies from local storage
function loadSavedCryptos() {
  const savedCryptos = JSON.parse(localStorage.getItem('savedCryptos')) || [];

  // Display the saved cryptocurrencies in the dropdown menu
  const dropdownMenu = document.getElementById('dropdown-menu');
  savedCryptos.forEach(crypto => {
    const dropdownOption = document.createElement('option');
    dropdownOption.textContent = crypto;
    dropdownMenu.appendChild(dropdownOption);
  });
}

// Function to handle saving selected cryptocurrency to the dropdown menu and local storage
function handleSaveCrypto() {
  const dropdownMenu = document.getElementById('dropdown-menu');
  const selectedCrypto = dropdownMenu.value;

  // Perform save operation for the selected cryptocurrency
  // ...

  saveCryptoToLocalstorage(selectedCrypto);
}

// Add event listener to the Magic 8 Ball
const magic8Ball = document.getElementById('ball');
magic8Ball.addEventListener('click', handleMagic8BallShake);

// Add event listener to the save button
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', handleSaveCrypto);

// Call the function to load saved cryptocurrencies when the page loads
loadSavedCryptos();

