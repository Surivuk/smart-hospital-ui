import HealthData from "./HealthData";

export default class PI extends HealthData {

    constructor(private readonly _value: number) { super() }

    isNormal(): boolean {
        return this._value >= 0 && this._value <= 3;
    }
    isWarning(): boolean {
        return this._value > 3 && this._value <= 10;
    }
    isCritical(): boolean {
        return this._value > 10;
    }
}