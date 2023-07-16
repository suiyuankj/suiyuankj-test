import React, { useEffect, useRef, useState } from 'react';
import styles from './style/layout.module.less';
import { Card, Input } from '@arco-design/web-react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import CodeTool from '@editorjs/code';
import SimpleImage from '@editorjs/simple-image';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Marker from '@editorjs/marker';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';

function Editor(param: any) {
    const editorRef = useRef(null);
    const [articleData, setArticleData] = useState(null);

    useEffect(() => {
        const editorInstance = new EditorJS({
            holder: editorRef.current,
            placeholder: '这里填写你的内容!',
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['marker', 'link'],
                    config: {
                        placeholder: '头部'
                    },
                    shortcut: 'CMD+SHIFT+H'
                },
                list: {
                    class: List,
                    inlineToolbar: true
                },
                code: CodeTool,
                quote: Quote,
                warning: Warning,
                marker: Marker,
                delimiter: Delimiter,
                inlineCode: InlineCode,
                linkTool: LinkTool,
                embed: Embed,
                table: Table
            },
            i18n: {
                messages: {
                    ui: {
                        "blockTunes": {
                            "toggler": {
                                "Click to tune": "点击进行调整",
                                "or drag to move": "或拖动以移动"
                            },
                        },
                        "inlineToolbar": {
                            "converter": {
                                "Convert to": "转换为"
                            }
                        },
                        "toolbar": {
                            "toolbox": {
                                "Add": "添加"
                            }
                        }
                    },
                    toolNames: {
                        "Text": "文本",
                        "Heading": "标题",
                        "List": "列表",
                        "Warning": "警告",
                        "Checklist": "复选框列表",
                        "Quote": "引用",
                        "Code": "代码",
                        "Delimiter": "分隔符",
                        "Raw HTML": "原始 HTML",
                        "Table": "表格",
                        "Link": "链接",
                        "Marker": "标记",
                        "Bold": "加粗",
                        "Italic": "斜体",
                        "InlineCode": "行内代码",
                    },
                    tools: {
                        "warning": {
                            "Title": "标题",
                            "Message": "消息",
                        },
                        "link": {
                            "Add a link": "添加链接"
                        },

                        "stub": {
                            'The block can not be displayed correctly.': '该块无法正确显示。'
                        }
                    },
                    blockTunes: {
                        "delete": {
                            "Delete": "删除"
                        },
                        "moveUp": {
                            "Move up": "上移"
                        },
                        "moveDown": {
                            "Move down": "下移"
                        }
                    },
                }
            },
        });

        editorRef.current = editorInstance; // 将引用指向 editorInstance

        return () => {
            editorInstance.destroy(); // 组件卸载时销毁 editorInstance
        };

    }, []);

    const handleBlur = () => {
        const editor = editorRef.current; // 使用 editorRef.current 获取 editor 实例
        if (editor) {
            editor.save().then((outputData) => {
                setArticleData(outputData);
                console.log(outputData);
                param.editorBlur(outputData);
            }).catch((error) => {
                console.log('Saving failed: ', error);
            });
        }
    };

    return (
        <Card>
            <div className={styles.Title}>

                <Input
                    className={styles.TitleInput}
                    maxLength={30}
                    showWordLimit
                    allowClear
                    placeholder='请输入标题（8-30字）'
                />
            </div>
            <div className={styles.EditorContainer}>
                <div ref={editorRef} onBlur={handleBlur}></div>
            </div>

        </Card>

    );
}

export default Editor;
