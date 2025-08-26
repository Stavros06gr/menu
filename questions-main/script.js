 // This function fetches the JSON file and displays the daily question and answer
 fetch('texts.json')
 .then(response => response.json())
 .then(data => {
     const dayIndex = getDayOfYear() % data.length;
     console.log("Today day of the year: ", getDayOfYear());
     console.log("Total number of objects:", data.length);
     console.log("dayIndex: ", dayIndex);

     // Default language is English
     let language = 'en'; // You can set this dynamically based on user preference

     // Function to toggle between English and Greek
     const toggleLanguage = () => {
         language = (language === 'en') ? 'gr' : 'en';
         updateContent();
     };

     // Function to update the question and answer based on language
     const updateContent = () => {
         const questionElement = document.getElementById("daily-text");
         const errorElement = document.getElementById("error-message");

         try {
             const question = language === 'en' ? data[dayIndex].question : data[dayIndex].question_gr;
             const answer = language === 'en' ? data[dayIndex].answer : data[dayIndex].answer_gr;
             
             questionElement.innerHTML = `<strong>${question}</strong><br>${answer}`;
         } catch (error) {
             errorElement.textContent = "Error loading daily text.";
         }
     };

     // Initial content load
     updateContent();

     // Adding a button to switch between English and Greek
     document.getElementById("language-toggle").addEventListener('click', toggleLanguage);
 })
 .catch(error => {
     console.error('Failed to load texts:', error);
     document.getElementById("daily-text").textContent = "Error loading daily text.";
 });

// Get the current day of the year
function getDayOfYear() {
 const date = new Date();
 const start = new Date(date.getFullYear(), 0, 0);
 const diff = date - start;
 const oneDay = 1000 * 60 * 60 * 24;
 const dayOfYear = Math.floor(diff / oneDay);
 return dayOfYear;
}