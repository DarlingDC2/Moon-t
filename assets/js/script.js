//const magic8BallAPI = 'https://www.eightballapi.com/api';


// CoinAPI
var coinAPI = 'https://rest.coinapi.io/v1/exchangerate/USD?apikey=fb5ef256-11d1-47a5-ba5f-f24a0a691f3a&invert=true&output_form';
let currentCryptoName = null;
let currentCryptoRate = null;

/*
// Node As Service API
const nodeAsServiceAPI = 'wss://ws.coinapi.io/v1/f742dc80-ee75-4715-b022-220e5d9ed028';

// EMS API
const emsAPI = 'https://ems-mgmt.coinapi.io/?apikey=d8952a6c-b2a2-4f79-81c7-0bc3922a67e5';
*/
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

function generateMagic8BallResponse() {
  // Define the Magic 8 Ball responses
  const responses = {
    buy: [
      'Oh hell yeah.',
      'You\'d be silly not to.',
      'Sheckles bro.',
      'Better than gold.',
      'BUY! BUY! BUY!.',
      'You can afford this.',
      'Stop being silly, buy it.',
      'Why not?',
      'Yes.',
      'You know what you should do.'
    ],
    sell: [
      'Bro, you\'re broke.',
      'Still broke.',
      'Sorry Kiddo, mom\'s credit card is tapped.',
      'Go to work.',
      'Give it a break.',
      'Don\'t break my api.',
      'HA! no.',
      'You look sooo silly right now.',
      'Bro your wallet\'s empty.',
      'Seriously?'
    ]
  };

  // Randomly select a type (buy or sell)
  const type = Math.random() < 0.5 ? 'buy' : 'sell';

  // Randomly select a response from the selected type
  const responseIndex = Math.floor(Math.random() * 10);
  const response = responses[type][responseIndex];

  // Return the selected response and its type
  return { response, type };
}

// Function to display cryptocurrency data graph
function displayCryptoDataGraph(crypto, rate) {
  // Display the selected cryptocurrency in the 8 Ball
  const nut = document.getElementById('nut');

  // Before appending new elements, clear the existing ones
  nut.innerHTML = '';

  const cryptoName = document.createElement('div');
  cryptoName.classList.add('crypto-name');
  cryptoName.textContent = crypto;
  nut.appendChild(cryptoName);

  // Prevent event propagation to the parent
  cryptoName.addEventListener('click', event => {
    event.stopPropagation();
  });

  // Display the market data of the selected cryptocurrency
  const cryptoMarketData = document.createElement('div');
  cryptoMarketData.classList.add('crypto-market-data');
  cryptoMarketData.textContent = `Rate: ${rate}`;
  nut.appendChild(cryptoMarketData);

  // Prevent event propagation to the parent
  cryptoMarketData.addEventListener('click', event => {
    event.stopPropagation();
  });

  // Create a canvas element for the graph
  const canvas = document.createElement('canvas');
  canvas.classList.add('crypto-graph');
  nut.appendChild(canvas);

  // Prevent event propagation to the parent
  canvas.addEventListener('click', event => {
    event.stopPropagation();
  });

  // Generate the graph using a library (e.g., Chart.js)
  // generateCryptoGraph(canvas, crypto);
}
/*
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
*/
// Function to fetch Magic 8 Ball answer
// async function fetchMagic8BallAnswer() {
//   try {
//     const response = await fetch(magic8BallAPI, {
//       headers: {
//         // mode: "cors",
//         // 'Referrer-Policy': 'origin',
//         // "Content-Type": "application/json",
//         // "Accept": "*/*",
//         // 'Referer': 'http://www.eightballapi.com/api',
//         // 'Host': 'www.eightballapi.com',
//         'redirect': 'follow',
//       }
//     });
//     console.log(response)
//     const data = await response.json();
//     return data.answer;  // assuming the response has 'answer' property
//   } catch (error) {
//     console.log('Error fetching Magic 8 Ball answer:');
//     console.log(error)
//     throw error;
//   }

// }

/*fetch(magic8BallAPI, {headers: {mode: "cors", 'Referrer-Policy': 'origin', "Content-Type": "application/json"}}) 
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));*/

function handleMagic8BallShake() {
  const { response, type } = generateMagic8BallResponse();

  //Clear old 8 ball response 
  const oldResponse = document.querySelector('.response');
  if (oldResponse) {
    oldResponse.remove();
  }

  const responseDiv = document.createElement('div');
  responseDiv.classList.add('response');
  responseDiv.style.backgroundColor = '#27313b7c';
  responseDiv.style.color = 'white';
  responseDiv.style.fontSize = '25px';
  responseDiv.textContent = response;
  responseDiv.style.padding = '30px 0px';

  const shakeButton = document.getElementById('shake-button');
  const questionSection = document.querySelector('.question');
  questionSection.insertBefore(responseDiv, shakeButton.nextSibling);

  if (type === 'buy') {
    // If the response is buy, fetch the crypto data
    fetchCryptoData()
      .then(data => {
        console.log(data); // Log the data object to see its structure

        const rates = data?.rates;
        if (!rates) {
          throw new Error('Rates not found in API response');
        }

        // Flatten the 2D array to a 1D array
        const flatRates = rates.flat();

        // Randomly select a currency
        const randomIndex = Math.floor(Math.random() * flatRates.length);
        const selectedCurrency = flatRates[randomIndex];  // This is the randomly selected cryptocurrency object
        const assetIdQuote = selectedCurrency.asset_id_quote;
        const rate = selectedCurrency.rate;

        console.log('Rate:', rate);

        // Display the selected cryptocurrency and its rate
        currentCryptoName = assetIdQuote;
        currentCryptoRate = rate;

        displayCryptoDataGraph(assetIdQuote, rate);
        
        // Show the save button after successfully getting the data
        saveButton.style.display = 'block';
      })
      .catch(error => {
        console.log('Error retrieving cryptocurrency data:', error);
      });
  } else if (type === 'sell') {
    // If the response is sell, clear the crypto-name div and hide the save button
    clearAPIData(); // Call the function to clear the 'crypto-name' div
    saveButton.style.display = 'none';
  }

} 


