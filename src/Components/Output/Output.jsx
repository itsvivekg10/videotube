import "../Output/output.css";
const Output = () => {
  return (
    <div>
      <button className="outputbutton" disabled>
        OUTPUT
      </button>
      <iframe className="output"></iframe>
    </div>
  );
};
export default Output;
