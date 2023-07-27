import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ControlledEditor = ({ onEditorValueChange, editorData }: any) => {
    const [editorStateData, setEditorStateData] = useState(editorData);
    return (
        <CKEditor
            editor={ClassicEditor}
            data={editorStateData}
            onChange={(event: any, editor: { getData: () => any }) => {
                const data = editor.getData();
                setEditorStateData(data);
                onEditorValueChange(data);
            }}
        />
    );
};

export default ControlledEditor;
