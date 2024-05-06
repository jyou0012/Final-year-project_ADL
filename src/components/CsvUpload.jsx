import React, { useRef, useState } from 'react';

function CsvUpload() {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('No file selected');
    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            setFileName(file.name);  
        } else {
            setFileName('No file selected');  
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3000/upload-csv', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert('File uploaded and processed successfully');
            } else {
                throw new Error('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file: ', error);
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }} 
            />
            <button type="button" onClick={() => fileInputRef.current.click()}>
                Choose File
            </button>
            <span>{fileName}</span>
            <button type="submit">Upload CSV</button>
        </form>
    );
}

export default CsvUpload;
