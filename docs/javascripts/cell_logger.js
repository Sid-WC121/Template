document.addEventListener('DOMContentLoaded', function() {
    //console.log('=== Jupyter Notebook Output Logger ===');
    const outputs = document.querySelectorAll('.output');
    let outputIndex = 0;

    outputs.forEach(output => {
        const clipboardButtons = output.querySelectorAll('.md-clipboard.md-icon');
        clipboardButtons.forEach(button => button.remove());

        outputIndex++;
        //console.group(`Output Cell ${outputIndex}`);
        //console.log(output.textContent.trim());
        //console.groupEnd();
    });

    //console.log('=== End Output Logger ===');

    // Apply grid layout to cells
    const cells = document.querySelectorAll('.input, .inner_cell');
    let admonitionToMove = null;
    
    cells.forEach(cell => {
        const isAdmonitionInfo = cell.classList.contains('inner_cell') && 
                                cell.querySelector('.admonition.info');

        // Create grid wrapper with responsive layout
        const wrapper = document.createElement('div');
        wrapper.style.display = 'grid';
        wrapper.style.width = '100%';
        wrapper.style.alignItems = 'start';
        
        // Set grid template based on window width
        if (window.innerWidth > 1200) {
            wrapper.style.gridTemplateColumns = '80% 19%';
            wrapper.style.gap = '20px';
        } else {
            wrapper.style.gridTemplateColumns = '100%';
            wrapper.style.gap = '10px';
        }

        // Move cell content to wrapper
        cell.parentNode.insertBefore(wrapper, cell);

        if (isAdmonitionInfo) {
            admonitionToMove = cell;
            wrapper.remove();
        } else {
            wrapper.appendChild(cell);
            const secondColumn = document.createElement('div');
            wrapper.appendChild(secondColumn);
            
            if (admonitionToMove) {
                if (window.innerWidth > 1200) {
                    // Two column layout: put in second column
                    secondColumn.appendChild(admonitionToMove);
                    admonitionToMove.style.justifySelf = 'end';
                    admonitionToMove.style.marginTop = '20px';
                    admonitionToMove.style.width = '100%';
                } else {
                    // Single column layout: put above content
                    wrapper.insertBefore(admonitionToMove, cell);
                    admonitionToMove.style.width = '100%';
                    admonitionToMove.style.marginBottom = '-20px';
                    secondColumn.remove();
                }
                admonitionToMove = null;
            } else if (window.innerWidth <= 1200) {
                secondColumn.remove();
            }
        }
    });
});
