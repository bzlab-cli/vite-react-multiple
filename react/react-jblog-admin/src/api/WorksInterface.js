import BaseModule from "./BaseModule";

class WorksInterface extends BaseModule {
  constructor() {
    super();
    this.baseUrl = process.env.api.common_url
  }

  /*获取作品列表*/
  getWorksList(data = {}) {
    return this.get(`${this.baseUrl}/api/works?current_page=${data.current_page}&page_size=${data.page_size}&keyword=${data.keyword}&tag=${data.tag}&state=${data.state}`);
  }

  /*添加作品*/
  addWorks(data) {
    return this.post(`${this.baseUrl}/api/works`, data);
  }

  /*修改作品*/
  alterWorks(data) {
    return this.patch(`${this.baseUrl}/api/works/${data._id}`, data);
  }

  /*通过作品id来获取作品*/
  getWorksById(data) {
    return this.get(`${this.baseUrl}/api/works/${data._id}`, data);
  }

  /*通过作品id来删除作品*/
  deleteWorksById(data) {
    return this.delete(`${this.baseUrl}/api/works/${data._id}`, data);
  }
}

export default new WorksInterface()
