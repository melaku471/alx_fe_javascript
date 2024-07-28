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
  
    // Function to extract unique categories from quotes
    function getUniqueCategories() {
      const categoriesSet = new Set();
      quotes.forEach(quote => {
        categoriesSet.add(quote.category);
      });
      return Array.from(categoriesSet);
    }
  
    // Function to update the category dropdown
    function updateCategoryDropdown() {
      const dropdown = document.getElementById('categoryFilter');
      dropdown.innerHTML = '<option value="all">All Categories</option>';
      const categories = getUniqueCategories();
      categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        dropdown.appendChild(option);
      });
  
      const lastSelectedCategory = localStorage.getItem('selectedCategory');
      if (lastSelectedCategory) {
        dropdown.value = lastSelectedCategory;
      }
    }
  
    // Function to filter and display quotes based on selected category
    function filterQuotes() {
      const selectedCategory = document.getElementById('categoryFilter').value;
      localStorage.setItem('selectedCategory', selectedCategory);
  
      const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(quote => quote.category === selectedCategory);
  
      if (filteredQuotes.length === 0) {
        document.getElementById('quoteDisplay').innerHTML = 'No quotes available.';
        return;
      }
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const quote = filteredQuotes[randomIndex];
      document.getElementById('quoteDisplay').innerHTML = `"${quote.text}" - ${quote.category}`;
      sessionStorage.setItem('lastQuote', JSON.stringify(quote));
    }
  
    // Function to display a random quote
    function showRandomQuote() {
      filterQuotes();
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
        updateCategoryDropdown();
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
        updateCategoryDropdown();
        alert('Quotes imported successfully!');
      };
      fileReader.readAsText(event.target.files[0]);
    }
  
    // Event listener for "Show New Quote" button
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
  
    // Event listener for "Export Quotes" button
    document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
  
    // Event listener for the category dropdown change
    document.getElementById('categoryFilter').addEventListener('change', filterQuotes);
  
    // Create the add quote form
    createAddQuoteForm();
  
    // Populate category dropdown
    updateCategoryDropdown();
  
    // Show the last viewed quote from session storage if available, otherwise show an initial random quote
    const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
    if (lastQuote) {
      document.getElementById('quoteDisplay').innerHTML = `"${lastQuote.text}" - ${lastQuote.category}`;
    } else {
      showRandomQuote();
    }
  });
  