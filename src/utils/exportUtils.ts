import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * Multi-page PDF Export Utility
 * 
 * Captures each page element individually to ensure a true multi-page PDF output.
 * Temporarily scales the capture to ensure high quality and handles A4 dimensions.
 */
export const downloadPDF = async () => {
    // Target the main container
    const pages = document.querySelectorAll('.resume-page');
    if (pages.length === 0) {
        console.error('No pages found for export');
        return;
    }

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [794, 1123] // A4 in 96 DPI
    });

    try {
        // Show a loading indicator if we had one, for now console log

        for (let i = 0; i < pages.length; i++) {
            const pageEl = pages[i] as HTMLElement;

            // Capture page as PNG
            // We use a high pixel ratio for print quality
            const dataUrl = await toPng(pageEl, {
                pixelRatio: 2,
                skipFonts: false,
                // Hide elements we don't want in the final PDF
                filter: (node) => {
                    // Check if node is a distance guide or selection indicator
                    if (node instanceof HTMLElement) {
                        return !node.classList.contains('selection-indicator') &&
                            !node.closest('.distance-guides'); // Assuming we add these classes
                    }
                    return true;
                }
            });

            if (i > 0) {
                pdf.addPage([794, 1123], 'portrait');
            }

            // Add the image to the current PDF page
            pdf.addImage(dataUrl, 'PNG', 0, 0, 794, 1123);
        }

        pdf.save('my_resume.pdf');
    } catch (error) {
        console.error('Failed to export PDF:', error);
        alert('Failed to export PDF. Please see console for details.');
    }
};
