import { ref, computed } from 'vue'

/**
 * @description 表格多选数据操作
 * @param {String} selectId 表格多选，默认指定id
 * @param {Any} tableRef
 * */
export const useSelection = (selectId = 'id') => {
  const isSelected = ref<boolean>(false)
  const selectedList = ref([])
  const selectedListIds = computed((): string[] => {
    const ids: string[] = []
    selectedList.value.forEach(item => {
      ids.push(item[selectId])
    })
    return ids
  })

  // 获取行数据键值
  const getRowKeys = (row: any) => {
    return row[selectId]
  }

  // 多选操作
  const selectionChange = (rowArr: any) => {
    rowArr.length === 0 ? (isSelected.value = false) : (isSelected.value = true)
    selectedList.value = rowArr
  }

  return {
    isSelected,
    selectedList,
    selectedListIds,
    selectionChange,
    getRowKeys
  }
}
