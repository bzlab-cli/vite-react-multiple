import { useState, useEffect } from 'react'
import { Modal, message, Form, Input, Radio, Select, Col, Row } from 'antd'
import { addMenu, updateMenu } from '@/api/auth/menu'
import { getMenuList } from '@/api/auth/menu'
import { getFormRules, filter, forEachTree } from '@/utils'
import BzTreeSelect from '@/components/bz-tree-select'
import { menuTypeList, statusList, hiddenFlagList, cacheList } from '@/constant/menu'
interface ModalProps {
  title: string
  record: { [key: string]: any }
  isAdd: boolean
  callback: (val?) => void
  destroy: (val?) => void
}

const AntModal = (props: ModalProps) => {
  const defaultProps = {
    menuType: 1,
    parentId: 0,
    menuSort: 0,
    menuIcon: 'HomeOutlined',
    hiddenFlag: 1,
    status: 0,
    cache: 0
  }
  const { title, record = defaultProps, isAdd, callback } = props
  const [modalVisible, setModalVisible] = useState(true)
  const [form] = Form.useForm()
  const formLayout = { labelCol: { span: 6 } }
  const [menuType, setMenuType] = useState<number>(record.menuType)
  const [treeSelectList, setTreeSelectList] = useState<any>([])

  const formRules = getFormRules({
    menuType: { label: '菜单类型', rules: [{ required: true, message: '请输入组织名称' }] },
    menuName: { label: '菜单名称', rules: [{ required: true, message: '请输入菜单名称' }] },
    parentId: { label: '上级菜单' },
    menuSort: { label: '菜单排序', rules: [{ required: true, message: '请输入排序' }] },
    menuIcon: { label: '菜单图标' },
    menuRoute: { label: '组件名称', rules: [{ required: true, message: '请输入组件名称' }] },
    menuUrl: { label: '组件路径', rules: [{ required: true, message: '请输入组件路径' }] },
    menuComponents: { label: '组件地址', rules: [{ required: true, message: '请输入组件地址' }] },
    hiddenFlag: { label: '是否显示' },
    status: { label: '状态', rules: [{ required: true, message: '请选择状态' }] },
    menuCode: { label: '权限标识' },
    cache: { label: '缓存' }
  })

  record.parentId = record.parentId == 0 ? undefined : record.parentId

  const fetchMenuList = async () => {
    const { retCode, data, retMsg } = await getMenuList(undefined)
    if (retCode !== 200) message.warning(retMsg)
    const childrenName = 'childTreeList'
    const fMenu = filter(data, item => item.menuType !== 3)
    forEachTree(fMenu, item => {
      item.title = item.menuName
      item.value = item.id
      item.children = item[childrenName] || []
    })

    setTreeSelectList(fMenu)
  }

  const onMounted = async () => {
    await fetchMenuList()
  }

  useEffect(() => {
    onMounted()
  }, [])

  const handleSubmit = async () => {
    const fields = form.getFieldsValue()
    const reqBody = {
      id: isAdd ? undefined : record.id,
      createDefaultButton: fields.menuType === 2,
      menuType: fields.menuType,
      menuName: fields.menuName,
      parentId: fields.parentId,
      menuCode: fields.menuCode,
      menuSort: fields.menuSort,
      menuIcon: fields.menuIcon,
      menuRoute: fields.menuRoute,
      menuUrl: fields.menuUrl,
      menuComponents: fields.menuComponents,
      hiddenFlag: fields.hiddenFlag,
      status: fields.status,
      remarks: fields.remarks,
      cache: fields.cache
    }

    await form.validateFields()
    const { retCode, retMsg } = isAdd ? await addMenu(reqBody) : await updateMenu(reqBody)
    if (retCode !== 200) return message.warning(retMsg)
    message.success('操作成功')
    setModalVisible(false)
    callback(true)
  }

  return (
    <Modal
      title={title}
      width={769}
      open={modalVisible}
      onOk={handleSubmit}
      onCancel={() => setModalVisible(false)}
      maskClosable={false}
      destroyOnClose
    >
      <Form form={form} {...formLayout} initialValues={record}>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item {...formRules.menuType}>
              <Radio.Group options={menuTypeList} optionType="button" onChange={e => setMenuType(e.target.value)} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 0]}>
          <Col span={12}>
            <Form.Item {...formRules.menuName}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formRules.parentId}>
              <BzTreeSelect selectValue={record?.parentId} treeData={treeSelectList} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formRules.menuSort}>
              <Input placeholder="请输入" />
            </Form.Item>
          </Col>
          {(menuType === 1 || menuType === 2) && (
            <Col span={12}>
              <Form.Item {...formRules.menuIcon}>
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          )}
          {(menuType === 1 || menuType === 2) && (
            <Col span={12}>
              <Form.Item {...formRules.menuRoute}>
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          )}
          {(menuType === 1 || menuType === 2) && (
            <Col span={12}>
              <Form.Item {...formRules.menuUrl}>
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          )}
          {(menuType === 1 || menuType === 2) && (
            <Col span={12}>
              <Form.Item {...formRules.menuComponents}>
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          )}
          <Col span={12}>
            <Form.Item {...formRules.hiddenFlag}>
              <Select placeholder="请选择" options={hiddenFlagList} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item {...formRules.status}>
              <Select placeholder="请选择" options={statusList} />
            </Form.Item>
          </Col>
          {(menuType === 2 || menuType === 3) && (
            <Col span={12}>
              <Form.Item {...formRules.menuCode}>
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          )}
          {(menuType === 2 || menuType === 3) && (
            <Col span={12}>
              <Form.Item {...formRules.cache}>
                <Select placeholder="请选择" options={cacheList} />
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  )
}

export default AntModal
