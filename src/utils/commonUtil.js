import Moment from "moment";

export const queryParams = (params) => {
    if (params) {
        const  queryStr = []

        Object.keys(params).forEach(
            key => {
                let value = params[key]
                if (value) {
                    if (value instanceof Moment) {
                        value = value.format('YYYY-MM-DD')
                    }
                    queryStr.push(encodeURIComponent(key) + '=' + encodeURIComponent(value))
                }
            }
        )
        return queryStr.join('&')
    } else {
        return ''
    }
}