function clearAPIData() {
  // Get the elements
  const cryptoName = document.querySelector('.crypto-name');
  const cryptoMarketData = document.querySelector('.crypto-market-data');
  
  // Clear them only if they exist
  if (cryptoName) {
    cryptoName.textContent = "";
  }
  if (cryptoMarketData) {
    cryptoMarketData.textContent = "";
  }
}


// Function to handle saving selected cryptocurrency to the dropdown menu and local storage
function saveCryptoToLocalstorage(cryptoName, rate) {
  const savedCryptos = JSON.parse(localStorage.getItem('savedCryptos')) || [];
  savedCryptos.push({ name: cryptoName, rate: rate });
  localStorage.setItem('savedCryptos', JSON.stringify(savedCryptos));
}

// Function to display the saved cryptocurrencies in the dropdown menu
function loadSavedCryptos() {
  const savedCryptos = JSON.parse(localStorage.getItem('savedCryptos')) || [];

  // Display the saved cryptocurrencies in the dropdown menu
  const dropdownContent = document.querySelector('.dropdownContent');
  dropdownContent.innerHTML = ''; // Clear existing options

  savedCryptos.forEach(crypto => {
    const dropdownOption = document.createElement('a');
    dropdownOption.href = '#'; // Set the link for each option
    dropdownOption.textContent = crypto.name + ' - ' + crypto.rate;
    dropdownContent.appendChild(dropdownOption);

    // Add an event listener to display the corresponding cryptocurrency data when an option is clicked
    dropdownOption.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the page from refreshing
      displayCryptoDataGraph(crypto.name, crypto.rate);

      // Scroll to the 'nut' section
      const nutSection = document.getElementById('nut');
      nutSection.scrollIntoView({ behavior: "smooth" });
    });
  });
}


// Call the function to load saved cryptocurrencies when the page loads
loadSavedCryptos();


// Function to handle saving selected cryptocurrency to the dropdown menu and local storage
function handleSaveCrypto() {
  
    const savedCryptos = JSON.parse(localStorage.getItem('savedCryptos')) || [];

    // Display the saved cryptocurrencies in the dropdown menu
    const dropdownContent = document.querySelector('.dropdownContent');
    dropdownContent.innerHTML = ''; // Clear existing options

    savedCryptos.forEach(crypto => {
      const dropdownOption = document.createElement('a');
      dropdownOption.href = '#'; // Set the link for each option
      dropdownOption.textContent = crypto.name + ' - ' + crypto.rate;

      // Add click event listener
      dropdownOption.addEventListener('click', function (event) {
        event.preventDefault();

        // Scroll to the 'nut' section
        const nutSection = document.getElementById('nut');
        nutSection.scrollIntoView({ behavior: "smooth" });
      });

      dropdownContent.appendChild(dropdownOption);
    });
  
}


// Add event listener to the Magic 8 Ball
/*const magic8Ball = document.getElementById('nut');
magic8Ball.addEventListener('click', handleMagic8BallShake);
*/

const shakeButton = document.getElementById('shake-button');
shakeButton.addEventListener('click', handleMagic8BallShake);

// Create a div specifically for the save button
const buttonContainer = document.createElement('div');
buttonContainer.style.display = "flex";
buttonContainer.style.justifyContent = "center";
buttonContainer.style.width = "100%";  // Make sure container spans the full width

// Create and insert the save button dynamically
const saveButton = document.createElement('button');
saveButton.style.padding = '10px 25px';
saveButton.style.backgroundColor = '#27313b7c';
saveButton.style.color = 'white';
saveButton.style.borderRadius = '15%';
saveButton.style.fontSize = '20px';
saveButton.id = 'save-button';
saveButton.textContent = 'Save';
saveButton.style.display = 'none'; // Hide the button initially

// Append the save button to the button container
buttonContainer.appendChild(saveButton);

const questionSection = document.querySelector('.question');
questionSection.appendChild(buttonContainer);  // Append the button container to the question section


// Function to handle saving selected cryptocurrency to the dropdown menu and local storage
function handleSaveCrypto() {
  saveCryptoToLocalstorage(currentCryptoName, currentCryptoRate);

  // Refresh the dropdown options
  loadSavedCryptos();
}

// Add event listener to the save button
saveButton.addEventListener('click', handleSaveCrypto);
