export const chartThemeOverrides = {
    common: {
        padding: {
            right: 40,
        },
        legend: {
            position: 'bottom',
        },
    },
    column: {
        series: {
            strokeWidth: 2,
            fillOpacity: 0.8,
        },
    },
    line: {
        series: {
            strokeWidth: 5,
            strokeOpacity: 0.8,
        },
    }
}

export const colsConfig = (id, systemCode, system,caption,viewType) =>  {
    return [
        {
            key: 'id',
            show: id
        },
        {
            key: 'systemCode',
            show: systemCode
        },
        {
            key: 'system',
            show: system
        },
        {
            key: 'caption',
            show: caption
        },
        {
            key: 'viewType',
            show: viewType
        }
    ]
}