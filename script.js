// ------------------------------------------------------------
// Astronomical Picture of the Day
// ------------------------------------------------------------

async function fetchAndSetAPOD() {
    const apodUrl = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"; 
    
    const response = await fetch(apodUrl);
    const data = await response.json();
    // console.log(data)
    const apodImageUrl = data.url;
    const apodImage = document.getElementById("apod-img");
    const apodPara = document.getElementById("apod-para");
    const apodTitle = document.getElementById("apod-title");
  
    if (apodImage) {
        apodImage.src = apodImageUrl;
        apodImage.alt = data.title; 
        apodTitle.innerText = data.title;

        let words = data.explanation.split(' ');
        
        if (words.length > 80) {
            // Truncate the text to 80 words
            var truncatedText = words.slice(0, 80).join(' ');

            // Create a span element for the truncated text
            var truncatedSpan = document.createElement('span');
            truncatedSpan.textContent = truncatedText;

            // Create a span element for the ellipsis
            var ellipsisSpan = document.createElement('span');
            ellipsisSpan.textContent = '...';

            // Create an anchor tag for "Read More"
            var readMoreLink = document.createElement('a');
            readMoreLink.href = '#'; // You can set the actual link here
            readMoreLink.textContent = 'Read More';
            readMoreLink.addEventListener('click', function () {
                // Replace the truncated text with the full text
                paragraphElement.innerHTML = apiResponse;
            });

            // Append the elements to the paragraph
            apodPara.innerHTML = '';
            apodPara.appendChild(truncatedSpan);
            apodPara.appendChild(ellipsisSpan);
            apodPara.appendChild(readMoreLink);
        } else {
            apodPara.textContent = data.explanation;
        }
    }
}
  
// Call the function to fetch and set the APOD
fetchAndSetAPOD();

function truncateText(text, wordLimit = 80) {
    words = text.split(" ");
    if (words.length <= wordLimit) {
        return text;
    } else {
        let truncatedText = words.slice(0, wordLimit).join(" ") + "...";
        const readMore = document.createElement('a');
        readMore.innerText = "Read More"
        readMore.addEventListener('click', () =>{
            // action
        })
        
        return truncatedText;
    }
}


// ------------------------------------------------------------
// EVENTS
// ------------------------------------------------------------

const eventTitle = document.getElementById('event-heading');
const eventPara = document.getElementById('event-para');
const eventImg = document.getElementById('event-img');
const eventBtn = document.getElementById('event-save-btn');

const calendarContainer = document.getElementById('calendar');

function updateCalendar() {
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;

    // Calculate the first day of the month and the total number of days
    const firstDay = new Date(year, month - 1, 1).getDay(); // 0 is Sunday, 1 is Monday, etc.
    const daysInMonth = new Date(year, month, 0).getDate();

    // Clear previous calendar content
    calendarContainer.innerHTML = '';

    // Display weekdays row
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekdays.forEach(weekday => {
        const weekdayCell = document.createElement('div');
        weekdayCell.classList.add('weekday');
        weekdayCell.textContent = weekday;
        calendarContainer.appendChild(weekdayCell);
    });

    // Create calendar grid
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('date', 'empty');
        calendarContainer.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateCell = document.createElement('div');
        dateCell.classList.add('date');

        // Check if the day has a celestial event (You can add this logic if needed)

        dateCell.textContent = day;
        dateCell.addEventListener('click', () => showEventInfo(day));
        calendarContainer.appendChild(dateCell);
    }
}

function showEventInfo(title, url, para){
    // code here
    console.log("Show Event Information.");
}

// Initial calendar update when the page loads
updateCalendar();

// ------------------------------------------------------------
// NEWS
// ------------------------------------------------------------


const newsHeading = document.getElementById('news-heading');
const newsImage = document.getElementById('news-image');
const newsDescription = document.getElementById('news-description');
const spaceNewsContainer = document.getElementById('space-news-container');

async function getArticleFromSpaceflight() {
    try {
        const response = await fetch(`https://api.spaceflightnewsapi.net/v4/articles?_limit=1&_sort=published_at:DESC`);

        const data = await response.json();
        console.log(data);
        const article = data.results[0]; // Get the first article
        console.log(article);

        // Update the content with the retrieved news
        newsHeading.textContent = article.title;
        newsImage.src = article.image_url || 'placeholder-image-url'; // Use placeholder if image not available
        newsDescription.textContent = article.summary;
    } catch (error) {
        console.error('Error fetching news:', error);
        // Handle errors gracefully, e.g., display an error message to the user
        alert('Failed to fetch latest news. Please try again later.');
    }
}

getArticleFromSpaceflight();


// ------------------------------------------------------------