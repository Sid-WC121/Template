document.addEventListener('DOMContentLoaded', function() {
    // Add custom navigation bar immediately
    addCustomNavBar();

    // Hide the specific label element
    const labels = document.querySelectorAll('label.md-nav__link.md-nav__link--active[for="__toc"] .md-ellipsis');
    labels.forEach(label => {
        if (label.textContent.trim() === 'Assignment') {
            label.parentElement.style.display = 'none';
        }
    });
});

// Debug flag
const DEBUG = true;

function debug(msg) {
    //if (DEBUG) console.log('[Debug]:', msg);
}

window.addEventListener('load', function() {
    debug('Script initialized');
    
    // Process tagged cells first
    processTaggedCells();
    
    // Then show everything together
    requestAnimationFrame(() => {
        document.body.classList.add('loaded');
    });
});

function processTaggedCells() {
    // Move your existing cell processing logic here
    const cellSelectors = [
        '.highlight',          // Code cells
        '.markdown-cell',      // Markdown cells
        '.jp-Cell',            // Jupyter cells
        '.cell'                // Generic cells
    ];

    const mainContent = document.querySelector('.md-content__inner');
    
    if (!mainContent) {
        debug('Main content not found');
        return;
    }

    // Process cells looking for #[tagged] tag in the first line
    let cellIndex = 0;
    cellSelectors.forEach(selector => {
        const cells = mainContent.querySelectorAll(selector);
        
        cells.forEach(cell => {
            if (cell.classList.contains('cell-output') || 
                cell.classList.contains('cell-output-display')) {
                return;
            }

            const cellContent = cell.innerText || cell.textContent;
            
            // Look for #[tagged] pattern in the first line of the cell
            const firstLine = cellContent.split('\n')[0].trim();
            if (firstLine.includes('#[tagged]')) {
                cellIndex++;
                //console.log(`\n=== Tagged Cell ${cellIndex} ===`);
                
                // Identify cell type
                if (cell.classList.contains('highlight')) {
                    //console.log('Type: Code Cell');
                } else {
                    //console.log('Type: Text Cell');
                }
                
                // Remove tag from content and print
                const cleanContent = cellContent
                    .split('\n')
                    .slice(1)
                    .join('\n')
                    .trim();
                
                //console.log(cleanContent);
                //console.log('=== End Tagged Cell ===');
                
                // Hide the cell and add a button to toggle visibility
                cell.classList.add('hidden-cell');
                
                const toggleButton = document.createElement('button');
                toggleButton.innerText = 'Show Collapsed';
                toggleButton.style.display = 'block';
                toggleButton.style.margin = '10px auto';
                toggleButton.style.padding = '10px 20px';
                toggleButton.style.backgroundColor = '#d3d3d3'; // Light grey
                toggleButton.style.color = '#000';
                toggleButton.style.border = 'none';
                toggleButton.style.borderRadius = '20px'; // More rounded
                toggleButton.style.cursor = 'pointer';
                toggleButton.style.textAlign = 'center';
                toggleButton.style.position = 'relative';
                
                toggleButton.addEventListener('click', () => {
                    if (cell.classList.contains('hidden-cell')) {
                        cell.classList.remove('hidden-cell');
                    } else {
                        cell.classList.add('hidden-cell');
                    }
                });

                // Create a line element
                const line = document.createElement('div');
                line.style.width = '100%';
                line.style.height = '0.5px';
                line.style.backgroundColor = '#d3d3d3';
                line.style.margin = '50px 0'; // Increase spacing
                line.style.position = 'relative';
                
                // Position the button on the line
                toggleButton.style.position = 'absolute';
                toggleButton.style.top = '-30px';
                toggleButton.style.left = '50%';
                toggleButton.style.transform = 'translateX(-50%)';

                // Insert the line and button before the cell
                cell.parentNode.insertBefore(line, cell);
                line.appendChild(toggleButton);
                
                // Stop further processing of this cell
                return;
            }
        });
    });

    if (cellIndex === 0) {
        debug('No cells with #[tagged] found');
    }

    // Show sidebars and mark body as loaded
    const sidebars = document.querySelectorAll('.md-sidebar');
    sidebars.forEach(sidebar => {
        sidebar.style.visibility = 'visible';
    });
    
    const navBar = document.querySelector('.custom-nav-bar');
    if (navBar) {
        navBar.classList.add('loaded');
    }
}

debug('Script loaded');

const style = document.createElement('style');
style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Sen:wght@400;700&display=swap');

    .sticky-nav {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 1000;
        background-color: white;
    }
    @media (max-width: 768px) {
        .custom-nav-logo {
            display: none; 
        }
    }
`;
document.head.appendChild(style);

function addCustomNavBar() {
    const navBar = document.createElement('div');
    navBar.className = "custom-nav-bar";
    navBar.innerHTML = `
        <div class="custom-nav-logo">
            <span style="color: #d5d2d2; display: block; font: bold 20px 'Sen', sans-serif;">Sidharth</span>
            <span style="color: #a9a9a9; display: block; font: 12px 'Sen', sans-serif;">ML Researcher</span>
        </div>
        <div class="custom-nav-links">
            <a class="nav-link" href="https://sid-wc121.github.io/" onclick="handleNavLinkClick(0)">Work</a>
            <a class="nav-link" href="https://sid-wc121.github.io/about" onclick="handleNavLinkClick(1)">About</a>
            <a class="nav-link" href="https://sid-wc121.github.io/publications" onclick="handleNavLinkClick(1)">Publications</a>
        </div>
        <div class="custom-nav-breadcrumbs">
            <span class="nav-status-circle"></span>
            <span>CRAFT</span>
            <span>-</span>
            ${generateBreadcrumbLinks()}
        </div>
    `;
    document.body.appendChild(navBar);

    // Highlight current page
    highlightCurrentPage();
}

function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const breadcrumbLinks = document.querySelectorAll('.custom-nav-breadcrumbs a');
}

function generateBreadcrumbLinks() {
    const navItems = document.querySelectorAll('.md-tabs__link');
    return Array.from(navItems).map(item => 
        `<a href="${item.getAttribute('href')}" style="margin-right: -18px;">${item.textContent.trim()}</a>`
    ).join('<span style=" margin-bottom: 2.5px;">|</span>');
}
