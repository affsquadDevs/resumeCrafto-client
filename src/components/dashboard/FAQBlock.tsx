'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/lib/faq-data';

export const FAQBlock = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="px-6 md:px-10 py-20 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10 md:mb-16 px-4 md:px-0">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-2 md:mb-4 text-gray-900">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-sm sm:text-base md:text-xl text-gray-600">
                        Everything you need to know about ResumeCraftor
                    </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left gap-3 sm:gap-4 hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 pr-2 sm:pr-4">
                                    {faq.question}
                                </h3>
                                <ChevronDown
                                    className={`flex-shrink-0 text-purple-600 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                                    size={20} // трохи менше на мобільних
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
                            >
                                <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-2">
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                        {faq.answer.split('\n').map((part, i) => (
                                            <span key={i}>
                                                {part}
                                                <br />
                                            </span>
                                        ))}
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
