
let state = {
    username: localStorage.getItem("username") || "Guest"
};


const routes = {

    home: () => `
      <h2>Home</h2>
      <p>Welcome, <strong>${state.username}</strong>!</p>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus amet ipsum ex. Dolorum eum sit dolorem commodi itaque necessitatibus vero nemo repellat asperiores dolores, inventore non obcaecati nostrum laboriosam. Id?
      </p>
      </ul>
    `,

    about: () => `
      <h2>About</h2>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus amet ipsum ex. Dolorum eum sit dolorem commodi itaque necessitatibus vero nemo repellat asperiores dolores, inventore non obcaecati nostrum laboriosam. Id?
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus amet ipsum ex. Dolorum eum sit dolorem commodi itaque necessitatibus vero nemo repellat asperiores dolores, inventore non obcaecati nostrum laboriosam. Id?
      </p>
    `,

    contact: () => `
      <h2>Contact</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus amet ipsum ex. Dolorum eum sit dolorem commodi itaque necessitatibus vero nemo repellat asperiores dolores, inventore non obcaecati nostrum laboriosam. Id?
      </p>
      <p>You can reach us via:</p>
      <ul>
        <li>Email: demo@mail.com</li>
        <li>Phone: +91 98765 43210</li>
      </ul>
    `,

    profile: () => `
      <h2>Profile</h2>

      <p>Current User: <strong>${state.username}</strong></p>

      <input id="nameInput" placeholder="Enter new name" />
      <br>
      <button onclick="updateName()">Update Name</button>
    `
};


function updateName() {
    const input = document.getElementById("nameInput").value;

    if (input.trim() !== "") {
        state.username = input;
        localStorage.setItem("username", input);
        render(); 
    }
}


function highlightNav(hash) {
    document.querySelectorAll("nav a").forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${hash}`) {
            link.classList.add("active");
        }
    });
}


function render() {
    const app = document.getElementById("app");

    let hash = window.location.hash.substring(1);

    if (!hash) hash = "home";

    if (routes[hash]) {
        app.innerHTML = routes[hash]();
    } else {
        app.innerHTML = `
        <h2>404</h2>
        <p>Page not found</p>
      `;
    }

    highlightNav(hash);
}


window.addEventListener("hashchange", render);


window.addEventListener("load", render);
