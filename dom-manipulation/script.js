document.addEventListener('DOMContentLoaded', () => {
    // Initial array of quotes
    const quotes = [
      { text: 'The best way to predict the future is to invent it.', category: 'Inspiration' },
      { text: 'Life is 10% what happens to us and 90% how we react to it.', category: 'Motivation' },
      // Add more initial quotes if needed
    ];
  
    // Function to display a random quote
    function showRandomQuote() {
      if (quotes.length === 0) {
        document.getElementById('quoteDisplay').innerHTML = 'No quotes available.';
        return;
      }
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - ${quote.category}`;
    }
  
    // Function to add a new quote
    function addQuote() {
      const newQuoteText = document.getElementById('newQuoteText').value;
      const newQuoteCategory = document.getElementById('newQuoteCategory').value;
      if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        alert('New quote added successfully!');
      } else {
        alert('Please enter both a quote and a category.');
      }
    }
  
    // Event listeners for buttons
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('addQuote').addEventListener('click', addQuote);
  
    // Show an initial random quote when the page loads
    showRandomQuote();
  });
  