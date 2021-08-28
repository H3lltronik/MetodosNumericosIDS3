class RelativeError implements ErrorExecutable {
    executeMethod(values: ErrorValType) {
        if (values.currentVal == 0) return 0
        return Math.abs(values.currentVal - values.previousVal) / values.currentVal;
    };
}

export default RelativeError;