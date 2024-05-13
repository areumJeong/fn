import React from "react";
import ItemInsert from "./pages/ItemInsert";
import { Outlet } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Statistics from "./components/Statistics";


const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <Statistics />

      </QueryClientProvider>
    </AuthContextProvider>
  );
}