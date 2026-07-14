import Button from "./components/ui/Button";
import Input from "./components/ui/Input";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f0f]">
      <div className="w-full max-w-md space-y-5 rounded-xl bg-neutral-950 p-8">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
        />

        <Button fullWidth>
          Login
        </Button>
      </div>
    </div>
  );
}

export default App;