import type { ReactNode } from "react";
import "./MainContent.css";

type MainContentProps = {
  children: ReactNode;
};

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="main-content" id="main-content">
      <div className="main-content__inner">{children}</div>
    </main>
  );
}
