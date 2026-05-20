"use client";

import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store/store";

interface ReduxProviderProps {
  children: ReactNode;
}

function ReduxProvider({ children }: ReduxProviderProps) {
  const [store] = useState(makeStore);

  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
