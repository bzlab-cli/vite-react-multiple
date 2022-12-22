package com.faber.core.web.rest;

import com.faber.core.annotation.FaLogOpr;
import com.faber.core.annotation.LogNoRet;
import com.faber.core.web.biz.BaseTreeBiz;
import com.faber.core.vo.msg.Ret;
import com.faber.core.vo.tree.TreeNode;
import com.faber.core.vo.tree.TreePathVo;
import com.faber.core.vo.tree.TreePosChangeVo;
import com.faber.core.vo.query.QueryParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.Serializable;
import java.util.List;

/**
 * <h2>通用Tree形结构数据的Controller接口父类，包含基本的方法：</h2>
 * <h3>1. 一次性返回所有的节点，适用于节点总数较少的情况，如：节点查询</h3>
 * 1. {@link BaseTreeController#allTree} - 获取所有节点Tree<br/>
 * 2. {@link BaseTreeController#allTreeFromNode} - 从指定节点，返回向下获取所有节点Tree<br/>
 * <br/>
 *
 * <h3>2. 一次只返回当前层级的节点List，适用于节点总数很多的情况，如：地区查询</h3>
 * 1. {@link BaseTreeController#treePathLine} - 给定选中的value，返回value向上查找的节点路径xxx<br/>
 * 2. {@link BaseTreeController#treeListLayer} - 给定parentId，返回当前层级的节点List<br/>
 * 2. {@link BaseTreeController#treeFindPath} - 给定选中的value，返回value向上查找的节点路径xxx，并返回路径xxx的层级的Tree<br/>
 * <br/>
 *
 * <h3>3. 其他帮助方法</h3>
 * 1. {@link BaseTreeController#changePos} - 改变节点列表位置[排序、父节点]<br/>
 *
 * @param <Biz>
 * @param <Entity>
 */
@Slf4j
public abstract class BaseTreeController<Biz extends BaseTreeBiz, Entity, Key extends Serializable> extends BaseController<Biz, Entity, Key> {

    /**
     * 给定选中的value，返回value向上查找的节点路径[1, 1-1, 1-1-1]
     * @param id 选中的节点ID
     * @return
     */
    @FaLogOpr("ID向上查找")
    @LogNoRet
    @RequestMapping(value = "/treePathLine/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Ret<List<TreeNode<Entity>>> treePathLine(@PathVariable Key id) {
        List<Entity> list = (List<Entity>) baseBiz.treePathLine(id);
        List<TreeNode<Entity>> nodeList = baseBiz.transEntityListToNodeList(list);
        return ok(nodeList);
    }

    /**
     * 给定parentId，返回当前层级的节点List
     * @param parentId 选中的节点parentId
     * @return
     */
    @FaLogOpr("当前层级")
    @LogNoRet
    @RequestMapping(value = "/treeListLayer/{parentId}", method = RequestMethod.GET)
    @ResponseBody
    public Ret<List<TreeNode<Entity>>> treeListLayer(@PathVariable Key parentId) {
        List<Entity> list = (List<Entity>) baseBiz.treeListLayer(parentId);
        List<TreeNode<Entity>> nodeList = baseBiz.transEntityListToNodeList(list);
        return ok(nodeList);
    }

    /**
     * 给定选中的value，返回value向上查找的节点路径xxx，并返回路径xxx的层级的Tree
     * @param id 选中的节点ID
     * @return
     */
    @FaLogOpr("ID向上查找all")
    @LogNoRet
    @RequestMapping(value = "/treeFindPath/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Ret<TreePathVo<Entity>> treeFindPath(@PathVariable Key id) {
        TreePathVo<Entity> data = (TreePathVo<Entity>) baseBiz.treeFindPath(id);
        return ok(data);
    }

    /**
     * 获取所有节点Tree
     * @return
     */
    @FaLogOpr("全部树")
    @LogNoRet
    @RequestMapping(value = "/allTree", method = RequestMethod.GET)
    @ResponseBody
    public Ret<List<TreeNode<Entity>>> allTree() {
        List<TreeNode<Entity>> treeList = baseBiz.allTree();
        return ok(treeList);
    }

    /**
     * 获取所有节点Tree
     * @return
     */
    @FaLogOpr("查询树")
    @LogNoRet
    @RequestMapping(value = "/getTree", method = RequestMethod.POST)
    @ResponseBody
    public Ret<List<TreeNode<Entity>>> getTree(@RequestBody QueryParams query) {
        List<TreeNode<Entity>> treeList = baseBiz.getTree(query);
        return ok(treeList);
    }

    /**
     * 从指定节点，返回向下获取所有节点Tree
     * @param id 指定节点ID
     * @return
     */
    @FaLogOpr("ID向下树")
    @LogNoRet
    @RequestMapping(value = "/allTreeFromNode/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Ret<List<TreeNode<Entity>>> allTreeFromNode(@PathVariable("id") Key id) {
        List<TreeNode<Entity>> treeList = baseBiz.allTreeFromNode(id);
        return ok(treeList);
    }

    /**
     * 改变节点列表位置[排序、父节点]
     * @param list
     * @return
     */
    @FaLogOpr("节点排序")
    @RequestMapping(value = "/changePos", method = RequestMethod.POST)
    @ResponseBody
    public Ret<Boolean> changePos(@Valid @RequestBody List<TreePosChangeVo> list) {
        baseBiz.changePos(list);
        return ok();
    }

    /**
     * 节点位置上移
     * @param id
     * @return
     */
    @FaLogOpr("节点上移")
    @RequestMapping(value = "/moveUp/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Ret<Boolean> moveUp(@PathVariable Key id) {
        baseBiz.moveUp(id);
        return ok();
    }

    /**
     * 节点位置下移
     * @param id
     * @return
     */
    @FaLogOpr("节点下移")
    @RequestMapping(value = "/moveDown/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Ret<Boolean> moveDown(@PathVariable Key id) {
        baseBiz.moveDown(id);
        return ok();
    }

}
