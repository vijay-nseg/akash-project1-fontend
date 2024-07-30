import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuillTextEditorWrapper({ text, changeHandler, keyLabel }) {

    const [editorValue, setEditorValue] = useState(text);

    useEffect(() => {
        // Update the editor value when the `text` prop changes (initial load or external updates)
        setEditorValue(text);
    }, [text]);

    const handleChange = (value) => {
        // Update the local state with the content as the user types
        setEditorValue(value);
    };
    
    const handleBlur = () => {
        // Use the `editorValue` (current content) when the editor loses focus (onBlur)
        changeHandler(keyLabel, editorValue);
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    return (
        <div>
            <label> Text </label>
            <ReactQuill
                key={keyLabel}
                value={editorValue}
                modules={modules}
                formats={formats}
                onChange={handleChange}
                onBlur={handleBlur}
            />
        </div>
    );
}

export default QuillTextEditorWrapper;

