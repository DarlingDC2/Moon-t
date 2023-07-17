const magic8BallAPI = 'https://example.com/magic8ball';

// CoinAPI
const coinAPI = 'https://rest.coinapi.io/v1/exchangerate/USD?apikey=7b72ea8e-06cd-478c-a3bb-db22a10da94c&invert=true&output_form';

// Node As Service API
const nodeAsServiceAPI = 'wss://ws.coinapi.io/v1/f742dc80-ee75-4715-b022-220e5d9ed028';

// EMS API
const emsAPI = 'https://ems-mgmt.coinapi.io/?apikey=d8952a6c-b2a2-4f79-81c7-0bc3922a67e5';

// Function to fetch cryptocurrency data
async function fetchCryptoData() {
  try {
    const response = await fetch(coinAPI);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching cryptocurrency data:', error);
    throw error;
  }
}

// Function to display cryptocurrency data graph
function displayCryptoDataGraph(crypto, rate) {
  // Display the selected cryptocurrency in the 8 Ball
  const ball = document.getElementById('ball');
  const cryptoName = document.createElement('div');
  cryptoName.classList.add('crypto-name');
  cryptoName.textContent = crypto;
  ball.appendChild(cryptoName);

  // Display the market data of the selected cryptocurrency
  const cryptoMarketData = document.createElement('div');
  cryptoMarketData.classList.add('crypto-market-data');
  cryptoMarketData.textContent = `Rate: ${rate}`;
  ball.appendChild(cryptoMarketData);

  // Create a canvas element for the graph
  const canvas = document.createElement('canvas');
  canvas.classList.add('crypto-graph');
  ball.appendChild(canvas);

  // Generate the graph using a library (e.g., Chart.js)
  generateCryptoGraph(canvas, crypto);
}

// Function to generate the cryptocurrency graph using Chart.js library
function generateCryptoGraph(canvas, crypto) {
  // Fetch the market data for the cryptocurrency (not implemented in this code)
  const marketData = {};

  // Extract the labels and values from the market data
  const labels = Object.keys(marketData);
  const values = Object.values(marketData);

  // Create the chart using Chart.js
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Market Data',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function handleMagic8BallShake() {
  // Define an array of 8 Ball responses for buying
  const buyResponses = [
    'BROOOO! Buy Buy Buy!',
    "You're gonna wanna buy",
    'SELL! Lol jk, buy it idiot',
    'Eh, why not?',
    'WOAH!! Buy this!',
    'No one loves you',
    'Fuck it...',
    'Shit yeah!',
    'Yes.',
    'Signs point to- who cares buy it',
  ];

  // Define an array of 8 Ball responses for selling
  const sellResponses = [
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don\'t count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.',
  ];

  // Randomly select a response from either the buyResponses or sellResponses array
  const randomIndex = Math.floor(Math.random() * (buyResponses.length + sellResponses.length));
  const response = randomIndex < buyResponses.length ? buyResponses[randomIndex] : sellResponses[randomIndex - buyResponses.length];

  // Remove existing response if present
  const existingResponseDiv = document.querySelector('.response');
  if (existingResponseDiv) {
    existingResponseDiv.remove();
  }

  // Create a div element to display the response
  const responseDiv = document.createElement('div');
  responseDiv.classList.add('response');
  responseDiv.style.backgroundColor = 'gray';
  responseDiv.style.color = 'white';
  responseDiv.textContent = response;

  // Insert the response div below the Shake button and above the h3 tags
  const shakeButton = document.getElementById('shake-button');
  const questionSection = document.querySelector('.question');
  questionSection.insertBefore(responseDiv, shakeButton.nextSibling);

  // Fetch cryptocurrency data
  fetchCryptoData()
    .then(data => {
      console.log(data); // Log the data object to see its structure

      const rates = data?.rates;
      if (!rates) {
        throw new Error('Rates not found in API response');
      }

      // Get an array of available currencies
      const currencies = Object.keys(rates);

      // Randomly select a currency
      const randomIndex = Math.floor(Math.random() * currencies.length);
      const randomCurrency = currencies[randomIndex];
      const rate = rates[randomCurrency].rate;

      console.log('Random Currency:', randomCurrency);
      console.log('Rate:', rate);

      // Display the selected cryptocurrency and its rate
      displayCryptoDataGraph(randomCurrency, rate);
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

function loadSavedCryptos() {
    const savedCryptos = JSON.parse(localStorage.getItem('savedCryptos')) || [];
  
    // Display the saved cryptocurrencies in the dropdown menu
    const dropdownContent = document.querySelector('.dropdownContent');
    dropdownContent.innerHTML = ''; // Clear existing options
  
    savedCryptos.forEach(crypto => {
      const dropdownOption = document.createElement('a');
      dropdownOption.href = '#'; // Set the link for each option
      dropdownOption.textContent = crypto;
      dropdownContent.appendChild(dropdownOption);
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
