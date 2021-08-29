import {Chart, registerables} from 'chart.js'

class Plot {
    constructor(plotEl: HTMLCanvasElement, data: number[], name: string) {
        Chart.register(...registerables);

        let test = new Chart(plotEl, {
            type: 'line',
            data: {
                labels: data,
                datasets: [{
                    label: name,
                    data: data,
                    fill: false,
                    borderColor: 'rgb(37, 150, 190)',
                    tension: 0.1
                }]
            }
        })
    }
}

export default Plot