document.addEventListener('DOMContentLoaded', () => {
    const backgroundColorInput = document.getElementById('backgroundColor');
    const navBarColorInput = document.getElementById('navBarColor');
    const saveButton = document.getElementById('saveColors');

    fetch('/api/colors')
        .then(response => response.json())
        .then(data => {
            backgroundColorInput.value = data.backgroundColor;
            navBarColorInput.value = data.navBarColor;
        });

    saveButton.addEventListener('click', () => {
        const colors = {
            backgroundColor: backgroundColorInput.value,
            navBarColor: navBarColorInput.value
        };

        fetch('/api/colors', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(colors)
        })
        .then(response => response.json())
        .then(data => {
            document.documentElement.style.setProperty('--background-color', data.backgroundColor);
            document.documentElement.style.setProperty('--nav-bar-color', data.navBarColor);
            alert('Renkler başarıyla kaydedildi!');
        })
        .catch(error => console.error('Error:', error));
    });
});
