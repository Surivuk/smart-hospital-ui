import HealthData from "./HealthData";

export default class SystolicBloodPressure extends HealthData {
    constructor(private readonly _value: number) { super() }

    isNormal(): boolean {
        return this._value <= 140;
    }
    isWarning(): boolean {
        return this._value > 140 && this._value <= 160;
    }
    isCritical(): boolean {
        return this._value > 160;
    }
}