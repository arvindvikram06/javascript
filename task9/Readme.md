## Infinite Scroll

====

## Objective

Create a web page that loads additional content as the user scrolls toward the bottom.

---

## Description

This project implements an infinite scrolling feature where new content is loaded automatically as the user reaches the bottom of the page. 
The application detects scroll position and fetches additional data dynamically using the Fetch API.

---

## Features

- Detects when the user is near the bottom of the page  
- Loads additional content dynamically  
- Uses Fetch API for asynchronous data loading(fetches from `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`)  
- Appends new content without reloading the page  
- Smooth and continuous user experience  

---

## Technologies Used

- HTML  
- CSS  
- JavaScript
- Fetch API  

---

## How It Works

1. The user scrolls down the page.
2. A scroll event listener detects when the user is near the bottom.
3. The app triggers a Fetch request to load more data.
4. The new data is received asynchronously.
5. The content is appended to the existing page.
6. The process repeats as the user continues scrolling.

---

