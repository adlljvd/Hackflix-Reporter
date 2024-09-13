function updateContent(dataArray) {
    const articleContainer = document.getElementById('article-container');
    articleContainer.innerHTML = ''; // Clear previous content

    dataArray.forEach((data, index) => {
        // Create the column div
        const colDiv = document.createElement('div');
        colDiv.className = "col-xl-4 col-lg-4 col-sm-12 col-md-6";

        // Create the article element
        const article = document.createElement('article');
        article.className = "card";

        // Create the title (h4) element
        const title = document.createElement('h4');
        const titleSpan = document.createElement('span');
        titleSpan.textContent = data[1]; // data[1] is the title
        title.appendChild(titleSpan);

        // Create the image element
        const image = document.createElement('img');
        image.src = `../data/img/${index + 1}.jpg`; // Dynamically generate image source
        image.className = "featured-image";

        // Create the author element
        const author = document.createElement('p');
        author.textContent = `Author: ${data[2]}`; // data[2] is the author

        // Create the content element
        const content = document.createElement('p');
        content.textContent = data[3]; // data[3] is the content

        // Append title, image, author, and content to the article
        article.appendChild(title);
        article.appendChild(image);
        article.appendChild(author);
        article.appendChild(content);

        // Append the article to the column div
        colDiv.appendChild(article);

        // Append the column div to the article container
        articleContainer.appendChild(colDiv);
    });
}

// Load data from localStorage or fetch from external file if not present
function loadData() {
    const storedData = localStorage.getItem('dataArray');
    if (storedData) {
        const dataArray = JSON.parse(storedData);
        updateContent(dataArray);
    } else {
        fetch('../data/news.data')
            .then(response => response.text())
            .then(data => {
                // Split the data into lines (rows) and map it into an array
                const rows = data.split('\n').filter(row => row.trim() !== '');
                const dataArray = rows.map(row => row.split(';')); // Assuming `;` delimiter
                
                // Save the data to localStorage
                localStorage.setItem('newsData', JSON.stringify(dataArray));

                // Update the content dynamically
                updateContent(dataArray);
            })
            .catch(error => console.error('Error fetching the data:', error));
    }
}

// Call loadData when the page loads
loadData();