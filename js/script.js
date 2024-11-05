<!-- script.js -->
document.addEventListener("DOMContentLoaded", function() {
    includeHTML();
    loadContent();
});

function includeHTML() {
    document.querySelectorAll('[data-include]').forEach(element => {
        let file = element.getAttribute('data-include');
        fetch(file)
            .then(response => response.text())
            .then(data => {
                element.innerHTML = data;
            })
            .catch(error => console.error('Error including file:', error));
    });
}

function loadContent() {
    const pageIdToJsonFile = {
        "research-content": "data/research.json",
        "publications-content": "data/publications.json",
        "team-content": "data/team.json",
        "resources-content": "data/resources.json",
        "main-content": "data/index.json",
        "press-content": "data/press.json",
        "current-members": "data/current_members.json",
        "alumni": "data/alumni.json",
        "guests": "data/guests.json",
        "past-guests": "data/past_guests.json"
    };

    Object.keys(pageIdToJsonFile).forEach(pageId => {
        const element = document.getElementById(pageId);
        if (element) {
            fetch(pageIdToJsonFile[pageId])
                .then(response => response.json())
                .then(data => {
                    if (pageId === "publications-content") {
                        element.innerHTML = generatePublicationsHTML(data);
                    } else {
                        element.innerHTML = generateTeamContentHTML(data);
                    }
                })
                .catch(error => console.error('Error loading content:', error));
        }
    });
}

function generateContentHTML(data) {
    let html = "";
    if (data.title) {
        html += `<h2>${data.title}</h2>`;
    }
    if (data.description) {
        html += `<p>${data.description}</p>`;
    }
    if (data.items && Array.isArray(data.items)) {
        html += "<div class='content-items'>";
        data.items.forEach(item => {
            html += `<div class='card'>`;
            if (item.title) {
                html += `<h3>${item.title}</h3>`;
            }
            if (item.description) {
                html += `<p>${item.description}</p>`;
            }
            if (item.link) {
                html += `<a href='${item.link}' target='_blank'>Read more</a>`;
            }
            html += `</div>`;
        });
        html += "</div>";
    }
    return html;
}

function generateTeamContentHTML(data) {
    let html = "";
    if (data.items && Array.isArray(data.items)) {
        data.items.forEach(item => {
            html += `<div class='team-member'>`;
            if (item.image) {
                html += `<img src='${item.image}' alt='${item.name}' class='team-member-image'>`;
            }
            if (item.name) {
                html += `<p><strong>${item.name}</strong></p>`;
            }
            if (item.position) {
                html += `<p>${item.position}</p>`;
            }
            if (item.description) {
                html += `<p>${item.description}</p>`;
            }
            if (item.linkedin) {
                html += `<a href='${item.linkedin}' target='_blank'>LinkedIn Profile</a>`;
            }
            html += `</div>`;
        });
    }
    return html;
}

function generatePublicationsHTML(data) {
    let html = "";
    if (data.items && Array.isArray(data.items)) {
        data.items.forEach((item, index) => {
            html += `<p style="text-align: left;">${index + 1}. <strong>${item.title}</strong>. `;
            if (item.authors) {
                html += `${item.authors}, `;
            }
            if (item.year) {
                html += `(${item.year}). `;
            }
            if (item.journal) {
                html += `${item.journal}. `;
            }
            if (item.doi) {
                html += `<a href='${item.doi}' target='_blank'>${item.doi}</a>`;
            }
            html += `</p>`;
        });
    }
    return html;
}

/* Updated CSS for Team Section */
/* styles.css */
.team-section {
    margin-bottom: 40px;
}

.team-member {
    display: inline-block;
    width: 250px;
    margin: 10px;
    padding: 15px;
    text-align: left;
    background-color: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.team-member-image {
    width: 100%;
    height: auto;
    border-radius: 50%;
    margin-bottom: 10px;
}

.team-member p {
    margin: 5px 0;
}
