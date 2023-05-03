#!/bin/python

from pypdf import PdfReader
from fpdf import FPDF

class Pdf_processor:

    def pdf_reader(path: str) -> str:
        """return text extracted from a pdf given à path"""

        pdf = PdfReader(path)
        page = pdf.pages[0]
        return page.extract_text()
    
    def pdf_editor(text: str, fields: dict) -> str:
        """Edits a text with provided fields and variables"""
        
        for field in fields :
           text = text.replace(field, fields[field])

        return text

    def pdf_creator(text: str, document_name: str) -> None:
        """Creates a pdf file from a text"""

        output_folder = "./backend/application/documents_output"

        pdf = FPDF()
        pdf.add_page()
        text = text.replace('\n', '')
        lines = text.split('$$$')

        print(lines)
        
        for line in lines :
            print(line)
            align = 'L'
            font = []
            if '[R]' in line:
                line = line.replace('[R]', '')
                align='R'
            
            if '[B]' in line:
                line = line.replace('[B]', '')
                font.append('B')

            if '[U]' in line:
                line = line.replace('[U]', '')
                font.append('U')

            pdf.set_font("Arial", size=12, style="".join(font))

            pdf.multi_cell(190, 6, txt=line.strip(), align=align)

        # Save PDF
        pdf.output(f"{output_folder}/{document_name}.pdf", "F")