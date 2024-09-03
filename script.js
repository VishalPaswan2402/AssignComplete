function reflectContent() {
    var content = document.querySelector('.textArea').value;
    document.querySelector('.textAreaReflect').value = content;
}

function changeFontStyle() {
    var selectedFont = document.getElementById('fontSelect').value;
    document.querySelector('.textAreaReflect').style.fontFamily = selectedFont;
}

function changeFontSize() {
    var selectedFontSize = document.getElementById('fontSize').value;
    document.querySelector('.textAreaReflect').style.fontSize = selectedFontSize;
}

function changeWordSpacing() {
    var selectedWordSpacing = document.getElementById('wordSpacing').value;
    document.querySelector('.textAreaReflect').style.wordSpacing = selectedWordSpacing;
}

function changeLetterSpacing() {
    var selectedLetterSpacing = document.getElementById('letterSpacing').value;
    document.querySelector('.textAreaReflect').style.letterSpacing = selectedLetterSpacing;
}

async function saveAsPDF() {
    const textarea = document.getElementById("printArea");

    // Create a temporary container div to render the text content
    const textContainer = document.createElement("div");
    textContainer.style.width = textarea.clientWidth + "px";
    textContainer.style.height = "auto";
    // textContainer.style.border = "1px solid #ddd";
    textContainer.style.backgroundColor = "#fff";
    textContainer.style.fontFamily = window.getComputedStyle(textarea).fontFamily;
    textContainer.style.fontSize = window.getComputedStyle(textarea).fontSize;
    textContainer.style.letterSpacing=window.getComputedStyle(textarea).letterSpacing;
    textContainer.style.wordSpacing=window.getComputedStyle(textarea).wordSpacing;
    textContainer.style.whiteSpace = "pre-wrap";
    textContainer.style.padding = "10px";
    textContainer.innerText = textarea.value;
    document.body.appendChild(textContainer);

    const pageWidth = 210; // A4 page width in mm
    const pageHeight = 297; // A4 page height in mm
    const pdf = new jspdf.jsPDF();

    const canvas = await html2canvas(textContainer, { scale: 2 });
    const imgData = canvas.toDataURL();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add the first page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Continue adding pages if content is longer than one page
    while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
    }

    document.body.removeChild(textContainer); // Clean up

    // Save the PDF
    pdf.save("assignComplete.pdf");
}
