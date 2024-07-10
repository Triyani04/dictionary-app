let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let textContainer = document.querySelector(".text"); // Cache the container for efficiency

const getData = async (searchValue) => {
  try {
    let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`);
    if (!data.ok) {
      throw new Error('Network response was not ok');
    }
    let jsonData = await data.json();

    // Check if data is available and has the expected structure
    if (jsonData && jsonData.length > 0) {
      let div = document.createElement("div");
      div.classList.add("detail");

      // Handle potential missing data with optional chaining (?)
      div.innerHTML = `
        <h2>Word:<span>${jsonData[0].word}</span></h2>
        <p>${jsonData[0].meanings[0].partOfSpeech || 'N/A'}</p>
        <p>Meaning:<span>${jsonData[0].meanings[0].definitions[0].definition || 'N/A'}</span></p>
        <p>Example:<span>${jsonData[0].meanings[0].definitions[0].example || 'N/A'}</span></p>
        <p>Synonyms:<span>${jsonData[0].meanings[0].synonyms ? jsonData[0].meanings[0].synonyms.join(', ') : 'N/A'}</span></p>
        <a href=${jsonData[0].sourceUrls[0] || '#'} target="_blank">Read More</a>
      `;
      textContainer.innerHTML = ''; // Clear previous content
      textContainer.appendChild(div);
    } else {
      console.error('Invalid or missing data from the API');
      // Display an appropriate error message to the user
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    // Display an appropriate error message to the user
  }
};

searchBtn.addEventListener("click", function() {
  let searchValue = searchInput.value;
  if (searchValue == "") {
    alert("First Enter Word");
  } else {
    getData(searchValue);
  }
});