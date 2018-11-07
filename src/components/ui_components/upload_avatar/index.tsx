import { Avatar, ButtonBase, Grid, Typography, WithTheme, withTheme } from '@material-ui/core';
import * as React from 'react';
import { style } from './style';

export interface UploadAvatarProps {
    /**
     * The label to display in the upload button
     */
    buttonLabel: string;
    /**
     * The avatar url
     */
    avatarUrl: string;
    /**
     * The text to explain the upload
     */
    captionLabel: string;
    /**
     * Kind of file to be accepted
     * Don't use image/* if you want get error validation working
     * (eg: .pdf,.doc,.docx,.xls,.xls)
     */
    fileType: string;
    /**
     * The file size to limit in MB
     */
    fileSize: number;
    /**
     * The Function to launch when button is clicked
     */
    onClick: (binary: string, file: File) => void;
    /**
     * The Function to launch when extension is not correct
     */
    handleTypeError: () => void;
    /**
     * The Function to launch when size is not correct
     */
    handleSizeError: () => void;
}

const UploadAvatarBase: React.StatelessComponent<UploadAvatarProps & WithTheme> = (props) => {

    const { buttonLabel, avatarUrl, captionLabel, fileType, fileSize, onClick, handleTypeError, handleSizeError, theme } = props;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        if (event.target.files) {
            Array.from(event.target.files).forEach(file => {
                const fileExtensionsSplit = file.name.split('.');
                const fileExtension = fileExtensionsSplit[fileExtensionsSplit.length - 1].toLowerCase();
                const fileTypeSplit = fileType.split(',').map(type => type.toLowerCase().slice(1));
                if (!fileTypeSplit.includes(fileExtension)) {
                    handleTypeError();
                    event.target.value = ''; // to allow upload of same file if error occurs
                } else {
                    getFileFromInput(file)
                        .then((binary) => {
                            if (binary.length / 1024 / 1024 >= fileSize) {
                                handleSizeError();
                                event.target.value = ''; // to allow upload of same file if error occurs
                            } else {
                                onClick(binary, file);
                                event.target.value = ''; // to allow upload of same file
                            }
                        }).catch((_reason) => {
                            // Error during upload
                            event.target.value = ''; // to allow upload of same file if error occurs
                        });
                }
            });
        }
    };

    // function to read file as binary and return
    const getFileFromInput = (file: File): Promise<any> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => { resolve(reader.result); };
            reader.readAsBinaryString(file);
        });
    };

    return (
        <Grid container={true} spacing={16} alignItems={'center'} direction={'column'} >
            <Grid item={true}>
                <Avatar src={avatarUrl} style={style(theme).bigAvatar} />
            </Grid>
            <Grid item={true}>
                <input
                    accept={fileType}
                    style={style(theme).inputUploadFile}
                    id="file"
                    multiple={false}
                    type="file"
                    onChange={(event) => handleFileChange(event)}
                />
                <label htmlFor="file">
                    <ButtonBase component="span">
                        <Typography variant={'body1'} color={'primary'} component="span" align="center" onClick={(event) => event.stopPropagation()} >
                            {buttonLabel}
                        </Typography>
                    </ButtonBase>
                </label>
            </Grid>
            <Grid item={true}>
                <Typography variant={'caption'} component="span" align="center" onClick={(event) => event.stopPropagation()}>
                    {captionLabel}
                </Typography>
            </Grid>
        </Grid>
    );
};

const UploadAvatarWithTheme: React.ComponentType<UploadAvatarProps> = withTheme()(UploadAvatarBase);

/**
 * Upload an picture as avatar.
 * The result is the javascript file and the binary.
 */
export const UploadAvatar: React.ComponentType<UploadAvatarProps> = (UploadAvatarWithTheme);
