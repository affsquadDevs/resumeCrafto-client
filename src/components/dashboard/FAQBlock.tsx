'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "How do I create a resume on ResumeCraftor?",
        answer: "Creating a resume on ResumeCraftor is simple: 1) Choose from our professional templates, 2) Use the drag-and-drop editor to add your experience, skills, and education, 3) Customize the design and layout to match your style, 4) Download your resume as a PDF. The entire process takes less than 10 minutes."
    },
    {
        question: "Is ResumeCraftor free to use?",
        answer: "Yes, ResumeCraftor offers a free plan that allows you to create professional resumes, save designs, and download PDFs. You get access to all core features including the drag-and-drop editor, professional templates, and ATS-optimized formatting."
    },
    {
        question: "Are ResumeCraftor templates ATS-friendly?",
        answer: "Yes, all ResumeCraftor templates are designed to be ATS (Applicant Tracking System) friendly. We use clean formatting, standard fonts, and proper structure to ensure your resume passes through ATS systems and reaches human recruiters."
    },
    {
        question: "Can I edit my resume after downloading it?",
        answer: "Absolutely! All your resumes are automatically saved to your account. You can return to ResumeCraftor anytime, open your saved resume, make edits, and download an updated PDF. Your designs are stored securely in the cloud."
    },
    {
        question: "What file format can I download my resume in?",
        answer: "ResumeCraftor allows you to export and download your resume as a high-quality PDF file. PDF is the industry-standard format for job applications and ensures your formatting stays perfect across all devices and platforms."
    },
    {
        question: "Do I need design skills to use ResumeCraftor?",
        answer: "No design skills are required! ResumeCraftor's intuitive drag-and-drop editor makes it easy for anyone to create professional-looking resumes. Simply choose a template, fill in your information, and our smart editor handles the formatting and design for you."
    },
    {
        question: "Can I create multiple resumes?",
        answer: "Yes, you can create and save multiple resumes in your ResumeCraftor account. This is perfect for tailoring different resumes for different job applications or industries. All your designs are saved and accessible from your dashboard."
    },
    {
        question: "How long does it take to build a resume?",
        answer: "With ResumeCraftor's streamlined editor and professional templates, you can create a complete, polished resume in under 10 minutes. The intuitive interface and smart suggestions help you build quickly without sacrificing quality."
    }
];

export const FAQBlock = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="px-6 md:px-10 py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600">
                        Everything you need to know about ResumeCraftor
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="text-lg font-bold text-gray-900 pr-4">
                                    {faq.question}
                                </h3>
                                <ChevronDown
                                    className={`flex-shrink-0 text-purple-600 transition-transform ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    size={24}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <div className="px-6 pb-5 pt-2">
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
