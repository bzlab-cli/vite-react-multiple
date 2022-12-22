/**
 * @Author: jrucker
 * @Description
 * @Date: 2019/6/28 下午10:54
 * @Last Modified by: jrucker
 * @Last Modified time: 2019/6/28 下午10:54
 */

import React, {Component} from 'react';
import {Tree, Icon} from 'antd';
import styles from './EditableTree.scss';

const {TreeNode} = Tree;

class EditableTree extends Component {

    /*list = [{
        value: 'Root',
        defaultValue: 'Root',
        key: '0-1',
        isEditable: false
    }];*/

    expandedKeys = [];

    static defaultProps = {
        editBtn: true,
        plusBtn: true,
        minusBtn: true
    };

    state = {
        expandedKeys: [],
        list: []
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.list !== this.state.list) {
            this.setState({
                list: nextProps.list
            });
        }
    }

    /*static getDerivedStateFromProps(props, state) {
        return {
            list: props.list
        };
    }*/

    componentDidMount() {
        this.onExpand([]); // 手动触发，否则会遇到第一次添加子节点不展开的Bug
    }

    onExpand = (expandedKeys) => {
        this.expandedKeys = expandedKeys;
        this.setState({expandedKeys: expandedKeys});
        if (this.props.onExpand) {
            this.props.onExpand(expandedKeys);
        }
    };

    onAdd = (item) => {
        this.props.onAdd({item})
    };

    onDelete = (item) => {
        this.props.onDelete({item})
    };

    onEdit = (item) => {
        item.isEditable = true;

        this.setState({
            list: this.state.list
        });
    };

    onClose = (item) => {
        item.isEditable = false;
        item.value = item.defaultValue;

        this.setState({
            list: this.state.list
        });
    };

    onSave = (item) => {
        this.props.onSave({item})
    };

    onChange = (e, item) => {
        item.value = e.target.value;

        this.setState({
            list: this.state.list
        });
    };

    renderTreeNodes = list => list.map((item) => {
        if (item.isEditable) {
            item.title = (
                <div>
                    <input
                        className={styles.inputField}
                        value={item.value}
                        onChange={(e) => this.onChange(e, item)}/>
                    <Icon type='close' style={{marginLeft: 10}}
                          onClick={() => this.onClose(item)}/>
                    <Icon type='check' style={{marginLeft: 10}} onClick={() => this.onSave(item)}/>
                </div>
            );
        } else {
            item.title = (
                <div className={styles.titleContainer}>
                    <span onClick={() => this.props.onSelect({item})}>
                        {item.value}
                    </span>
                    <span className={styles.operationField}>
                        {this.props.editBtn && (
                            <Icon style={{marginLeft: 10}} type='edit' onClick={() => this.onEdit(item)}/>)}
                        {this.props.plusBtn && (
                            <Icon style={{marginLeft: 10}} type='plus' onClick={() => this.onAdd(item)}/>)}
                        {this.props.minusBtn && (
                            <Icon style={{marginLeft: 10}} type='minus' onClick={() => this.onDelete(item)}/>)}
                    </span>
                </div>
            )
        }

        if (item.children) {
            return (
                <TreeNode title={item.title} key={item.key} dataRef={item}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            );
        }

        return <TreeNode {...item} />;
    });

    render() {
        return (
            <div>
                <Tree showLine expandedKeys={this.state.expandedKeys} selectedKeys={[]}
                      onExpand={this.onExpand}>
                    {this.renderTreeNodes(this.state.list)}
                </Tree>
            </div>
        )
    }
}

export default EditableTree;