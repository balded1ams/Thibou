import { useDropdown } from '../hooks/useDropdown';
import { useThemeContext } from '../hooks/useTheme';
import { theme } from '../utils';

interface ThemeDropdownProps {
    isMobile?: boolean;
}

const ThemeDropdown = ({ isMobile = false }: ThemeDropdownProps) => {
    const { dropdownRef, isOpen, toggleDropdown } = useDropdown();
    const { systemTheme, setTheme } = useThemeContext();

    return (
      <div className="w-full">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className={`inline-flex h-full items-center justify-center cursor-pointer rounded-lg px-4 py-1 text-lg transition-all ${
              isMobile
                ? "w-full cursor-pointer rounded-lg border px-4 py-2 text-center text-lg transition-all"
                : "text-center hover:opacity-80"
            }`}
            style={{
              color: systemTheme.text.primary,
              backgroundColor: isMobile
                ? systemTheme.background.primary
                : systemTheme.background.secondary,
              border: `1px solid ${systemTheme.background.button}`
            }}
            onClick={() => toggleDropdown()}
          >
              <h1 className={'pr-4'}>
                  Thème
              </h1>
            <div className="flex items-center gap-2">
              <div
                style={{ backgroundColor: systemTheme.background.primary }}
                className={`aspect-square w-3 rounded-full border`}
              ></div>
              <div
                style={{ backgroundColor: systemTheme.text.primary }}
                className={`aspect-square w-3 rounded-full border`}
              ></div>
              <div
                style={{ backgroundColor: systemTheme.text.secondary }}
                className={`aspect-square w-3 rounded-full border`}
              ></div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isOpen && (
            <div
              className="absolute left-0 z-10 mt-1 w-full rounded-lg shadow-lg"
              style={{
                backgroundColor: systemTheme.background.secondary,
                border: `1px solid ${systemTheme.text.secondary}`,
              }}
            >
              <ul
                className="divide-slate-400 divide-y"
                style={{ color: systemTheme.text.title }}
              >
                {Object.keys(theme).map((key) => (
                  <li
                    key={key}
                    className="flex cursor-pointer items-center justify-between p-3 text-sm"
                    onClick={() => {
                      setTheme(theme[key as keyof typeof theme]);
                    }}
                  >
                    <span>{theme[key as keyof typeof theme].name}</span>
                    <div className="flex items-center gap-2">
                      <div
                        style={{
                          backgroundColor:
                            theme[key as keyof typeof theme].background.primary,
                        }}
                        className="aspect-square w-3 rounded-full"
                      ></div>
                      <div
                        style={{
                          backgroundColor:
                            theme[key as keyof typeof theme].text.primary,
                        }}
                        className="aspect-square w-3 rounded-full"
                      ></div>
                      <div
                        style={{
                          backgroundColor:
                            theme[key as keyof typeof theme].text.secondary,
                        }}
                        className="aspect-square w-3 rounded-full"
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
};

export default ThemeDropdown;
