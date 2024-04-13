import AnalogClock from 'analog-clock-react';
 
export default function ReactClock() {
    let options = {
        width: "150px",
        border: true,
        borderColor: "#2e2e2e",
        baseColor: "#318CE7",
        centerColor: "#459cff",
        centerBorderColor: "#ffffff",
        handColors: {
            second: "#d81c7a",
            minute: "#ffffff",
            hour: "#ffffff"
        }
    };
 
    return (
        <div>
            {/* <h2>React Clock - GeeksforGeeks</h2> */}
            <AnalogClock {...options} />
        </div>
    )
}