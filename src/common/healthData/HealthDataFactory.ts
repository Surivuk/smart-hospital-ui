import DiastolicBloodPressure from "./DiastolicBloodPressure";
import HealthData from "./HealthData";
import PI from "./PI";
import Pulse from "./Pulse";
import SPO2 from "./SPO2";
import SystolicBloodPressure from "./SystolicBloodPressure";
import Temperature from "./Temperature";

interface Provider {
    (value: string): HealthData
}

export default class HealthDataFactory {

    static healthData(type: string, value: string): HealthData {
        const mapping: { [key: string]: Provider } = {
            SPO2: (value) => new SPO2(parseInt(value)),
            systolic: (value) => new SystolicBloodPressure(parseInt(value)),
            diastolic: (value) => new DiastolicBloodPressure(parseInt(value)),
            PI: (value) => new PI(parseFloat(value)),
            pulse: (value) => new Pulse(parseInt(value)),
            temperature: (value) => new Temperature(parseFloat(value))
        }
        const provider = mapping[type]
        return provider(value)

    }


}