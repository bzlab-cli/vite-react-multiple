<template>
  <div class="table-box">
    <bz-table
      ref="bzTableRef"
      :searchColumns="searchColumns"
      :filterSearchFields="filterSearchFields"
      :columns="columns"
      :requestApi="getUserList"
      :initParam="initParam"
      :dataCallback="dataCallback"
    >
      <template #tableHeader>
        <el-button type="primary" @click="handleAddUser('新增用户')">新增用户</el-button>
      </template>
      <template #operation="scope">
        <el-button size="small" type="primary" link @click="handleAddUser('修改用户', scope.row)">修改</el-button>
        <el-button
          size="small"
          type="primary"
          link
          @click="handleEnableChange(scope.row, scope.row.forbiddenStatus == 1 ? 0 : 1)"
        >
          {{ scope.row.forbiddenStatus == 1 ? '禁用' : '启用' }}
        </el-button>
        <el-button size="small" type="primary" link @click="handleResetPwd(scope.row)">重置密码</el-button>
        <el-button size="small" type="primary" link @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </bz-table>
  </div>
</template>

<script lang="tsx" setup name="user">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { ColumnProps } from '@/interface/table'
import { useConfirm } from '@/hooks/handle/use-handle'
import { majorList } from '@/constant/major'
import { getUserList, resetPassword, deleteUser, updateUserForbiddenStatus } from '@/api/auth/user'
import { getRoleSelect2 } from '@/api/auth/role'
import { getOrgList } from '@/api/auth/org'
import { statusList } from '@/constant/user'
import addUser from './components/add-user.vue'
import { dynamic } from '@bzlab/bz-core'

const bzTableRef = ref()
;(window as any).bzTableRef = bzTableRef

const initParam = reactive({})
const filterSearchFields = ['orgName']

const handleAddUser = (title, rowData) => {
  const params = {
    id: 'addUser', // 组件id
    el: '#app', // 挂载节点
    data: {
      title,
      rowData,
      isAdd: title === '新增用户',
      callback: () => bzTableRef.value.getTableList()
    },
    render: addUser
  }
  dynamic.show(params)
}

const handleEnableChange = async (row, flag) => {
  const message = `确认${flag === 0 ? '禁用' : '启用'}?`
  await useConfirm(updateUserForbiddenStatus, { userId: row.userId, forbiddenStatus: flag }, message)
  bzTableRef.value.getTableList()
}

const handleResetPwd = async row => {
  let { retCode, retMsg } = await resetPassword({ userId: row.userId })
  if (retCode !== 200) return ElMessage.warning(retMsg)
  ElMessage.success('重置成功')
}

const handleDelete = async row => {
  const message = `确认删除?`
  await useConfirm(deleteUser, { userId: row.userId }, message)
  bzTableRef.value.getTableList()
}

const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total
  }
}

const searchColumns = [
  {
    label: '用户名',
    prop: 'userName',
    search: {
      el: 'el-input',
      props: {
        placeholder: '请输入用户名',
        clearable: true
      }
    }
  },
  {
    label: '手机号',
    prop: 'phone',
    search: {
      el: 'el-input',
      props: {
        placeholder: '请输入手机号',
        clearable: true
      }
    }
  },
  {
    label: '角色',
    prop: 'roleName',
    enum: getRoleSelect2,
    fieldNames: { label: 'roleName', value: 'id' },
    search: {
      el: 'el-select',
      key: 'eqRoleId',
      props: {
        placeholder: '请选择角色',
        clearable: true
      }
    }
  },
  {
    label: '组织',
    prop: 'orgName',
    enum: getOrgList,
    fieldNames: { label: 'orgName', value: 'id', children: 'childTreeList' },
    search: {
      el: 'el-tree-select',
      key: 'eqOrgId',
      props: {
        placeholder: '请选择组织',
        clearable: true
      }
    }
  },
  {
    label: '状态',
    prop: 'forbiddenStatus',
    enum: statusList,
    fieldNames: { label: 'name', value: 'id' },
    search: {
      el: 'el-select',
      key: 'forbiddenStatus',
      props: {
        placeholder: '请选择状态',
        clearable: true
      }
    }
  }
]

const columns: ColumnProps[] = [
  {
    label: '用户名',
    prop: 'userName'
  },

  {
    label: '手机号',
    prop: 'phone'
  },
  {
    label: '邮箱',
    prop: 'email'
  },
  {
    label: '创建时间',
    prop: 'createTime'
  },
  {
    label: '角色',
    prop: 'roleName',
    filterEnum: true,
    fieldRowNames: { name: 'roleName', value: 'id', rowKey: 'roleId' }
  },
  {
    label: '组织',
    prop: 'orgName',
    render: ({ row }) => {
      return <span>{row.roleId === 'ad' ? '-' : row.orgName}</span>
    }
  },
  {
    label: '专业',
    prop: 'professional',
    enum: majorList,
    filterEnum: true,
    fieldNames: { label: 'name', value: 'value' },
    fieldRowNames: { name: 'name', value: 'value', rowKey: 'professional' }
  },
  {
    label: '状态',
    prop: 'forbiddenStatus',
    render: ({ row }) => {
      return (
        <el-tag type={row.forbiddenStatus == 1 ? '' : 'danger'}>{row.forbiddenStatus == 1 ? '启用' : '禁用'}</el-tag>
      )
    }
  },
  {
    label: '备注',
    prop: 'remarks'
  },
  {
    label: '操作',
    prop: 'operation',
    fixed: 'right',
    width: 210
  }
]
</script>
