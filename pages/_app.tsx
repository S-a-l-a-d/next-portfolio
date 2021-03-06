import { IncomingMessage } from "http";
import Cookies from "js-cookie";
import { NextPageContext, NextComponentType } from "next";
import App from "next/app";
import Head from "next/head";
import React from "react";

import { SITE_TITLE } from "../common/constants";
import { DEFAULT_THEME, THEMES } from "../common/constants";

import ThemeTogglerButton from "../components/ThemeTogglerButton";

interface ICustomAppProps {
  theme: string;
}

interface ICustomAppState {
  theme: string;
}

interface ICustomIncomingMessage extends IncomingMessage {
  cookies: {
    [key: string]: string;
  };
}

export default class CustomApp extends App<{}> {
  public static async getInitialProps({
    Component,
    ctx
  }: {
    Component:
      | (React.ComponentType<any> & NextComponentType<{}>)
      | (React.StatelessComponent<any> & NextComponentType<{}>);
    ctx: NextPageContext;
  }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const req = ctx.req as ICustomIncomingMessage;

    return {
      pageProps,
      theme: ctx.req && req.cookies.theme ? req.cookies.theme : DEFAULT_THEME
    };
  }

  public state: ICustomAppState;

  constructor(props: ICustomAppProps & any) {
    super(props);

    this.state = {
      theme: props.theme
    };

    this.toggleTheme = this.toggleTheme.bind(this);
  }

  public render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>{SITE_TITLE}</title>
        </Head>
        <Component theme={this.state.theme} {...pageProps} />
        <ThemeTogglerButton
          theme={this.state.theme}
          toggleTheme={this.toggleTheme}
        />
      </>
    );
  }

  private toggleTheme() {
    this.setState((state: ICustomAppState) => {
      const theme = state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;

      Cookies.set("theme", theme, { expires: 365 });

      return { theme };
    });
  }
}
