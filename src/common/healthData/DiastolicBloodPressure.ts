import HealthData from "./HealthData";

export default class DiastolicBloodPressure extends HealthData {

    constructor(private readonly _value: number) { super() }

    isNormal(): boolean {
        return this._value <= 90;
    }
    isWarning(): boolean {
        return this._value > 90 && this._value <= 110;
    }
    isCritical(): boolean {
        return this._value > 110;
    }
}