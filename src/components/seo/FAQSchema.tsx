export default function FAQSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I create a resume on ResumeCraftor?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Creating a resume on ResumeCraftor is simple: 1) Choose from our professional templates, 2) Use the drag-and-drop editor to add your experience, skills, and education, 3) Customize the design and layout to match your style, 4) Download your resume as a PDF. The entire process takes less than 10 minutes."
                }
            },
            {
                "@type": "Question",
                "name": "Is ResumeCraftor free to use?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, ResumeCraftor offers a free plan that allows you to create professional resumes, save designs, and download PDFs. You get access to all core features including the drag-and-drop editor, professional templates, and ATS-optimized formatting."
                }
            },
            {
                "@type": "Question",
                "name": "Are ResumeCraftor templates ATS-friendly?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all ResumeCraftor templates are designed to be ATS (Applicant Tracking System) friendly. We use clean formatting, standard fonts, and proper structure to ensure your resume passes through ATS systems and reaches human recruiters."
                }
            },
            {
                "@type": "Question",
                "name": "Can I edit my resume after downloading it?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! All your resumes are automatically saved to your account. You can return to ResumeCraftor anytime, open your saved resume, make edits, and download an updated PDF. Your designs are stored securely in the cloud."
                }
            },
            {
                "@type": "Question",
                "name": "What file format can I download my resume in?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ResumeCraftor allows you to export and download your resume as a high-quality PDF file. PDF is the industry-standard format for job applications and ensures your formatting stays perfect across all devices and platforms."
                }
            },
            {
                "@type": "Question",
                "name": "Do I need design skills to use ResumeCraftor?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No design skills are required! ResumeCraftor's intuitive drag-and-drop editor makes it easy for anyone to create professional-looking resumes. Simply choose a template, fill in your information, and our smart editor handles the formatting and design for you."
                }
            },
            {
                "@type": "Question",
                "name": "Can I create multiple resumes?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, you can create and save multiple resumes in your ResumeCraftor account. This is perfect for tailoring different resumes for different job applications or industries. All your designs are saved and accessible from your dashboard."
                }
            },
            {
                "@type": "Question",
                "name": "How long does it take to build a resume?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "With ResumeCraftor's streamlined editor and professional templates, you can create a complete, polished resume in under 10 minutes. The intuitive interface and smart suggestions help you build quickly without sacrificing quality."
                }
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
