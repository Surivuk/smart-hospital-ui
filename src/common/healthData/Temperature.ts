import HealthData from "./HealthData";

export default class Temperature extends HealthData {
    constructor(private readonly _value: number) { super() }

    isNormal(): boolean {
        return this._value >= 36 && this._value <= 37;
    }
    isWarning(): boolean {
        return (this._value > 37 && this._value < 39) || (this._value > 35 && this._value < 36);
    }
    isCritical(): boolean {
        return this._value <= 35 || this._value >= 39;
    }
}