import React, { useState, useRef } from "react";
import "@pqina/pintura/pintura.css";
import {
    // editor
    openEditor,
    locale_en_gb,
    createDefaultImageReader,
    createDefaultImageWriter,
    createDefaultImageOrienter,
    createDefaultShapePreprocessor,
    legacyDataToImageState,
    processImage,

    // plugins
    setPlugins,
    plugin_crop,
    plugin_crop_locale_en_gb,
    plugin_finetune,
    plugin_finetune_locale_en_gb,
    plugin_finetune_defaults,
    plugin_filter,
    plugin_filter_locale_en_gb,
    plugin_filter_defaults,
    plugin_annotate,
    plugin_annotate_locale_en_gb,
    markup_editor_defaults,
    markup_editor_locale_en_gb,
} from "@pqina/pintura";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-file-poster/dist/filepond-plugin-file-poster.min.css";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFilePoster from "filepond-plugin-file-poster";
import FilePondPluginImageEditor from "@pqina/filepond-plugin-image-editor";
registerPlugin(FilePondPluginImageEditor, FilePondPluginFilePoster);

// pintura
setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

import './styles.css';

export default function UploadEventImage() {
    const [files, setFiles] = useState([]);
    const filePondRef = useRef(null); // Create a ref for the FilePond component

    // Function to trigger file selection dialog when "Upload Event Art" button is clicked
    const handleUploadButtonClick = () => {
        filePondRef.current.browse();
    };

    return (
        <>
            <div className="events-upload-button">
                <button className="events-black-button" onClick={handleUploadButtonClick}>
                    Upload Event Art
                </button>
            </div>
            <div className="events-event-photo">
                {/* Use the ref for FilePond */}
                <FilePond
                    ref={filePondRef}
                    files={files}
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    server={{
                        load: (src, load) => {
                            fetch(src)
                                .then((res) => res.blob())
                                .then(load);
                        },
                    }}
                    name="files"

                    imageEditor={{
                        // map legacy data objects to new imageState objects
                        legacyDataToImageState: legacyDataToImageState,

                        // used to create the editor, receives editor configuration, should return an editor instance
                        createEditor: openEditor,

                        // Required, used for reading the image data
                        imageReader: [
                            createDefaultImageReader,
                        ],

                        // optionally. can leave out when not generating a preview thumbnail and/or output image
                        imageWriter: [
                            createDefaultImageWriter,
                        ],

                        // used to generate poster images, runs an editor in the background
                        imageProcessor: processImage,

                        // editor options
                        editorOptions: {
                            utils: ["crop", "finetune", "filter", "annotate"],
                            imageOrienter: createDefaultImageOrienter(),
                            shapePreprocessor: createDefaultShapePreprocessor(),
                            ...plugin_finetune_defaults,
                            ...plugin_filter_defaults,
                            ...markup_editor_defaults,
                            locale: {
                                ...locale_en_gb,
                                ...plugin_crop_locale_en_gb,
                                ...plugin_finetune_locale_en_gb,
                                ...plugin_filter_locale_en_gb,
                                ...plugin_annotate_locale_en_gb,
                                ...markup_editor_locale_en_gb,
                            },
                        },
                    }}
                    allowImageEditor={true}
                    className="upload-image-drop-zone-styles"
                    credits={false}
                    instantUpload={false}
                />
            </div>
        </>
    );
}


