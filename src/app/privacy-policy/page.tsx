import { CraftorNavbar } from "@/components/dashboard/CraftorNavbar";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <CraftorNavbar />
            <main className="container max-w-4xl mx-auto px-4 py-32">
                <h1 className="text-3xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Privacy Policy
                </h1>
                <div className="prose prose-invert prose-lg max-w-none space-y-8">
                    <p className="text-neutral-400 text-sm">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <p className="text-neutral-300 leading-relaxed">
                            At ResumeCraftor, we respect your privacy and are committed to protecting your personal data.
                            This privacy policy will inform you about how we look after your personal data and tell you
                            about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">1. Information We Collect</h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            We collect and process the following types of personal information:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li><strong className="text-white">Account Information:</strong> Name, email address, password, and profile details</li>
                            <li><strong className="text-white">Resume Content:</strong> Employment history, education, skills, and other information you provide in your documents</li>
                            <li><strong className="text-white">Usage Data:</strong> Information about how you use our platform, including IP address, browser type, device information, and usage patterns</li>
                            <li><strong className="text-white">Payment Information:</strong> Payment card details and billing information (processed securely through third-party payment processors)</li>
                            <li><strong className="text-white">Communications:</strong> Emails, messages, and feedback you send to us</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">2. How We Use Your Information</h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            We use your personal data for the following purposes:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li>To provide and maintain our resume building services</li>
                            <li>To create, edit, save, and export your documents</li>
                            <li>To authenticate your account and prevent fraud</li>
                            <li>To process payments and manage subscriptions</li>
                            <li>To send you service-related notifications and updates</li>
                            <li>To improve our platform and develop new features</li>
                            <li>To provide customer support and respond to your inquiries</li>
                            <li>To send marketing communications (with your consent)</li>
                            <li>To comply with legal obligations and enforce our terms</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">3. Legal Basis for Processing (GDPR)</h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            We process your personal data under the following legal bases:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li><strong className="text-white">Contract Performance:</strong> Processing necessary to provide our services to you</li>
                            <li><strong className="text-white">Consent:</strong> Where you have given us permission for specific purposes</li>
                            <li><strong className="text-white">Legitimate Interests:</strong> For improving our services, preventing fraud, and direct marketing</li>
                            <li><strong className="text-white">Legal Obligations:</strong> To comply with applicable laws and regulations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">4. Data Sharing and Disclosure</h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            We may share your information with:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li><strong className="text-white">Service Providers:</strong> Third-party vendors who assist in providing our services (e.g., hosting, analytics, payment processing)</li>
                            <li><strong className="text-white">Business Transfers:</strong> In connection with any merger, acquisition, or sale of company assets</li>
                            <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                            <li><strong className="text-white">With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                        </ul>
                        <p className="text-neutral-300 leading-relaxed mt-4">
                            We do not sell your personal data to third parties.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">5. Data Retention</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy.
                            Account information and resume data are stored while your account is active and for a reasonable period after
                            account deletion to comply with legal obligations. You can request deletion of your data at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">6. Your Privacy Rights</h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            Depending on your location, you may have the following rights:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
                            <li><strong className="text-white">Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                            <li><strong className="text-white">Erasure:</strong> Request deletion of your personal data</li>
                            <li><strong className="text-white">Restriction:</strong> Request limitation of processing of your data</li>
                            <li><strong className="text-white">Data Portability:</strong> Receive your data in a structured, machine-readable format</li>
                            <li><strong className="text-white">Objection:</strong> Object to processing of your data for certain purposes</li>
                            <li><strong className="text-white">Withdraw Consent:</strong> Withdraw consent at any time where we rely on consent</li>
                            <li><strong className="text-white">Complain:</strong> Lodge a complaint with your local data protection authority</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">7. Data Security</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            We implement appropriate technical and organizational security measures to protect your personal data against
                            unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, regular
                            security assessments, and access controls. However, no method of transmission over the internet is 100% secure,
                            and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">8. Cookies and Tracking Technologies</h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            We use cookies and similar tracking technologies to:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-neutral-300">
                            <li>Maintain your session and keep you logged in</li>
                            <li>Remember your preferences and settings</li>
                            <li>Analyze usage patterns and improve our services</li>
                            <li>Provide personalized content and advertising</li>
                        </ul>
                        <p className="text-neutral-300 leading-relaxed mt-4">
                            You can control cookies through your browser settings. Note that disabling certain cookies may affect
                            the functionality of our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">9. Third-Party Services</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            Our platform may integrate with third-party services such as analytics providers, payment processors,
                            and cloud storage services. These third parties have their own privacy policies, and we recommend reviewing
                            them. We are not responsible for the privacy practices of third-party services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">10. International Data Transfers</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            Your data may be transferred to and processed in countries other than your country of residence.
                            We ensure that such transfers comply with applicable data protection laws and implement appropriate
                            safeguards, such as Standard Contractual Clauses approved by the European Commission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">11. Children's Privacy</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            Our services are not directed to individuals under the age of 16. We do not knowingly collect personal
                            data from children. If you become aware that a child has provided us with personal data, please contact us,
                            and we will take steps to delete such information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">12. Changes to This Privacy Policy</h2>
                        <p className="text-neutral-300 leading-relaxed">
                            We may update this privacy policy from time to time to reflect changes in our practices or legal requirements.
                            We will notify you of any material changes by posting the new policy on this page and updating the "Last updated"
                            date. We encourage you to review this policy periodically.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">13. Contact Us</h2>
                        <p className="text-neutral-300 leading-relaxed mb-4">
                            If you have any questions, concerns, or requests regarding this privacy policy or our data practices,
                            please contact us at:
                        </p>
                        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6">
                            <p className="text-white font-semibold mb-2">ResumeCraftor Privacy Team</p>
                            <p className="text-neutral-300">
                                Email: <a href="mailto:hello@affsquad.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                                    hello@affsquad.com
                                </a>
                            </p>
                        </div>
                    </section>

                    <section className="border-t border-neutral-800 pt-8 mt-12">
                        <p className="text-neutral-400 text-sm italic">
                            This privacy policy is compliant with GDPR (General Data Protection Regulation), CCPA (California Consumer Privacy Act),
                            and other applicable data protection laws. We are committed to protecting your privacy and handling your data responsibly.
                        </p>
                    </section>
                </div>
            </main>
        </div>
    );
}
