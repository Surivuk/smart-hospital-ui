export default abstract class HealthData {
    abstract isNormal(): boolean;
    abstract isWarning(): boolean;
    abstract isCritical(): boolean;
}