import { StrictMode, lazy, Suspense, useMemo } from "react";
import { Toaster as ShadToaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { Layout } from "./components/layout/Layout";

// Lazy-load pages for faster first paint
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Analytics = lazy(() => import("./pages/Analytics"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Centralized React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Keep HSL colors consistent with your Tailwind CSS variables
const baseTheme = createTheme({
  palette: {
    // Node-ish vibe: blue/teal kept, accents ready for green success states
    primary: { main: "hsl(214, 84%, 56%)" },
    secondary: { main: "hsl(174, 72%, 56%)" },
    background: { default: "hsl(210, 20%, 98%)" },
    success: { main: "hsl(142, 71%, 45%)" },
    warning: { main: "hsl(43, 96%, 56%)" },
    error: { main: "hsl(0, 84%, 60%)" },
    info: { main: "hsl(214, 84%, 56%)" },
    text: { primary: "hsl(215, 25%, 27%)" },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Optional: detect dark mode via the .dark class on <html> (Tailwind convention)
function useTailwindDarkMode(): "light" | "dark" {
  return useMemo(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  }, []);
}

const App = () => {
  const mode = useTailwindDarkMode();

  const theme = useMemo(() => {
    // Flip only the mode; keep the same HSL palette to match tokens
    return createTheme({
      ...baseTheme,
      palette: {
        ...baseTheme.palette,
        mode,
        background: {
          default: mode === "dark" ? "hsl(215, 28%, 17%)" : "hsl(210, 20%, 98%)",
        },
        text: {
          primary: mode === "dark" ? "hsl(210, 40%, 98%)" : "hsl(215, 25%, 27%)",
        },
      },
    });
  }, [mode]);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={150}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ShadToaster />
            <Sonner />
            <BrowserRouter>
              <Layout>
                <Suspense
                  fallback={
                    <Box
                      sx={{
                        height: "60vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  }
                >
                  <Routes>
                    {/* Overview of Node services: throughput, error rate, uptime, queues, etc. */}
                    <Route path="/" element={<Dashboard />} />

                    {/* Deep-dive charts (latency, p95, heap/cpu/mem, GC, event loop lag, etc.) */}
                    <Route path="/analytics" element={<Analytics />} />

                    {/* Always keep the catch-all at the end */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
            </BrowserRouter>
          </ThemeProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;