import BaseModule from "./BaseModule";

class ScheduleInterface extends BaseModule {
    constructor() {
        super();
        this.baseUrl = process.env.api.common_url
    }

    /*获取任务列表*/
    getScheduleList(data = {}) {
        return this.get(`${this.baseUrl}/api/schedule?current_page=${data.current_page}&page_size=${data.page_size}&keyword=${data.keyword}`);
    }

    /*添加任务*/
    addSchedule(data) {
        return this.post(`${this.baseUrl}/api/schedule`, data);
    }

    /*修改任务*/
    alterSchedule(data) {
        return this.patch(`${this.baseUrl}/api/schedule/${data._id}`, data);
    }

    /*通过任务id来删除*/
    deleteScheduleById(data) {
        return this.delete(`${this.baseUrl}/api/schedule/${data._id}`, data);
    }

    /*运行全部任务*/
    startAllSchedule(data) {
        return this.post(`${this.baseUrl}/api/schedule/startAll`);
    }
}

export default new ScheduleInterface()
