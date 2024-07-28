document.addEventListener('DOMContentLoaded', () => {
    // Initial array of quotes, if not present in local storage
    let quotes = JSON.parse(localStorage.getItem('quotes')) || [
      { text: 'The best way to predict the future is to invent it.', category: 'Inspiration' },
      { text: 'Life is 10% what happens to us and 90% how we react to it.', category: 'Motivation' },
    ];
  
    // Function to save quotes to local storage
    function saveQuotes() {
      localStorage.setItem('quotes', JSON.stringify(quotes));
    }
  
    // Function to display a random quote
    function showRandomQuote() {
      if (quotes.length === 0) {
        document.getElementById('quoteDisplay').innerHTML = 'No quotes available.';
        return;
      }
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const quote = quotes[randomIndex];
      document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - ${quote.category}`;
      sessionStorage.setItem('lastQuote', JSON.stringify(quote));
    }
  
    // Function to add a new quote
    function addQuote() {
      const newQuoteText = document.getElementById('newQuoteText').value;
      const newQuoteCategory = document.getElementById('newQuoteCategory').value;
      if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        saveQuotes();
        alert('New quote added successfully!');
      } else {
        alert('Please enter both a quote and a category.');
      }
    }
  
    // Function to create the add quote form
    function createAddQuoteForm() {
      const formDiv = document.createElement('div');
  
      const quoteTextInput = document.createElement('input');
      quoteTextInput.id = 'newQuoteText';
      quoteTextInput.type = 'text';
      quoteTextInput.placeholder = 'Enter a new quote';
  
      const quoteCategoryInput = document.createElement('input');
      quoteCategoryInput.id = 'newQuoteCategory';
      quoteCategoryInput.type = 'text';
      quoteCategoryInput.placeholder = 'Enter quote category';
  
      const addButton = document.createElement('button');
      addButton.textContent = 'Add Quote';
      addButton.onclick = addQuote;
  
      formDiv.appendChild(quoteTextInput);
      formDiv.appendChild(quoteCategoryInput);
      formDiv.appendChild(addButton);
  
      document.body.appendChild(formDiv);
    }
  
    // Function to export quotes to a JSON file
    function exportQuotes() {
      const dataStr = JSON.stringify(quotes, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'quotes.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  
    // Function to import quotes from a JSON file
    function importFromJsonFile(event) {
      const fileReader = new FileReader();
      fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
      };
      fileReader.readAsText(event.target.files[0]);
    }
  
    // Create the import/export buttons and file input
    function createImportExportButtons() {
      const exportButton = document.createElement('button');
      exportButton.textContent = 'Export Quotes';
      exportButton.onclick = exportQuotes;
  
      const importFileInput = document.createElement('input');
      importFileInput.id = 'importFile';
      importFileInput.type = 'file';
      importFileInput.accept = '.json';
      importFileInput.onchange = importFromJsonFile;
  
      document.body.appendChild(exportButton);
      document.body.appendChild(importFileInput);
    }
  
    // Event listener for "Show New Quote" button
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
    // Create the add quote form and import/export buttons
    createAddQuoteForm();
    createImportExportButtons();
  
    // Show the last viewed quote from session storage if available, otherwise show an initial random quote
    const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
    if (lastQuote) {
      document.getElementById('quoteDisplay').innerHTML = `"${lastQuote.text}" - ${lastQuote.category}`;
    } else {
      showRandomQuote();
    }
  });
  