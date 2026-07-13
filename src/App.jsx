import axiosInstance from "./api/axios";

function App() {
  console.log(axiosInstance.defaults.baseURL);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Streamix 🚀</h1>
    </div>
  );
}

export default App;