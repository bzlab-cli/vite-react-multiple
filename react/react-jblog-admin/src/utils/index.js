export const color = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple'
];

export function formatDate(date, format = 'YY-MM-DD hh:mm:ss') {
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();

    let prefix = Array.apply(null, Array(10)).map((elem, index) => '0' + index);
    let time = format.replace(/YY/g, year)
        .replace(/MM/g, prefix[month] || month)
        .replace(/DD/g, prefix[day] || day)
        .replace(/hh/g, prefix[hour] || hour)
        .replace(/mm/g, prefix[min] || min)
        .replace(/ss/g, prefix[sec] || sec);

    return time;
}

export function isArray(obj) {
    return Object.prototype.toString.call(obj) === 'Object Array'
}

export function dateCron(obj) {
    let cron = '';
    if (!isArray(obj)) {
        let {type, date, week, month} = obj;
        if (!date) return
        let formatDate = new Date(date),
            h = formatDate.getHours(),
            m = formatDate.getMinutes(),
            s = formatDate.getSeconds();

        if (type === 'one') {
            cron = date
        } else if (type === 'day') {
            cron = `${s} ${m} ${h} * * ?`;
        } else if (type === 'week') {
            cron = `${s} ${m} ${h} * * ${week.join(',')}`;
        } else if (type === 'month') {
            cron = `${s} ${m} ${h} ${month.join(',')} * ?`;
        } else if (type === 'hours') {
            cron = `0 0 */${date} * * ?`;
        } else if (type === 'minutes') {
            cron = `0 */${date} * * * ?`;
        } else if (type === 'seconds') {
            cron = `*/${date} * * * * ?`
        }
    }

    return cron;
}
