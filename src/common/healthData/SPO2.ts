import HealthData from "./HealthData";

export default class SPO2 extends HealthData {
    constructor(private readonly _value: number) { super() }

    isNormal(): boolean {
        return this._value >= 95;
    }
    isWarning(): boolean {
        return this._value < 95 && this._value >= 90;
    }
    isCritical(): boolean {
        return this._value < 90;
    }
}