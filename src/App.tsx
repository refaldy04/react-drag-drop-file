import "./App.css";

import DropFileInput from "./components/drop-file-input/DropFileInput";

function App() {
  const onFileChange = (files: File[]) => {
    console.log(files);
  };
  return (
    <div className="box">
      <h2 className="header">React drop files input</h2>
      <DropFileInput onFileChange={onFileChange} />
    </div>
  );
}

export default App;
