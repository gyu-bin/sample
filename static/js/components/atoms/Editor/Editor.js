import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import getEditorNamespace from './GetEditorNamespace';
import { DEV_DOMAIN_URL } from 'commons/constants';

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.dialogOpen = false;

        this.element = null;
        this.editor = null;
    }

    componentDidMount() {
        this._initEditor();
    }

    componentDidUpdate(prevProps) {
        const { props, editor } = this;

        if (window.frames[0] && props.data.length === 0) {
            const ele = window.frames[0].document.querySelector('.cke_editable');
            if (ele) {
                ele.setAttribute('data-cke-editorplaceholder', props.placeHolder);
            }
        }

        /* istanbul ignore next */
        if (!editor) {
            return;
        }

        if (prevProps.data !== props.data && editor.getData() !== props.data) {
            editor.setData(props.data);
        }

        this._attachEventHandlers(prevProps);
    }

    componentWillUnmount() {
        this._destroyEditor();
    }

    _initEditor() {
        getEditorNamespace(Editor.editorUrl)
            .then((CKEDITOR) => {
                const { data, placeHolder, onBeforeLoad, uploadUrl, noImage, height, onFileUploaded } = this.props;

                CKEDITOR.disableAutoInline = true;

                CKEDITOR.on('dialogDefinition', (evt) => {
                    const dialog = evt.data;

                    if (dialog.name === 'link') {
                        evt.data.definition.removeContents('upload');
                    }

                    evt.data.definition.dialog.on('show', () => {
                        // console.log('show');

                        this.dialogOpen = true;

                        for (let i = 0; i < window.frames.length; i++) {
                            if (window.frames[i].frameElement.className === 'cke_dialog_ui_input_file') {
                                const element = document.getElementsByClassName('cke_dialog_ui_fileButton cke_dialog_ui_button');
                                element[0].firstChild.innerHTML = '이미지 등록';
                            }
                        }
                    });

                    evt.data.definition.dialog.on('hide', () => {
                        this.dialogOpen = true;
                        // console.log('hide');
                    });
                });

                const OriginalFunction = CKEDITOR.tools.callFunction;
                CKEDITOR.tools.callFunction = (n, x) => {
                    OriginalFunction(n, x);
                };

                if (onBeforeLoad) {
                    onBeforeLoad(CKEDITOR);
                }

                let config;

                if (noImage) {
                    config = {
                        editorplaceholder: placeHolder,
                    };
                } else {
                    config = {
                        extraPlugins: 'editorplaceholder, image2',
                        editorplaceholder: placeHolder,
                    };
                }

                config.height = height;

                config.toolbarGroups = [
                    { name: 'styles', groups: ['styles'] },
                    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
                    { name: 'links', groups: ['links'] },
                    { name: 'document', groups: ['mode', 'document', 'doctools'] },
                    { name: 'clipboard', groups: ['clipboard', 'undo'] },
                    { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                    { name: 'forms', groups: ['forms'] },
                    { name: 'insert', groups: ['insert'] },
                ];

                config.removeButtons =
                    'Source,Save,NewPage,Preview,Print,Templates,Cut,Undo,Redo,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Styles,Font,FontSize,TextColor,Maximize,RemoveFormat,CopyFormatting,Underline,Subscript,Superscript,CreateDiv,Blockquote,JustifyLeft,BidiLtr,BidiRtl,JustifyCenter,JustifyRight,Language,JustifyBlock,Anchor,Radio,Checkbox,Flash,Table,HorizontalRule,TextField,Textarea,Smiley,SpecialChar,Select,Button,PageBreak,Iframe,ImageButton,HiddenField,BGColor,ShowBlocks,About';
                config.removePlugins = 'image';

                // 이미지 업로드 url 설정
                config.filebrowserUploadUrl = uploadUrl;
                config.uploadUrl = uploadUrl;
                config.enterMode = CKEDITOR.ENTER_BR;

                this.editor = CKEDITOR.replace(this.element, config);

                this._attachEventHandlers();

                this.editor.on('fileUploadResponse', (evt) => {
                    // Get XHR and response.
                    const { data } = evt;
                    const { xhr } = data.fileLoader;
                    const response = xhr.responseText.split('|');

                    if (response[0]) {
                        const obj = JSON.parse(response[0]);

                        let imageUrl = obj.uri;

                        if (window.location.hostname.includes('localhost')) {
                            imageUrl = DEV_DOMAIN_URL + obj.uri;
                        }

                        if (!evt.editor.getData() && !this.dialogOpen) {
                            evt.editor.setData(`${evt.editor.getData()}<img src="${imageUrl}">`);
                        }

                        evt.data.url = imageUrl;

                        // change 이벤트를 발생시켜 변수에 세팅되도록 함.
                        setTimeout(() => {
                            evt.editor.fire('change');
                        }, 0);
                    }
                });

                if (data) {
                    this.editor.setData(data);
                }
            })
            .catch(window.console.error);
    }

    _attachEventHandlers(prevProps = {}) {
        const { props } = this;

        Object.keys(this.props).forEach((propName) => {
            if (!propName.startsWith('on') || prevProps[propName] === props[propName]) {
                return;
            }

            this._attachEventHandler(propName, prevProps[propName]);
        });
    }

    _attachEventHandler(propName, prevHandler) {
        const evtName = `${propName[2].toLowerCase()}${propName.substr(3)}`;

        if (prevHandler) {
            this.editor.removeListener(evtName, prevHandler);
        }

        this.editor.on(evtName, this.props[propName]);
    }

    _destroyEditor() {
        if (this.editor) {
            this.editor.destroy();
        }

        this.editor = null;
        this.element = null;
    }

    render() {
        const { className } = this.props;
        return (
            <div className={className} contentEditable="true" style={this.props.style} ref={(ref) => (this.element = ref)} />
        );
    }
}

Editor.propTypes = {
    id: PropTypes.string,
    data: PropTypes.string,
    onBeforeLoad: PropTypes.func,
    onChange: PropTypes.func,
    onFileUploaded: PropTypes.func,
    css: PropTypes.string,
    uploadUrl: PropTypes.string,
    placeHolder: PropTypes.string,
    className: PropTypes.string,
    noImage: PropTypes.bool,
};

Editor.defaultProps = {
    id: 'editor1',
    data: '',
    css: '',
    placeHolder: '',
    uploadUrl: '',
    className: '',
    noImage: false,
};

Editor.editorUrl = '/lib/ckeditor/ckeditor.js';
Editor.displayName = 'CKEditor';

export default Editor;
