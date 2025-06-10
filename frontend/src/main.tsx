import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './router'
import {AuthProvider} from "./contexts/AuthContext.tsx";
import {Toaster} from "react-hot-toast";

createRoot(document.getElementById('root')!).render(
        <AuthProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" />
        </AuthProvider>
)
