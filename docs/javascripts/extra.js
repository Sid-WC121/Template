// Debug flag
const DEBUG = true;

function debug(msg) {
    //if (DEBUG) console.log('[Debug]:', msg);
}

window.addEventListener('load', function() {
    debug('Script initialized');

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
});

debug('Script loaded');

document.addEventListener('DOMContentLoaded', function() {
    const admonition = document.querySelector('.admonition');
    const mainInner = document.querySelector('.md-main__inner');
    if (admonition) {
        mainInner.classList.add('with-admonition');
    } else {
        mainInner.classList.remove('with-admonition');
    }
});


