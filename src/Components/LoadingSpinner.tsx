export interface TailwindSpinnerProps {
    size?: string;
    color?: string;
    borderColor?: string;
}

const TailwindSpinner = ({ size = '12', color = 'purple', borderColor = 'purple' }: TailwindSpinnerProps) => {
    return (
        <div
            className={`w-${size} h-${size} rounded-full border-4 border-solid border-${borderColor} -200 border-t-${color}-600 animate-spin`}
        ></div>
    );
};

export default TailwindSpinner;
