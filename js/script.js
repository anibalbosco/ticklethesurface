
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
                        element.innerHTML = generateContentHTML(data);
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

function generatePublicationsHTML(data) {
    let html = "";
    if (data.items && Array.isArray(data.items)) {
        data.items.forEach(item => {
            html += `<p>`;
            if (item.authors) {
                html += `${item.authors} `;
            }
            if (item.year) {
                html += `(${item.year}). `;
            }
            if (item.title) {
                html += `<strong>${item.title}</strong>. `;
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
