import './globals.css';
import Image from 'next/image';

export const metadata = {
  title: 'Ventura Grand Inn',
  description: 'Book your stay at Ventura Grand Inn',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-white shadow-md py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Image
              src="/images/logo.png"
              alt="Ventura Grand Inn"
              width={150}
              height={50}
            />
            <nav>
              <a href="/" className="text-gray-700 hover:text-indigo-500 mx-4">Home</a>
              <a href="/rooms" className="text-gray-700 hover:text-indigo-500 mx-4">Rooms</a>
              <a href="/login" className="text-gray-700 hover:text-indigo-500 mx-4">Login</a>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
