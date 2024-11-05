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
        "current-members": "data/current_members.json",
        "alumni": "data/alumni.json",
        "guests": "data/guests.json",
        "past-guests": "data/past_guests.json",
        "resources-content": "data/resources.json",
        "press-content": "data/press.json",
        "main-content": "data/index.json"
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
