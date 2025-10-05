"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import AdminPanel from "@/components/AdminPanel";
import AdminLogin from "@/components/AdminLogin";

export default function AdminPage({ isAuthenticated }) {
  const [auth, setAuth] = useState(isAuthenticated);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
      {auth ? (
        <AdminPanel />
      ) : (
        <AdminLogin onSuccess={() => setAuth(true)} />
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const code = req.cookies.auth_token || null;
  console.log(code)
  // Call your Django backend to check token
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}games/adminAuth/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  let isAuthenticated = false;
  if (res.ok) {
    const data = await res.json();
    isAuthenticated = data.success === true;
  }

  return {
    props: { isAuthenticated },
  };
}
