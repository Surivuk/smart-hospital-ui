import HealthData from "./HealthData";

export default class Pulse extends HealthData {
    constructor(private readonly _value: number) { super() }

    isNormal(): boolean {
        return this._value >= 60 && this._value <= 80;
    }
    isWarning(): boolean {
        return this._value > 80 && this._value <= 120 || this._value < 60 && this._value >= 40;
    }
    isCritical(): boolean {
        return this._value < 40 || this._value > 120;
    }
}