export default function WebApplicationSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "ResumeCraftor",
        "alternateName": "ResumeCraftor Resume & CV Builder",
        "url": "https://resumecraftor.com/",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory": "Resume Builder",
        "operatingSystem": "Web",
        "browserRequirements": "Requires JavaScript. Works in modern browsers (Chrome, Firefox, Safari, Edge).",
        "description": "ResumeCraftor is an easy-to-use online resume and CV builder that helps users create professional, ATS-optimized resumes in minutes.",
        "inLanguage": "en",
        "isAccessibleForFree": true,
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "category": "Free"
        },
        "featureList": [
            "Guided resume and CV builder",
            "ATS-friendly formatting",
            "Professional templates",
            "Section-by-section editor (experience, education, skills, etc.)",
            "Export and download options"
        ],
        "screenshot": "https://resumecraftor.com/og/og-image.png",
        "image": "https://resumecraftor.com/og/og-image.png",
        "softwareVersion": "1.0",
        "creator": {
            "@type": "Organization",
            "name": "ResumeCraftor",
            "url": "https://resumecraftor.com/"
        },
        "publisher": {
            "@type": "Organization",
            "name": "ResumeCraftor",
            "url": "https://resumecraftor.com/"
        },
        "potentialAction": [
            {
                "@type": "UseAction",
                "name": "Create My Resume",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://resumecraftor.com/resume-builder",
                    "actionPlatform": [
                        "http://schema.org/DesktopWebPlatform",
                        "http://schema.org/MobileWebPlatform"
                    ]
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
