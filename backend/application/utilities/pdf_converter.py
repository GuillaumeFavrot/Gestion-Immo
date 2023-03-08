#!/bin/python
import os
import platform
from pathlib import Path

from msoffice2pdf import convert

output_folder = "/backend/application/documents_output"

def convert_documents_to_pdf() -> None:
    """Convert each .docx document from the "document output" folder to pdf format"""

    # I loop on each file and convert it to pdf format
    for file in os.listdir(f".{output_folder}"):
        
        if str(os.listdir(f".{output_folder}")[0]).endswith("pdf") :
            """Conversion is not applied to pdfs"""
        else:
            input_file = os.path.abspath(f"{Path.cwd()}{output_folder}/{file}")
            output_dir = (f"{Path.cwd()}{output_folder}")

            if platform.system() == 'Windows':
                convert(source=input_file, output_dir=output_dir, soft=0)
            elif platform.system() == 'Linux':
                convert(source=input_file, output_dir=output_dir, soft=1)
            else:
                print("System not supported")

    # I re-loop on each file to delete .docx files and rename .pdf files
    for file in os.listdir(f".{output_folder}"):
        if file.endswith('.docx'):
            os.remove(f".{output_folder}/{file}")
        elif file.endswith('.pdf'):
            name = "".join(list(file)[20::])
            os.rename(f".{output_folder}/{file}", f".{output_folder}/{name}")