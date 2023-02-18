import React, { useRef, useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';

import './style.less';

interface IUploadProps {
    className?: string;
    style?: React.CSSProperties;
    action: string;
    method: string;
    maxCount: number;
    accept?: string;
    multiple: string;
    beforeUpload: (file: File, fileList: FileList) => boolean | Promise<File>;
    onRemove: (file: File, fileList: File[]) => boolean | Promise<File>;
    onChange: () => void;
    children?: React.ReactNode;
}

const Upload: React.FC<IUploadProps> = (props) => {
    const { accept, multiple, action, method, maxCount, beforeUpload, onChange, onRemove, children, ...restProps } =
        props;

    const inputElement = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        console.log(fileList);

        if (!fileList) {
            return;
        }

        uploadFileList(fileList);

        if (inputElement.current) {
            inputElement.current.value = '';
        }
    };

    const uploadFileList = (files: FileList) => {
        const fileList = [...files];

        const formData = new FormData();
        fileList.forEach((file) => {
            const formData = new FormData();
            formData.append(file.name, file);
        });

        console.log(formData, 'KKK');

        axios({
            method: 'post',
            url: 'https://jsonplaceholder.typicode.com/posts/',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (e) => {
                console.log(e.loaded, e.total, 'pro');
            }
        });
    };

    return (
        <span className='d-upload-wrapper'>
            <div
                className='d-upload-select'
                onClick={() => {
                    inputElement.current?.click();
                }}
            >
                {children}
                <input className='hidden' type='file' accept={accept} ref={inputElement} onChange={handleFileChange} />
            </div>
            <div className='d-upload-list'></div>
        </span>
    );
};

export default Upload;
