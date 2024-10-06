const sections = ['welcomePage', 'contactInformation', 'workEducation', 'additionalSections', 'resumePreview'];
const formSections = ['contactForm', 'workEducationForm', 'additionalForm'];

function showSection(sectionId) {
    sections.forEach(section => document.getElementById(section).style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}

document.getElementById('startResume').addEventListener('click', () => showSection('contactInformation'));

formSections.forEach((formId, index) => {
    document.getElementById(formId).addEventListener('submit', (event) => {
        event.preventDefault();
        if (formId === 'additionalForm') {
            buildResume();
        }
        showSection(sections[index + 2]);
    });
});

document.getElementById('editResume').addEventListener('click', () => showSection('additionalSections'));
document.getElementById('downloadResume').addEventListener('click', downloadResumeAsPDF);

document.getElementById('addLinks').addEventListener('change', (event) => {
    document.getElementById('linksSection').style.display = event.target.checked ? 'block' : 'none';
});

function buildResume() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const workHistory = document.getElementById('workHistory').value;
    const education = document.getElementById('education').value;
    const certifications = document.getElementById('certifications').value;
    const activities = document.getElementById('activities').value;
    const links = document.getElementById('links').value;
    const font = document.getElementById('fontSelection').value;

    let linksContent = '';
    if (document.getElementById('addLinks').checked) {
        linksContent = `<section>
            <p><strong>Links:</strong></p>
            <p>${links}</p>
        </section>`;
    }

    const resumeContent = `
        <h3>${fullName}</h3>
        <section>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Address:</strong> ${address}</p>
        </section>
        <section>
            <p><strong>Work History:</strong></p>
            <p>${workHistory}</p>
        </section>
        <section>
            <p><strong>Education:</strong></p>
            <p>${education}</p>
        </section>
        <section>
            <p><strong>Certifications:</strong></p>
            <p>${certifications}</p>
        </section>
        <section>
            <p><strong>Activities:</strong></p>
            <p>${activities}</p>
        </section>
        ${linksContent}
    `;

    const resumeElement = document.getElementById('resumeContent');
    resumeElement.style.fontFamily = font;
    resumeElement.innerHTML = resumeContent;
}

function downloadResumeAsPDF() {
    const element = document.getElementById('resumeContent');
    const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
}
