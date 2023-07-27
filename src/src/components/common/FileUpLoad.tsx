import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Grid, Button, Box, Typography, Modal } from '@mui/material';
import { Close, DeleteOutlined } from '@mui/icons-material';
import { addResume } from '../../store/reducers/candidate/candidateActions';

const styles = {
    item20: { height: '15%' },
    item80: { height: '80%', borderRadius: '5px' },
    item5: { height: '5%', marginTop: '5px' },
    container: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: 500,
        bgcolor: 'background.paper',
        borderRadius: '5px',
        padding: '50px',
        p: 4,
        display: 'table',
    },
    dropDown: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '10px',
    },
    upload: { textTransform: 'none', height: '30px' },
    cancel: {
        textTransform: 'none',
        color: 'gray',
        height: '30px',
        borderColor: 'gray',
        '&:hover': {
            borderColor: 'gray',
        },
    },
    selectFile: { textTransform: 'none', margin: '5px' },
};

const FileUpLoad = ({
    title,
    text,
    isOpen,
    maxSize,
    maxSizeText,
    extensions,
    onClose,
    resume,
    handleChange,
}: {
    title: string;
    text: string;
    isOpen: boolean;
    maxSize: number;
    maxSizeText: string;
    extensions: string;
    onClose: any;
    resume?: File;
    handleChange?: any;
}) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const initialFileData = { name: '', file: resume || undefined, isDragOver: false };
    const [selectedFile, setSelectedFile] = useState(initialFileData);
    const currentFileName = selectedFile.file ? selectedFile.name : t('noFileSelected');
    const borderStyle = selectedFile.isDragOver ? '1px dashed #3688fc' : '1px dashed #98a6ad';

    const handleDelete = () => {
        setSelectedFile(initialFileData);
    };

    const canSelectFile = (size: number, extension = undefined) => {
        let isExtensionAllowed = true;
        if (extension) isExtensionAllowed = extensions.split(',').includes(`.${extension}`);
        return isExtensionAllowed && size <= maxSize;
    };

    const onFileUpload = () => {
        if (selectedFile.file) {
            const formFile = new FormData();
            formFile.append('File', selectedFile.file);

            if (handleChange) {
                handleChange('resume', formFile)();
            } else {
                dispatch(addResume(formFile));
            }
            onClose();
        }
    };

    const onFileChange = (fileData: any, extension = undefined) => {
        if (canSelectFile(fileData.size, extension))
            setSelectedFile({ name: fileData.name, file: fileData, isDragOver: false });
        else setSelectedFile({ ...selectedFile, isDragOver: false });
    };

    const onResetValue = (e: any) => {
        e.target.value = null;
    };

    const onDragOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedFile({ ...selectedFile, isDragOver: true });
    };

    const onDrop = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const fileData = e.dataTransfer.files[0];
        const extension = fileData.name.split('.')[1];
        onFileChange(fileData, extension);
    };

    const onDragLeave = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedFile({ ...selectedFile, isDragOver: false });
    };

    return (
        <Modal open={isOpen} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Grid container direction="row" sx={styles.container}>
                <Grid container sx={styles.item20}>
                    <Grid item xs={11}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} textAlign="right">
                        <Close onClick={onClose} />
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={styles.item80}
                    border={borderStyle}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}>
                    <Box sx={styles.dropDown}>
                        <Grid container direction="row" textAlign="center">
                            <Grid item xs={12}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="54"
                                    height="54"
                                    viewBox="0 0 54 54"
                                    fill="#98a6ad">
                                    <path d="M0 0h48v48h-48z" fill="none" />
                                    <path
                                        d="M38.71 20.07c-1.36-6.88-7.43-12.07-14.71-12.07-5.78 0-10.79 3.28-13.3 8.07-6.01.65-10.7 5.74-10.7 11.93 0 6.63 5.37 12 12 
                                        12h26c5.52 0 10-4.48 10-10 0-5.28-4.11-9.56-9.29-9.93zm-10.71 5.93v8h-8v-8h-6l10-10 10 10h-6z"
                                    />
                                </svg>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography style={{ color: 'lightGray' }}>{text}</Typography>
                                <Typography style={{ color: 'lightGray' }}>{t('or')}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button sx={styles.selectFile} variant="contained" component="label">
                                    {t('selectFileToUpload')}
                                    <input
                                        type="file"
                                        accept={extensions}
                                        hidden
                                        onChange={(e) => onFileChange(e.target.files?.[0])}
                                        onClick={onResetValue}
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    {t('supportedFileTypes')} ( max {maxSizeText} ):
                                </Typography>
                                <Typography style={{ color: 'lightGray' }}>pdf, doc, docx</Typography>
                            </Grid>
                            <Grid container>
                                <Grid item xs={selectedFile.file ? 11 : 12}>
                                    <Typography id="modal-modal-title">{currentFileName}</Typography>
                                </Grid>
                                <Grid item xs={1} textAlign="right">
                                    {selectedFile.file && <DeleteOutlined onClick={handleDelete} />}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid container sx={styles.item5} justifyContent="flex-end" spacing={1}>
                    <Grid item>
                        <Button sx={styles.upload} variant="contained" onClick={onFileUpload}>
                            {t('upload')}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button sx={styles.cancel} variant="outlined" onClick={onClose}>
                            {t('cancel')}
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

FileUpLoad.defaultProps = {
    resume: null,
    handleChange: null,
};

export default FileUpLoad;
