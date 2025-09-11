
'use client';

import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { firebaseConfig } from '@/lib/firebase'; // Import the config

export default function GoogleSignInButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      // Ensure Firebase is initialized on the client, and only once.
      const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
      const auth = getAuth(app); // Pass the initialized app to getAuth
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google', error);
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSignIn} className="w-full" variant="outline" disabled={isLoading}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
        <svg
            className="mr-2 h-4 w-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
        >
            <path
            fill="currentColor"
            d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 256S109.8 0 244 0c73 0 135.7 29.1 182.4 75.3l-64.6 64.3C337.5 114.6 295.6 96 244 96c-88.6 0-160.1 71.9-160.1 160.1s71.5 160.1 160.1 160.1c94.2 0 135.2-70.5 141.2-107.3H244v-75.2h244z"
            ></path>
        </svg>
      }
      Sign in with Google
    </Button>
  );
}
