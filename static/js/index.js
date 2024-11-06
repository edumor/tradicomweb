// script.js
document.addEventListener('DOMContentLoaded', function() {
    var video1 = document.getElementById('marketing-video');
    if (video1) {
        video1.playbackRate = 0.5; // Aumento o disminuye la velocidad de reproduccion del video PSA
    }

    var video2 = document.getElementById('marketing-video2');
    if (video2) {
        video2.playbackRate = 5.0; // Incrementa la velocidad de reproducción del video TSA
    }

    // Selecciona el ítem del navbar y el <section> con el ID PSA
    const navbarItem = document.querySelector('a[href="#PSA"]');
    const sectionPSA = document.getElementById('PSA');

    // Añade un evento de clic al ítem del navbar
    if (navbarItem && sectionPSA) {
        navbarItem.addEventListener('click', function() {
            // Añade la clase CSS al <section>
            sectionPSA.classList.add('margin-top');
        });
    }
});

$(document).ready(function() {
    $('#emailForm').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            url: '/send_email',
            type: 'POST',
            data: $(this).serialize(),
            success: function(response) {
                $('#response').html(response);
            },
            error: function(xhr, status, error) {
                $('#response').html('Error al enviar el correo: ' + error);
            }
        });
    });
});


/*
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('/send_email', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            responseMessage.textContent = data.message;
            responseMessage.style.display = 'block';
        })
        .catch(error => {
            responseMessage.textContent = 'Error al enviar el formulario. Inténtelo de nuevo más tarde.';
            responseMessage.style.display = 'block';
        });
    });
});

*/



document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    
    try {
        const response = await fetch('/send_email', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        document.getElementById('messageContent').innerText = data.message;
        document.getElementById('messageBox').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }
});

function closeMessageBox() {
    document.getElementById('messageBox').style.display = 'none';
     // Limpiar los inputs del formulario de contacto
     document.getElementById('contactForm').reset();
}

document.getElementById('closeButton').addEventListener('click', function() {
    document.getElementById('contactForm').reset();
});
