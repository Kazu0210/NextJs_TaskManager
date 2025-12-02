'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const login = () => {
    console.log('Login button clicked');
  }

  const register = () => {
    console.log('Register button clicked');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header with auth buttons */}
      <header className="w-full p-6 flex justify-end gap-4">
        <button onClick={login} className="cursor-pointer px-6 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md">
          LOGIN
        </button>
        <button onClick={register} className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg">
          REGISTER
        </button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="max-w-3xl text-center space-y-6">
          <h1 className="text-6xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Task Manager
          </h1>
          
          <div className="space-y-4">
            <p className="text-2xl text-gray-700 font-medium">
              Welcome to the Task Manager application!
            </p>
            <p className="text-lg text-gray-600">
              Manage your tasks efficiently and effectively.
            </p>
            <p className="text-lg text-gray-600">
              Get started by logging in or registering.
            </p>
            <p className="text-lg text-blue-600 font-semibold">
              Enjoy your productivity journey!
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="text-4xl mb-3">📋</div>
              <h3 className="font-bold text-gray-800 mb-2">Organize</h3>
              <p className="text-gray-600 text-sm">Keep all your tasks in one place</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">Efficient</h3>
              <p className="text-gray-600 text-sm">Boost your productivity daily</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-bold text-gray-800 mb-2">Simple</h3>
              <p className="text-gray-600 text-sm">Easy to use interface</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center bg-white/50 backdrop-blur-sm border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          &copy; 2023 Task Manager. All rights reserved.
        </p>
      </footer>
    </div>
  )
}