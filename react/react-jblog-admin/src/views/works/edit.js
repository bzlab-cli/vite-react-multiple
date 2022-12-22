/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/15 下午2:55
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/15 下午2:55
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Select, Input, Button, Tag, message} from 'antd';
import Editor from '../../components/editor';
import {getTagsList, getWorks, alterWorks, setStore} from "../../redux/works/edit.redux";

const {Option} = Select;
const {CheckableTag} = Tag;

const mapStateProps = state => ({
    works_edit: state.works_edit
});

const mapDispatchToProps = dispatch => ({
    getTagsList, getWorks, alterWorks, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class EditForm extends Component {

    editor = null;

    constructor(props) {
        super(props);

        this.state = {};
    }


    handleEditorChange = (value) => {
        this.props.setStore({
            content: value,
        });
    };

    componentWillMount() {
        this.props.getTagsList()
    }

    componentDidMount() {
        console.log(this);

        const _id = this.props.match.params.id;
        this.props.getWorks({_id})
    }

    handleStateChange = value => {
        this.props.setStore({
            state: value,
        });
    };

    handleTagChange = (tag, checked) => {
        const {selectedTags} = this.props.works_edit;
        const nextSelectedTags = checked ? [...selectedTags, tag._id] : selectedTags.filter(t => t !== tag._id);
        this.props.setStore({selectedTags: nextSelectedTags});

        setTimeout(() => {
            console.log(this.props.works_edit.selectedTags)
        }, 50)
    };

    getFile(e) {
        let self = this;
        let obj = e.target || null;
        let fileName = obj.files[0].name;

        let fileReader = new FileReader();
        if (fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase() !== 'md') {
            return message.info('请上传markdown的文件');
        }
        fileReader.readAsText(obj.files[0]);
        fileReader.onload = function () {
            let result = this.result;

            try {
                self.props.setStore({
                    content: result
                })
            } catch (e) {
                console.error("Storage failed: " + e);
            }
        }
    };

    getNavigation = () => {
        let navigationContent;
        let navigation_list = [];

        navigationContent = document.querySelector('.for-markdown-preview');
        navigationContent.innerHTML = this.editor.getHtmlValue();

        let nodes = navigationContent.children;
        if (nodes.length) {
            for (let i = 0; i < nodes.length; i++) {
                judageH(nodes[i], i, nodes)
            }
        }

        function judageH(node, i, nodes) {
            let reg = /^H[1-6]{1}$/;
            if (reg.exec(node.tagName)) {
                navigation_list.push({
                    name: node.innerText,
                    id: node.getAttribute('id')
                })
            }
        }

        return navigation_list
    };

    handlePublish = () => {

        this.props.alterWorks({
            _id: this.props.match.params.id,
            content: this.props.works_edit.content,
            render_content: this.editor.getHtmlValue(),
            cover: this.props.works_edit.cover,
            desc: this.props.works_edit.desc,
            state: this.props.works_edit.state,
            tags: JSON.stringify(this.props.works_edit.selectedTags),
            title: this.props.works_edit.title,
            navigation: JSON.stringify(this.getNavigation())
        })
    };

    render() {
        const {title, tag_list, state_list, cover, desc, content, selectedTags, state} = this.props.works_edit;

        return (
            <div>
                <Form labelCol={{span: 1}} wrapperCol={{span: 15}}>
                    <Form.Item label="标题：">
                        <Input
                            placeholder="请输入名称"
                            name="title"
                            value={title}
                            onChange={(event) => {
                                this.props.setStore({
                                    title: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="标签：">
                        {
                            tag_list.map((tag, key) => (
                                <CheckableTag
                                    key={key}
                                    checked={selectedTags.indexOf(tag._id) > -1}
                                    onChange={checked => this.handleTagChange(tag, checked)}
                                >
                                    {tag.tags_name}
                                </CheckableTag>
                            ))
                        }
                    </Form.Item>
                    <Form.Item label="状态：">
                        <Select value={state} style={{width: 150}}
                                onChange={this.handleStateChange}>
                            {state_list.map((item, key) => (
                                <Option
                                    key={key}
                                    value={item.value}
                                >
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面：">
                        <Input
                            placeholder="请输入图片地址"
                            name="cover"
                            value={cover}
                            onChange={(event) => {
                                this.props.setStore({
                                    cover: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="描述：">
                        <Input.TextArea
                            placeholder="请输入描述内容"
                            name="desc"
                            value={desc}
                            autosize={{minRows: 2, maxRows: 5}}
                            onChange={(event) => {
                                this.props.setStore({
                                    desc: event.target.value,
                                });
                            }}
                        />
                    </Form.Item>
                </Form>

                <div className="article-content markdown-body" id="article-content" style={{marginBottom: '20px'}}>
                    <Editor
                        ref={node => this.editor = node}
                        value={content}
                        onChange={this.handleEditorChange}/>
                </div>

                <input
                    type="file"
                    id="uploadMD"
                    onChange={this.getFile.bind(this)}
                    className="file"
                    style={{opacity: 0, position: 'absolute', top: '-999px'}}
                />
                <Button
                    type="primary"
                    onClick={this.handlePublish}
                >
                    发表
                </Button>
                <label
                    htmlFor="uploadMD"
                    className="upload-md"
                    style={{marginLeft: '10px', cursor: 'pointer', verticalAlign: 'middle', fontSize: '14px'}}
                >上传MD
                </label>

            </div>
        )
    }
}

const Edit = Form.create()(EditForm);

export default Edit
