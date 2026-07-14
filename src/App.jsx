import Button from "./components/ui/Button";

function App() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-4 bg-[#0f0f0f]">
      <Button>Primary</Button>

      <Button variant="secondary">
        Secondary
      </Button>

      <Button variant="danger">
        Delete
      </Button>

      <Button variant="ghost">
        Ghost
      </Button>
    </div>
  );
}

export default App;