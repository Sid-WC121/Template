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
});
