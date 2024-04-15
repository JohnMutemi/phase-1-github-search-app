// Event listener that waits for DOM content to load fully
document.addEventListener('DOMContentLoaded', () => {
    const baseURL = 'https://api.github.com';
    let searchType = 'user'; // Default search type
  
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
//   event listener for submit 
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchTerm = document.getElementById('search').value.trim();
  
      let url;
      if (searchType === 'user') {
        url = `${baseURL}/search/users?q=${searchTerm}`;
      } else {
        url = `${baseURL}/search/repositories?q=${searchTerm}`;
      }
  
      try {
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
  
    function displayResults(data) {
      if (searchType === 'user') {
        // Display user search results
        userList.innerHTML = '';
        data.items.forEach(user => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
            <a href="${user.html_url}" target="_blank">${user.login}</a>
          `;
          userList.appendChild(listItem);
        });
      } else {
        // Display repository search results
        reposList.innerHTML = '';
        data.items.forEach(repo => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <a href="${repo.html_url}" target="_blank">${repo.full_name}</a>
          `;
          reposList.appendChild(listItem);
        });
      }
    }
  
    // Toggle search type
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Search Type';
    toggleButton.addEventListener('click', () => {
      searchType = searchType === 'user' ? 'repo' : 'user';
      form.reset(); // Clear search input
    });
    form.appendChild(toggleButton);
  });
  