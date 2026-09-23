document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Responsive Hamburger Navigation Toggle Switch
    const menuToggle = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-list");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            
            // Subtle transition effect for hamburger icon bars
            const bars = menuToggle.querySelectorAll(".bar");
            bars.forEach(bar => bar.classList.toggle("change"));
        });

        // Close menu immediately whenever a client clicks a destination link
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }

    // 2. Seamless Form Submission Handling (Formspree Integration)
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", function (e) {
            // Keep page layout active instead of jumping away on submit
            e.preventDefault(); 
            
            const data = new FormData(contactForm);
            
            formStatus.textContent = "Sending your message...";
            formStatus.style.color = "#4a6b82";

            fetch(contactForm.action, {
                method: contactForm.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    formStatus.textContent = "Thank you! Your message has been sent successfully. 🌸";
                    formStatus.style.color = "#556b2f";
                    contactForm.reset(); // Completely clears input fields
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formStatus.textContent = data["errors"].map(error => error.message).join(", ");
                        } else {
                            formStatus.textContent = "Oops! There was a problem submitting your message.";
                        }
                        formStatus.style.color = "#b22222";
                    })
                }
            }).catch(error => {
                formStatus.textContent = "Oops! There was a local connection issue processing your request.";
                formStatus.style.color = "#b22222";
            });
        });
    }
});
