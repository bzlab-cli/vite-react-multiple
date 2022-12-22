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
import {getTagsList, addWorks, setStore} from "../../redux/works/new.redux";

const {Option} = Select;
const {CheckableTag} = Tag;

const mapStateProps = state => ({
    works_new: state.works_new
});

const mapDispatchToProps = dispatch => ({
    getTagsList, addWorks, setStore
});

@connect(
    mapStateProps,
    mapDispatchToProps()
)

class NewForm extends Component {

    editor = null;

    constructor(props) {
        super(props);

        this.state = {};

        /*this.setState(prevState => ({
            title: ''
        }));*/
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
    }

    handleStateChange = value => {
        this.props.setStore({
            state: value,
        });
    };

    handleTagChange = (tag, checked) => {
        const {selectedTags} = this.props.works_new;
        const nextSelectedTags = checked ? [...selectedTags, tag._id] : selectedTags.filter(t => t !== tag._id);
        this.props.setStore({selectedTags: nextSelectedTags});

        setTimeout(() => {
            console.log(this.props.works_new.selectedTags)
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

        this.props.addWorks({
            content: this.props.works_new.content,
            render_content: this.editor.getHtmlValue(),
            cover: this.props.works_new.cover,
            desc: this.props.works_new.desc,
            state: this.props.works_new.state,
            tags: JSON.stringify(this.props.works_new.selectedTags),
            title: this.props.works_new.title,
            navigation: JSON.stringify(this.getNavigation())
        })
    };

    render() {
        const {title, tag_list, state_list, cover, desc, content, selectedTags, state} = this.props.works_new;

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

const New = Form.create()(NewForm);

export default New
