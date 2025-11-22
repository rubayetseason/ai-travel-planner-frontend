import { Toaster } from "sonner";
import Routes from "./routes/Routes";

function App() {
  return (
    <div>
      <Routes />
      <Toaster
        position="top-center"
        toastOptions={{ duration: 3000 }}
        richColors
      />
    </div>
  );
}

export default App;
