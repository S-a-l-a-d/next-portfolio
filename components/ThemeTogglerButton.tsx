import { PureComponent } from "react";

import { THEMES } from "../common/constants";
import { resolveScopedStyles } from "../common/helpers";

interface IThemeTogglerButtonProps {
  theme: string;
  toggleTheme: () => void;
}

const scoped = resolveScopedStyles(
  <div>
    <style jsx>{`
      button {
        cursor: pointer;

        position: fixed;
        right: 0.25rem;
        bottom: 0.25rem;

        border-color: transparent;
        border-radius: 1rem;

        font-size: 1.25rem;

        opacity: 0.5;
        transition: all 0.2s ease-in-out;
      }

      button:hover {
        opacity: 1;

        animation: bouncing 1.5s infinite;
      }

      button:active {
        right: 0.1rem;
        bottom: 0.1rem;

        opacity: 1;
      }

      .light {
        background-color: #1d2129;
        color: #dfdfdf;
      }

      .light:active {
        background-color: #475063;
      }

      .dark {
        background-color: #dfdfdf;
        color: #373737;
      }

      .dark:active {
        background-color: #8d8d8d;
      }

      @keyframes bouncing {
        8.33% {
          bottom: 1rem;
        }

        24.99% {
          bottom: 0.5rem;
        }

        16.66%,
        33.32%,
        100% {
          bottom: 0.1rem;
        }
      }
    `}</style>
  </div>
);

export default class ThemeTogglerButton extends PureComponent {
  public props: IThemeTogglerButtonProps;

  constructor(props: IThemeTogglerButtonProps) {
    super(props);
  }

  public render() {
    return (
      <>
        <button
          className={`${scoped.className} ${this.props.theme}`}
          onClick={this.props.toggleTheme}
        >
          {this.props.theme === THEMES.LIGHT ? "Dark Mode" : "Light Mode"}
        </button>
        {scoped.styles}
      </>
    );
  }
}
