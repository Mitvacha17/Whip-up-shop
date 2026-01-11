const mockData = {
    "Home": [
        { name: "valentine", type: "folder" }
    ],
    "valentine": [
        { name: "Mitvacha", type: "folder" }
    ]
};

let currentPath = ["Home"];

document.addEventListener('DOMContentLoaded', () => {
    const folderSelect = document.getElementById('folder-select');
    const searchInput = document.getElementById('search-input');

    // Initialize
    renderContent("Home");
    createPetals();

    // Event Listeners
    folderSelect.addEventListener('change', (e) => {
        navigateTo(e.target.value);
    });

    searchInput.addEventListener('input', (e) => {
        filterContent(e.target.value);
    });
});

function navigateTo(folderName, addToPath = true) {
    if (folderName === "Mitvacha") {
        window.open("valentine/Mitvacha-17/index.html", "_blank");
        return;
    }

    if (addToPath) {
        if (mockData[folderName] || folderName === "Home") {
            if (folderName === "Home") {
                currentPath = ["Home"];
            } else if (folderName === "valentine") {
                currentPath = ["Home", "valentine"];
            } else {
                if (!currentPath.includes(folderName)) {
                    currentPath.push(folderName);
                }
            }
        } else {
            // If navigating to a folder not in top keys (like if we had sub-sub folders), push it
            // But for now our structure is flat-ish in keys.
            currentPath.push(folderName);
        }
    }

    const folderSelect = document.getElementById('folder-select');
    if (folderName === "Home" || folderName === "valentine") {
        folderSelect.value = folderName;
    }

    renderBreadcrumbs();
    renderContent(folderName);
}

function renderContent(folderName) {
    const grid = document.getElementById('content-grid');
    grid.innerHTML = '';

    const items = mockData[folderName] || [];

    if (items.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #880e4f;">This folder is empty (or purely imaginary 🌸)</p>';
        return;
    }

    items.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('grid-item');
        div.classList.add(item.type);
        div.dataset.name = item.name;

        let iconClass = "fa-folder";
        if (item.type === "file") {
            iconClass = `fa-${item.icon || 'file'}`;
        }

        div.innerHTML = `
            <div class="icon"><i class="fas ${iconClass}"></i></div>
            <div class="name">${item.name}</div>
        `;

        // Click to navigate if folder
        if (item.type === "folder") {
            div.addEventListener('click', () => {
                navigateTo(item.name);
            });
        }

        grid.appendChild(div);
    });
}

function renderBreadcrumbs() {
    const breadcrumbContainer = document.querySelector('.breadcrumb-nav');
    breadcrumbContainer.innerHTML = '';

    currentPath.forEach((pathItem, index) => {
        const span = document.createElement('span');
        span.classList.add('breadcrumb-item');
        span.innerText = pathItem;

        // Click to go back to that level
        span.onclick = () => {
            currentPath = currentPath.slice(0, index + 1);
            renderBreadcrumbs();

            // Map pathItem to folderKey if needed, simplifying here assuming name match
            renderContent(pathItem);

            const folderSelect = document.getElementById('folder-select');
            if (pathItem === "Home" || pathItem === "valentine") {
                folderSelect.value = pathItem;
            }
        };

        breadcrumbContainer.appendChild(span);
    });
}

function filterContent(query) {
    const gridItems = document.querySelectorAll('.grid-item');
    query = query.toLowerCase();

    gridItems.forEach(item => {
        const name = item.dataset.name.toLowerCase();
        if (name.includes(query)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function createPetals() {
    const container = document.getElementById('petals-container');
    const petalCount = 15;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');

        const size = Math.random() * 20 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 5 + 8}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(petal);
    }
}
