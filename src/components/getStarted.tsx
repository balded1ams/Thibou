import { useThemeContext } from "@/hooks/useTheme";
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react"; // Hook pour la navigation

interface StartProps {
    userConnected?: unknown;
}

const Start: React.FC<StartProps> =  ({userConnected })=> {
    const { systemTheme } = useThemeContext();
    const [message, setMessage] = useState<JSX.Element | null>(null);
    const router = useRouter(); // Initialiser le hook de navigation

    useEffect(() => {
        if (userConnected) {
            setMessage(<>Commencer</>);
        } else {
            setMessage(<>Commencer en tant qu’invité</>);
        }
    }, []);



    return (
      <div className="flex items-center justify-center py-8 ">
        <button
          className="rounded-xl px-4 py-2 text-xl transition-all hover:opacity-80"
          onClick={() => router.push("/customPage")}
          style={{
            color: systemTheme.text.secondary,
            backgroundColor: systemTheme.background.button,
          }}
        >
            {message}
        </button>

      </div>
    );
};

export default Start;
