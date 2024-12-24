import { useThemeContext } from "@/hooks/useTheme";
import {
  faCaretLeft,
  faCaretRight,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BoutonDirection = (props: any) => {
  const { systemTheme } = useThemeContext();

  return (
      <div className="flex items-center justify-center px-4  py-8">
          <button
              className="flex items-center p-2 px-10 font-mono text-lg"
              style={
                  props.left
                      ? {
                          color: systemTheme.background.primary,
                          backgroundColor: systemTheme.background.secondary,
                          borderBottomLeftRadius: 12,
                          borderTopLeftRadius: 12,
                      }
                      : {
                          color: systemTheme.background.primary,
                          backgroundColor: systemTheme.text.secondary,
                          borderBottomLeftRadius: 12,
                          borderTopLeftRadius: 12,
                      }
              }
          >
              <FontAwesomeIcon icon={faCaretLeft} className="fa-xl pr-2"/>
          </button>

          <button
              className="flex items-center p-2 px-10 font-mono text-lg"
              style={
                  props.right
                      ? {
                          color: systemTheme.background.primary,
                          backgroundColor: systemTheme.background.secondary,
                          borderBottomRightRadius: 12,
                          borderTopRightRadius: 12,
                      }
                      : {
                          color: systemTheme.background.primary,
                          backgroundColor: systemTheme.text.secondary,
                          borderBottomRightRadius: 12,
                          borderTopRightRadius: 12,
                      }
              }
          >
              <FontAwesomeIcon icon={faCaretRight} className="fa-xl pl-2"/>
          </button>

      </div>
  );
};

export default BoutonDirection;
