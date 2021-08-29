import {Chart, registerables} from 'chart.js'

class Plot {
    private chart: Chart = null;
    private plotEl: HTMLCanvasElement = null;

    constructor(plotEl: HTMLCanvasElement) {
        this.plotEl = plotEl;
        Chart.register(...registerables);
    }

    plot (data: number[], name: string) {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(this.plotEl, {
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