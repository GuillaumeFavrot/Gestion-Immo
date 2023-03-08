#!/bin/python
import os
import platform
from pathlib import Path

from msoffice2pdf import convert

def convert_documents_to_pdf() -> None:
    """Convert each .docx document from the "document output" folder to pdf format"""

    # I loop on each file and convert it to pdf format
    for file in os.listdir("./documents_output"):
        
        if str(os.listdir("./documents_output")[0]).endswith("pdf") :
            """Conversion is not applied to pdfs"""
        else:
            input_file = os.path.abspath(f"{Path.cwd()}/documents_output/{file}")
            output_dir = (f"{Path.cwd()}/documents_output")

            if platform.system() == 'Windows':
                convert(source=input_file, output_dir=output_dir, soft=0)
            elif platform.system() == 'Linux':
                convert(source=input_file, output_dir=output_dir, soft=1)
            else:
                print("System not supported")

    # I re-loop on each file to delete .docx files and rename .pdf files
    for file in os.listdir("./documents_output"):
        if file.endswith('.docx'):
            os.remove(f"./documents_output/{file}")
        elif file.endswith('.pdf'):
            name = "".join(list(file)[20::])
            os.rename(f"./documents_output/{file}", f"./documents_output/{name}")