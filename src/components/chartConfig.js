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

export const colsConfig = (make, model, price) =>  {
    return [
        {
            key: 'make',
            show: make
        },
        {
            key: 'model',
            show: model
        },
        {
            key: 'price',
            show: price
        }
    ]
}