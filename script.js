document.getElementById('resumeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the form
    const name = document.getElementById('name').value;
    const profession = document.getElementById('profession').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contact').value;
    const portfolio = document.getElementById('portfolio').value;
    const profileSummary = document.getElementById('profileSummary').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;

    // Get skills (all inputs in skillsContainer)
    const skillElements = document.querySelectorAll('.skill');
    const skills = Array.from(skillElements).map(skill => skill.value);

    const projects = document.getElementById('projects').value.split(',').map(project => project.trim());
    const certifications = document.getElementById('certifications').value.split(',').map(cert => cert.trim());
    const languages = document.getElementById('languages').value.split(',').map(lang => lang.trim());
    const achievements = document.getElementById('achievements').value.split(',').map(ach => ach.trim());
    const volunteer = document.getElementById('volunteer').value;

    // Update the resume output section
    document.getElementById('resumeOutput').innerHTML = `
        <div class="header">
            <h2>${name}</h2>
            <h3>${profession}</h3>
        </div>
        <div class="hero">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>Portfolio:</strong> <a href="${portfolio}" target="_blank">${portfolio}</a></p>
            <h3>Profile Summary</h3>
            <p>${profileSummary}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Experience</h3>
            <p>${experience}</p>
            <h3>Skills</h3>
            <ul>${skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
            <h3>Projects</h3>
            <ul>${projects.map(project => `<li>${project}</li>`).join('')}</ul>
            <h3>Certifications</h3>
            <ul>${certifications.map(cert => `<li>${cert}</li>`).join('')}</ul>
            <h3>Languages</h3>
            <ul>${languages.map(lang => `<li>${lang}</li>`).join('')}</ul>
            <h3>Achievements</h3>
            <ul>${achievements.map(ach => `<li>${ach}</li>`).join('')}</ul>
            <h3>Volunteer Experience</h3>
            <p>${volunteer}</p>
        </div>
    `;

    // Clear the form
    event.target.reset();
});

// Adding more skills dynamically
document.getElementById('addSkill').addEventListener('click', function() {
    const newSkill = document.createElement('input');
    newSkill.setAttribute('type', 'text');
    newSkill.setAttribute('class', 'skill');
    newSkill.setAttribute('placeholder', 'Enter another skill');
    document.getElementById('skillsContainer').appendChild(newSkill);
});

// Download the resume as a PDF
document.getElementById('downloadPdf').addEventListener('click', function() {
    const resumeOutput = document.getElementById('resumeOutput'); // Only the resume output section
    if (resumeOutput) {
        const options = {
            margin: [0.5, 0.5, 0.5, 0.5], // Set margins for the PDF
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, windowWidth: document.documentElement.offsetWidth }, // Capture only the visible part
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Generate PDF only from the resume output
        html2pdf().from(resumeOutput).set(options).save().catch(function(error) {
            console.error('PDF generation failed: ', error);
        });
    }
});