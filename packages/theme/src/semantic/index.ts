export interface SemanticTokens {
  brand: {
    primary: string;
    secondary: string;
  };
  surface: {
    background: string;
    card: string;
  };
  text: {
    primary: string;
    muted: string;
  };
  border: {
    default: string;
  };
  interaction: {
    hover: string;
  };
}

export const defaultSemanticTokens: SemanticTokens = {
  brand: {
    primary: "blue500",
    secondary: "blue600",
  },
  surface: {
    background: "white",
    card: "gray100",
  },
  text: {
    primary: "gray900",
    muted: "blue500",
  },
  border: {
    default: "gray100",
  },
  interaction: {
    hover: "blue600",
  },
};
