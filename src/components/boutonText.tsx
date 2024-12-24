import { useThemeContext } from "@/hooks/useTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

const BoutonText = (props: any) => {
  const { systemTheme } = useThemeContext();

  return (
    <div className="flex items-center justify-center py-8  ">
      <button
        className="rounded-xl border p-2  font-mono text-xl"
        style={{
          color: systemTheme.background.primary,
          backgroundColor: systemTheme.text.secondary,
        }}
      >
        {props.icon ? <FontAwesomeIcon icon={faDownload} className="pr-2 "/> : <></>}

        {props.intitule}
      </button>
    </div>
  );
};

export default BoutonText;
